(function ($) {
  preConfigFabric(fabric);
  // ==== 配置完成 ====
  let downPoint, upPoint; // 点击初始和结束的两个鼠标点
  let curClick; // 当前选中的图像/图形
  let curDraw, curText; // 当前画的图,当前的文本
  let canvas, ctx2d;
  let currentType; // 创建的图像类型
  let curImg, curImgGroup; // 当前被编辑的图片、和图片共同移动、被点击的组
  let curCropArea; // 只会有一个裁剪的区域
  let loadImageInfo = {}; // 图片初始的width和height
  let canvasWidth = 500,
    canvasHeight = 500; // 画布的宽高
  let options = {
    color: "#000000",
    segment: true,
    arrow: false,
    point: true,
    fill: false,
  };
  let edit_status = "over";
  let markIndex = 1; // 标点
  let lineWH; // 有些地方，动态根据宽高去设置粗细宽度
  const markLines = new Set();

  // 记录鼠标起始位置和标记
  const dragInfo = {
    open: false,
    isDragging: false,
    startMouseX: 0,
    startMouseY: 0,
  };
  let history; // 历史记录栈
  let cropAreaStrokeColor = "red"; // 裁剪边框颜色
  let curUrl = null; // 上传的图片数据
  let uploadImgType; // 上传的图片类型
  let pencilBrush = null; // 自由铅笔
  let targetPos = {}; // 截取区域信息

  // 一个页面可能同时有多个图片裁剪控件
  const canvasRan = Math.random().toFixed(10).slice(-5);
  const canvasId = "canvas" + canvasRan,
    resCanvasId = "rescanvas" + canvasRan;

  function cropper($element, options) {
    this.$element = $element;
    const canvasEle = `<canvas id=${canvasId} style="border: 1px solid #ccc;min-height: 60vh;"></canvas>`;
    const canvasContainer = $element.find(".imgEditor-editField").eq(0);
    canvasContainer.append(canvasEle);

    this._default = {
      addToolsEvent: false,
      viewMode: 1,
      tools: [
        "line",
        "rect",
        "circle",
        "text",
        "pencilbrush",
        "rotateleft",
        "rotateright",
        "segment",
        "arrow",
        "point",
        "fill",
        "color",
        "reset",
        "sure",
        "download",
        "cropper",
        "confirm_cut",
        "markpoint",
      ],
    };

    const params =
      (options.cWidget &&
        options.cWidget.options &&
        options.cWidget.options.imgUpload) ||
      {};
    this.options = $.extend({ params }, this._default, options || {});

    // 监听图片上传
    const that = this;
    $element.find(".canvas_fileInputs").on("change", function (e) {
      const file = e.target.files[0];
      const type = file.type;
      uploadImgType = {
        base64Type: type,
        canvasType: type.split("/")[1],
      };
      const reader = new FileReader();
      reader.onload = function (f) {
        const data = f.target.result;
        // 清空原先数据
        canvas && canvas.dispose(); // clear且清除绑定的事件
        that.initCanvas(data);
      };
      reader.readAsDataURL(file);
    });
    // 监听关闭
    that.$element.find(".imgEditor-close").on("mouseup", function () {
      that.closeAndClear(that);
    });
  }
  cropper.prototype = {
    // ======== index.js ==========
    // 初始化画板（每次传入图片时触发，canvasId一致所以会覆盖）
    initCanvas: function (data) {
      let that = this;
      canvasWidth = this.$element.find(".imgEditor-editField").width();
      // 画布两边间距
      canvasWidth -= 30;
      canvasHeight = this.$element.find(".imgEditor-editField").height();
      // 创建画布
      canvas = new fabric.Canvas(canvasId, {
        width: canvasWidth,
        height: canvasHeight,
        backgroundColor: "#fff", // 设置背景颜色
        selectionFullyContained: true, // 左键选区域后，匹配图像需要精准选择
      });
      // 历史记录栈
      history = new CommandHistory(canvas);
      canvas.stateful = true;

      canvas.on("mouse:down", this.canvasMouseDown.bind(this)); // 鼠标在画布上按下
      canvas.on("mouse:up", this.canvasMouseUp.bind(this)); // 鼠标在画布上松开
      canvas.on("mouse:move", this.canvasMouseMove.bind(this)); // 鼠标在画布上移动

      // 控制画布内图像的不越过画布边界
      // canvas.on("object:moving", function (e) {
      //   const curMoving = e.target;
      //   that.limitSizeAndMove(curMoving);
      // });
      // 监听鼠标滚轮缩放事件
      canvas.on("mouse:wheel", (opt) => {
        that.mouseWheel(opt);
      });
      canvas.on("object:modified", ({ target }) => {
        history.add(new TransformCommand(target, "modified")); // add command to history
        target.saveState(); // save new state
      });
      // 禁用浏览器默认的滚动
      window.addEventListener("wheel", this.windowWheelEvent, {
        passive: false,
      });

      // 铅笔（自由笔刷）的定义
      canvas.isDrawingMode = false; // 默认禁用
      pencilBrush = Object.assign(new fabric.PencilBrush(canvas), {
        color: options.color,
        width: 4,
        limitedToCanvasSize: false, // 禁止画笔超出画布
        straightLineKey: "shiftKey", // 按shift画直线
      });
      canvas.freeDrawingBrush = pencilBrush;

      // 铅笔画完一段
      canvas.on("path:created", function (opt) {
        history.add(new TransformCommand(opt.path, "create"));
        opt.path.saveState();
      });

      let rotateTimer = null;
      canvas.on("object:rotating", ({ target }) => {
        rotateTimer && clearTimeout(rotateTimer);
        rotateTimer = setTimeout(function () {
          history.add(new TransformCommand(target, "modified")); // add command to history
          target.saveState(); // save new state
        }, 1000);
      });

      // 监听键盘按下事件
      document.addEventListener("keydown", function (e) {
        that.keyDownEvent(e);
      });
      document.addEventListener("keyup", function (e) {
        that.keyUpEvent(e);
      });

      curUrl = data || "";
      // 使用fabric的api加载图片
      fabric.Image.fromURL(
        curUrl, // 图片路径
        (img) => {
          // 图片加载完成后
          loadImageInfo = {
            nativeWidth: img.width, // 原始宽度
            nativeHeight: img.height, // 原始高度
          };
          lineWH = parseInt(
            Math.max(loadImageInfo.nativeHeight, loadImageInfo.nativeWidth) /
            150
          );
          // 更改pencilBrush的宽度
          pencilBrush.width = lineWH;
          canvas.freeDrawingBrush = pencilBrush;

          curImg = img;
          // 获取Canvas上下文
          ctx2d = canvas.contextContainer;
          // 缩放图像从而适应最大宽度和高度,设置canvas上下文宽高
          this.scaleImageToAspectRatio(img, canvasWidth, canvasHeight, ctx2d);
          // canvas的显示应该调整（一般是缩小，原图过大，ctx依据原图尺寸调整的）
          canvas.setZoom(img.scaleX);

          // 居中
          img.set({
            originX: "center",
            originY: "center",
            left: canvas.width / 2 / img.scaleX,
            top: canvas.height / 2 / img.scaleX,
            scaleX: 1,
            scaleY: 1,
            hasControls: false, // 禁用默认的调整大小控件
            hasBorders: false, // 禁用默认的边框
            selectable: true,
          });
          img.set("zIndex", 1);

          // 图片被选中时，默认选中所有已经画了的图形
          curImg.on("selected", function (event) {
            that.selectAllObjects();
          });

          canvas.add(img);
          canvas.renderAll();
          img.saveState();
          history.add(new TransformCommand(img, "origin")); // add command to history
          this.bindEventListener(this);
          this.updateBottomTips.call(this, "common");
        },
        { crossOrigin: "anonymous" }
      );
    },
    windowWheelEvent: function (e) {
      e.preventDefault();
    },
    // 更新截图区域的位置信息
    updateCurCropAreaInfo: function () {
      if (!curCropArea) return;
      curCropArea.set("stroke", "transparent");
      const boundingRect = curCropArea.getBoundingRect();
      const realY = boundingRect.top;
      const realX = boundingRect.left;
      const realWidth =
        boundingRect.width *
        (loadImageInfo.nativeWidth / curImg.getScaledWidth());
      const realHeight =
        boundingRect.height *
        (loadImageInfo.nativeHeight / curImg.getScaledHeight());
      // 获取截图区域位置信息
      targetPos = {
        left: realX,
        top: realY,
        width: realWidth,
        height: realHeight,
      };
      curCropArea.set("stroke", cropAreaStrokeColor);
      canvas.renderAll();
    },
    // 限制裁剪区域的大小和移动范围
    limitSizeAndMove: function (target) {
      if (target != curCropArea || curImg.angle % 180 != 0) return;
      // alt移动/zoom缩放之后 画布的缩放比例和偏移量
      const _scaleX = canvas.viewportTransform[0],
        _scaleY = canvas.viewportTransform[3],
        _left = canvas.viewportTransform[4],
        _top = canvas.viewportTransform[5];

      const zoom = canvas.getZoom();
      // 获取图像的尺寸和位置信息
      const imgWidth = curImg.getScaledWidth(),
        imgHeight = curImg.getScaledHeight(),
        imgLeft = curImg.left,
        imgTop = curImg.top;

      // 获取裁剪区域的尺寸
      let { width, height, left, top } = curCropArea;
      const scaledWidth = width * _scaleX,
        scaledHeight = height * _scaleY;

      // 计算图像边界距离
      let rightLimit = imgWidth * zoom - scaledWidth + imgLeft * _scaleX,
        bottomLimit = imgHeight * zoom - scaledHeight + imgTop * _scaleY;

      const props = {
        scaleX: target.scaleX,
        scaleY: target.scaleY,
      };
      rightLimit /= zoom;
      bottomLimit /= zoom;

      // 如果超出边界，将图像移回边界内
      if (left <= imgLeft) {
        props.left = imgLeft;
      } else if (left >= rightLimit) {
        props.left = rightLimit;
      }
      if (top <= imgTop) {
        props.top = imgTop;
      } else if (top >= bottomLimit) {
        props.top = bottomLimit;
      }
      target.set(props);
      return target;
    },
    // 重置
    resetAll: function (param) {
      markIndex = 1;
      // 清空原先数据
      $(".iui-imgupload .imgEditor-editField").css({
        "min-height": canvas.height,
      });
      canvas && canvas.dispose(); // clear且清除绑定的事件
      curCropArea = null;
      currentType = null;
      $(".reset-clear-all")
        .find(".imgEditor-tools-item")
        .each(function (index, item) {
          $(item).removeClass("active");
        });
      this.initCanvas(curUrl);
    },
    // 旋转图片
    rotateImg: function (angle) {
      curImg.rotate(angle);
      canvas.renderAll();
    },
    // ========== create.js ==========
    // 创建直线
    createLine: function (that) {
      options.arrow ? that.createArrowLine() : that.createNormalLine();
    },
    // 普通直线
    createNormalLine: function () {
      // 起始点坐标和结束点坐标数组
      const points = [downPoint.x, downPoint.y, downPoint.x, downPoint.y];
      curDraw = new fabric.Line(points, {
        stroke: options.color, // 笔触颜色
        strokeWidth: lineWH,
      });
      canvas.add(curDraw);
    },
    // 带箭头的直线
    createArrowLine: function () {
      const points = [downPoint.x, downPoint.y, downPoint.x, downPoint.y];
      curDraw = new fabric.LineArrow(points, {
        strokeWidth: parseInt(lineWH),
        fill: options.color,
        stroke: options.color,
        originX: "center",
        originY: "center",
        selectable: true,
      });
      canvas.add(curDraw);
    },
    // 创建矩形
    createRect: function () {
      // 矩形参数计算
      let left = downPoint.x,
        width = 0;
      let top = downPoint.y,
        height = 0;
      // 矩形对象
      curDraw = new fabric.Rect({
        top,
        left,
        width,
        height,
        fill: options.fill ? options.color : "transparent",
        stroke: options.color,
        strokeWidth: lineWH,
      });
      // 将矩形添加到画布上
      canvas.add(curDraw);
    },
    // 创建圆形
    createCircle: function () {
      curDraw = new fabric.Circle({
        top: downPoint.y,
        left: downPoint.x,
        radius: 0,
        fill: options.fill ? options.color : "transparent",
        stroke: options.color,
        strokeWidth: lineWH,
      });
      canvas.add(curDraw);
    },
    // 创建可编辑文本
    createText: function () {
      curText = new fabric.IText("", {
        fontFamily: "Arial",
        fontSize: (32 / 4) * lineWH,
        left: downPoint.x,
        top: downPoint.y,
        lineHeight: 20,
        fill: options.color, // 字体颜色
        borderColor: cropAreaStrokeColor, // 选中时边框颜色
        editingBorderColor: cropAreaStrokeColor, // 点击文字进入编辑状态时的边框颜色
        cursorWidth: 2,
      });
      curText.on("editing:entered", function () {
        // canvas.renderAll();
      });
      curText.on("editing:exited", function () {
        canvas.skipTargetFind = false;
        canvas.renderAll();
      });
      canvas.add(curText);
      curText.enterEditing();
    },
    // 创建标记的直线和数字
    createMarkPoint: function () {
      // 规则： (curImg.left - curImg.width/2) * canvas.getZoom() === curImg.getBoundingRect().left;
      // 右边界：(curImg.left + curImg.width/2) * canvas.getZoom()
      const { left, top, width, height } = curImg.getBoundingRect(),
        curZoom = canvas.getZoom();
      const overLen =
        curZoom >= 1 ? (lineWH + 50) * curZoom : (lineWH + 50) / curZoom;
      // 计算图片的中间位置、左线、右线的偏移量x
      const midPosX = curImg.left;
      const leftLineX = curImg.left - curImg.width / 2,
        rightLineX = curImg.left + curImg.width / 2,
        leftPosX = curImg.left - curImg.width / 2 - overLen,
        rightPosX = curImg.left + curImg.width / 2 + overLen;
      let topPos = downPoint.y,
        isOutArea = false;

      let markLine, markText;

      if (downPoint.x > midPosX && downPoint.x <= rightLineX) {
        // 应该画在右边
        // 从鼠标落点到点(rightPosX,topPos)绘制一条线
        topPos = this.getFreeSpacePos("right", rightPosX, topPos);
        const points = [downPoint.x, downPoint.y, rightPosX, topPos];
        // 直线
        markLine = new fabric.Line(points, {
          stroke: options.color,
          strokeWidth: lineWH / 2,
        });
        // 标签
        markText = new fabric.Text(markIndex + "", {
          fontSize: (32 / 4) * lineWH,
          fontFamily: "Arial",
          left: rightPosX + ((32 / 4) * lineWH) / 2,
          top: topPos,
          originY: "center",
          fill: options.color,
        });
      } else if (downPoint.x < midPosX && downPoint.x >= leftLineX) {
        topPos = this.getFreeSpacePos("left", leftPosX, topPos);
        // 从鼠标落点到点(leftPosX,topPos)绘制一条线
        const points = [downPoint.x, downPoint.y, leftPosX, topPos];
        // 直线
        markLine = new fabric.Line(points, {
          stroke: options.color, // 笔触颜色
          strokeWidth: lineWH / 2,
        });
        // 标签
        markText = new fabric.Text(markIndex + "", {
          fontSize: (32 / 4) * lineWH,
          fontFamily: "Arial",
          left: leftPosX - (32 / 4) * lineWH,
          top: topPos,
          originY: "center",
          fill: options.color,
        });
      } else {
        isOutArea = true;
      }
      if (!isOutArea) {
        canvas.add(markLine);
        markLine.saveState();
        canvas.add(markText);
        markText.saveState();
        history.add(
          new TransformCommand(markLine, "create_group", { id: markIndex })
        );
        history.add(
          new TransformCommand(markText, "create_group", { id: markIndex })
        );

        markIndex++;
      }
    },
    // 创建图片的裁剪区域
    createCropArea: function () {
      if (curCropArea) return;
      canvas.discardActiveObject();
      // 裁剪区域宽高计算
      const cropWidth = curImg.width;
      const cropHeight = curImg.height;
      // 裁剪偏移量
      const cropTop = curImg.top;
      const cropLeft = curImg.left;

      // 裁剪区域对象
      curCropArea = new fabric.Rect({
        originX: "center",
        originY: "center",
        top: cropTop,
        left: cropLeft,
        width: cropWidth,
        height: cropHeight,
        scaleX: curImg.scaleX,
        scaleY: curImg.scaleY,
        stroke: cropAreaStrokeColor,
        strokeWidth: lineWH,
        strokeDashArray: [lineWH, lineWH],
        fill: "transparent",
        selectable: true,
        isClipFrame: true,
        paintFirst: "stroke",
        // hasRotatingPoint: false, 隐藏旋转的点，新版已移除
        // lockRotation: true 禁用旋转但是有线
      });
      // 新版移除旋转的方式
      curCropArea.setControlsVisibility({ mtr: false });

      let that = this;

      // 调整裁剪区域大小
      curCropArea.on("modified", function (e) {
        // console.log("curCropArea modified: ", e, " curCropArea: ", curCropArea);
        function innerFn(e) {
          const scaledWidth = curCropArea.width * curCropArea.scaleX;
          const scaledHeight = curCropArea.height * curCropArea.scaleY;
          curCropArea.set({
            width: scaledWidth,
            height: scaledHeight,
            scaleX: 1,
            scaleY: 1,
          });
          curCropArea.setCoords();
          canvas.renderAll();
        }
        setTimeout(() => innerFn(e), 100);
      });
      // 将裁剪的矩形添加到画布上
      curCropArea.set("zIndex", 100);
      canvas.add(curCropArea);
      canvas.renderAll();
    },
    // 删除裁剪区域
    deleteCropArea: function () {
      canvas.remove(curCropArea);
      curCropArea = null;
      canvas.renderAll();
    },
    //  ===== keyboard.js =======
    // ctrl + z 撤销
    listenBackOut: function (event) {
      if (event.ctrlKey && event.keyCode == 90) {
        // z - 90
        const { index, id } = history.back();
        // 删除的是分组，id有值需要重新设置标号
        markIndex = id ? id : markIndex;
        // index == 0 只剩下个背景了,再撤销也无效果
        if (!index) return;
        canvas.renderAll();
      }
    },
    // ctrl + a 全选
    selectAllObjects: function (event) {
      // a - 65
      if (!event || (event.ctrlKey && event.keyCode == "65")) {
        // 防止浏览器默认行为
        event && event.preventDefault();

        // 全选则关闭裁剪区域的情况
        // if (curCropArea) {
        //   $(".imgEditor-tools-item.cropper")
        //     .each(function (index, item) {
        //       const $item = $(item);
        //       $item.removeClass("active");
        //     });
        //   // 删除掉 裁剪区域
        //   this.deleteCropArea();
        // }

        const bakCurCropArea = curCropArea;
        const graphObjArr = canvas
          .getObjects()
          .filter((i) => !bakCurCropArea || i != bakCurCropArea);

        let g = new fabric.Group(graphObjArr);
        canvas.clear();
        // 清空后，需要重新设置背景颜色（不然为黑）
        canvas.backgroundColor = "#fff";
        canvas.add(g);
        bakCurCropArea && canvas.add(bakCurCropArea);
        // 全选
        canvas.setActiveObject(g);
        canvas.getActiveObject().toActiveSelection();
        canvas.renderAll();
        // 禁止向上冒泡
        return false;
      }
    },
    keyDownEvent: function (e) {
      if (e.keyCode == "8") {
        // backspace - 8
        if (!curClick || curClick == curCropArea) return;
        canvas.discardActiveObject(); // 取消选择对象
        if (curClick.text) {
          curClick.text = "";
        }
        history.add(new TransformCommand(curClick, "delete")); // add command to history
        curClick.saveState(); // save new state
        canvas.remove(curClick);
        canvas.renderAll();
      } else if (e.keyCode == "18") {
        // alt - 18
        dragInfo.open = true;
      } else if (e.ctrlKey && e.keyCode == "17") {
        // ctrl - 17
        document.addEventListener("keydown", this.listenBackOut.bind(this));
        document.addEventListener("keydown", this.selectAllObjects.bind(this));
      }
    },
    keyUpEvent: function (e) {
      if (e.keyCode == "18") {
        // alt - 18
        dragInfo.open = false;
      } else if (e.keyCode == "17") {
        // ctrl - 17
        document.removeEventListener("keydown", this.listenBackOut.bind(this));
        document.addEventListener("keydown", this.selectAllObjects.bind(this));
      }
    },
    // ==== mouse.js =======
    // 缩放传入的过大宽度/高度的图像，获取应该设置的宽高
    scaleImageToAspectRatio: function (
      image,
      maxWidth = canvasWidth,
      maxHeight = canvasHeight,
      ctx2d
    ) {
      let rateX = 1,
        rateY = 1;
      // var aspectRatio = image.width / image.height; // 计算原始图像的宽高比
      if (image.width > maxWidth || image.height > maxHeight) {
        // 如果图像的宽度或高度超过了最大宽度或最大高度
        if (image.width / maxWidth > image.height / maxHeight) {
          // 如果图像的宽度与最大宽度的比值大于图像的高度与最大高度的比值
          // 根据图像宽度去进行缩放
          image.scaleToWidth(canvasWidth);
        } else {
          // 否则，根据图像高度去缩放
          image.scaleToHeight(canvasHeight);
        }
      }
      rateX = loadImageInfo.nativeWidth / image.getScaledWidth();
      rateY = loadImageInfo.nativeHeight / image.getScaledHeight();
      ctx2d.width = canvasWidth * rateX;
      ctx2d.height = canvasHeight * rateY;

      return image;
    },
    // 鼠标在画布上按下
    canvasMouseDown: function (event) {
      edit_status = "moving";
      // const downPoint = event.absolutePointer;
      downPoint = canvas.getPointer(event.e);
      // 为选中某个图像，而不是空白处，不创建新图像
      if (event.target && curImg && event.target != curImg) {
        // console.log("当前点击event.target: ", event.target);
        if (currentType == "text") {
          curText && curText.exitEditing();
        }
        curClick = event.target;
        return;
      }
      let target;
      switch (currentType) {
        case "circle":
          this.createCircle();
          target = curDraw;
          break;
        case "rect":
          this.createRect();
          target = curDraw;
          break;
        case "line":
          this.createLine(this);
          target = curDraw;
          break;
        case "text":
          curText && curText.exitEditing();
          this.createText();
          target = curText;
          break;
        case "markpoint":
          downPoint && this.createMarkPoint();
          break;
        default:
          break;
      }
      curClick = target;
      if (!target) return;
      // console.log("add target to history: ", target);
      history.add(new TransformCommand(target, "create")); // add command to history
      target.saveState(); // save new state
    },
    // 鼠标在画布上移动
    canvasMouseMove: function (event) {
      // 当前移动到的点的位置
      // const currentPoint = event.absolutePointer;
      const currentPoint = canvas.getPointer(event.e);
      // 当前不是在画新的图形，只是默认的移动图形位置
      if (edit_status != "moving") return;
      let radius, top, left, width, height;
      switch (currentType) {
        case "circle":
          radius =
            Math.min(
              Math.abs(downPoint.x - currentPoint.x),
              Math.abs(downPoint.y - currentPoint.y)
            ) / 2;
          top =
            currentPoint.y > downPoint.y
              ? downPoint.y
              : downPoint.y - radius * 2;
          left =
            currentPoint.x > downPoint.x
              ? downPoint.x
              : downPoint.x - radius * 2;
          curDraw.set({
            radius,
            top,
            left,
          });
          break;
        case "rect":
          top = Math.min(downPoint.y, currentPoint.y);
          left = Math.min(downPoint.x, currentPoint.x);
          width = Math.abs(downPoint.x - currentPoint.x);
          height = Math.abs(downPoint.y - currentPoint.y);
          curDraw.set({
            top,
            left,
            width,
            height,
          });
          break;
        case "line":
          curDraw.set({ x2: currentPoint.x, y2: currentPoint.y });
          break;
        case "text":
          break;
        default:
          break;
      }
      canvas.renderAll();
    },
    // 鼠标在画布上松开
    canvasMouseUp: function (event) {
      edit_status = "over";
      if (!currentType) return;
      // upPoint = event.absolutePointer;
      upPoint = canvas.getPointer(event.e);
      // 文本、标点，鼠标落点起点同点，其他图像，若同点，相当于没画，删除。
      if (
        currentType != "text" &&
        currentType != "markpoint" &&
        JSON.stringify(downPoint) === JSON.stringify(upPoint)
      ) {
        canvas.remove(curDraw);
      }
      // 取消激活的对象
      canvas.discardActiveObject();
    },
    // 滚轮事件
    mouseWheel: function (opt) {
      let delta = opt.e.deltaY; // 滚轮，向上滚一下是 -100，向下滚一下是 100
      if (
        curClick &&
        !Object.is(curClick, curImg) &&
        !Object.is(curCropArea, curClick)
      ) {
        if (curClick.type === "i-text") {
          // 调整文本文字的粗细
          let w = curClick.fontWeight == "normal" ? 400 : curClick.fontWeight;
          w = typeof w == "number" ? w : parseInt(w);
          w = Number.isNaN(w) ? 400 : w;
          // console.log("w1: ", w);
          const t = w - delta;
          w = t > 0 ? t : 1;
          if (w !== 1) {
            w = t <= 1000 ? t : 1000;
          }
          // console.log("w2: ", w, t);
          curClick.set("fontWeight", w);
          canvas.renderAll();
          return;
        } else if (curClick._objects && curClick._objects.length > 0) {
          // 针对选中的全部图形，应该是整体放大缩小
          canvas.discardActiveObject();
        } else {
          // 调整其他图形边框的粗细
          let strokeWidth = curClick.strokeWidth - delta / 100;
          strokeWidth = strokeWidth > 0 ? strokeWidth : 1;
          // console.log("strokeWidth: ", strokeWidth);
          curClick.set("strokeWidth", strokeWidth);
          canvas.renderAll();
          return;
        }
      }
      let zoom = canvas.getZoom(); // 获取画布当前缩放值
      zoom *= 0.999 ** delta;
      zoom = parseFloat(zoom.toFixed(2));
      if (zoom > 20) zoom = 20; // 限制最大缩放级别
      if (zoom < 0.1) zoom = 0.1; // 限制最小缩放级别
      // 以鼠标所在位置为原点缩放
      canvas.zoomToPoint(
        {
          // 关键点
          x: opt.e.offsetX,
          y: opt.e.offsetY,
        },
        zoom // 传入修改后的缩放级别
      );
    },
    // ========= tools.js ==========
    // 点击工具栏的工具
    typeChange: function (type, sign = true) {
      // 修改底部提示
      if (!type || !currentType || type != currentType) {
        this.updateBottomTips.call(this, type);
      } else {
        this.updateBottomTips.call(this, "common");
      }

      // 编辑文本，不给选中图片 (编辑文本比较特殊)
      if (type == "text") {
        curImg.selectable = false;
        canvas.renderAll();
      }

      if (type == "rotateleft" || type == "rotateright") {
        const angle =
          type == "rotateleft" ? curImg.angle - 45 : curImg.angle + 45;
        this.rotateImg(angle);
        history.add(
          new TransformCommand(curImg, "rotate", {
            angle: angle,
            direct: type.slice(-4),
          })
        );
        curImg.saveState();
        return;
      }
      if (currentType == "text") {
        curText && curText.exitEditing();
        // 复原图片可选
        curImg.selectable = true;
        // 空着的文本框，给他删除了
        canvas.forEachObject(function (obj) {
          if (obj instanceof fabric.IText) {
            if (!obj.text) {
              canvas.remove(obj);
            }
          }
        });
        canvas.renderAll();
      }
      if (!sign) return;
      // $("#selectBtn").toggleClass("active");
      if (currentType == type) {
        // 关闭
        currentType = null;

        // 左键长按 拖动 选取范围区域的颜色：设置回默认样式
        canvas.selectionColor = "rgba(100, 100, 255, 0.3)";
        canvas.selectionBorderColor = "rgba(255, 255, 255, 0.3)";

        canvas.skipTargetFind = false; // 允许被选中
        canvas.isDrawingMode = false;
      } else {
        // 开启
        currentType = type;
        // 左键长按 拖动 选取范围区域的颜色
        canvas.selectionColor = "transparent";
        canvas.selectionBorderColor = "transparent";

        canvas.skipTargetFind = true; // 禁止选中
        canvas.isDrawingMode = type == "pencilbrush" ? true : false;
      }
    },
    detailChange: function (type) {
      // 根据options重新渲染curClick
      // 箭头这个画的不同的图，不能直接换
      if (
        !curClick ||
        curClick.type == "i-text" ||
        curClick.type == "line" ||
        Object.is(curClick, curCropArea)
      )
        return;
      if (["circle", "rect"].includes(curClick.type)) {
        if (type == "fill") {
          curClick.set("fill", options.color);
        } else if (type == "point") {
          curClick.set("fill", "rgba(0,0,0,0)");
        }
        canvas.renderAll();
      }
    },
    // 监听到图片上传后，进行重新绑定
    bindEventListener: function (that) {
      that._default.tools.forEach((toolName) => {
        // 先解除绑定
        $(`.${toolName}`).unbind("click");
        // 重新绑定 ( 线、矩形、圆形、文本、自由铅笔、标点)
        if (
          [
            "line",
            "rect",
            "circle",
            "text",
            "pencilbrush",
            "markpoint",
          ].includes(toolName)
        ) {
          $(`.${toolName}`).click(function () {
            const clickThis = this;
            const isCroppering = $(".cropper").hasClass("active");
            // 正在裁剪，取消点击
            if (isCroppering) return;

            $(clickThis)
              .parent()
              .find(".imgEditor-tools-item:not(.cropper)")
              .each(function (index, item) {
                !Object.is(item, clickThis) && $(item).removeClass("active");
              });
            that.typeChange(toolName);
            $(this).toggleClass("active");
          });
        } else if (["rotateleft", "rotateright"].includes(toolName)) {
          //（旋转）
          $(`.${toolName}`).click(function () {
            that.typeChange(toolName, false);
          });
        } else if (["segment", "arrow", "point", "fill"].includes(toolName)) {
          // （线段、箭头、点、填充）
          $(`.${toolName}`).click(function () {
            const isActive = $(this).hasClass("active");
            // 必须选中一种
            if (isActive) return;
            $(this).toggleClass("active");
            const wrapthis = this;
            // 同组的互斥处理
            $(this)
              .parent()
              .find(".imgEditor-tools-item")
              .each(function (index, item) {
                const name = $(item).attr("name");
                if (!Object.is(item, wrapthis)) {
                  $(item).removeClass("active");
                  options[name] = false;
                } else {
                  options[name] = !isActive;
                }
              });
            that.detailChange(toolName);
          });
        } else if (toolName == "reset") {
          // （重置按钮）
          $(`.${toolName}`).click(function () {
            that.resetAll();
          });
        } else if (toolName == "sure") {
          // （确认上传）
          $(`.${toolName}`).click(function () {
            const oldZoom = canvas.getZoom();
            // 调整为正常大小
            canvas.setZoom(1);
            const imageData = that.getResImageData();
            // 确认
            $.iui.getMaskContainer().mask({
              message: "正在上传,请稍等.......",
            });
            const base64Data = imageData.split(",")[1];
            const cWidget = that.options.cWidget;
            const imgUpload = cWidget.options.imgUpload;
            imgUpload.fileType = uploadImgType.base64Type;
            $.ajax({
              type: "POST",
              url: "V8Base64ToFile.m",
              data: $.extend(
                {
                  base64: base64Data,
                  sessionId: session.sessionId,
                },
                imgUpload
              ),
              async: true,
              dataType: "json",
              success: function (data) {
                $.iui.getMaskContainer().mask("destroy");
                if (data.result == "success") {
                  const fileMsg = data.params.fileMsg[0];
                  if ("fail" in fileMsg) {
                    $.alert({
                      type: "错误",
                      msg: fileMsg["fail"],
                    });
                  } else {
                    $.alert({
                      type: "成功",
                      msg: "上传成功！",
                    });
                    that.options.cWidget.addImg(fileMsg);
                  }
                } else {
                  $.alert({
                    type: "错误",
                    msg: "上传失败！",
                  });
                }
              },
              error: function (data) {
                alert("上传出错!");
              },
            });
            canvas.setZoom(oldZoom);
            that.closeAndClear(that);
          });
        } else if (toolName == "download") {
          // （下载）
          $(`.${toolName}`).click(function () {
            const oldZoom = canvas.getZoom();
            // 调整为正常大小
            canvas.setZoom(1);
            const imageData = that.getResImageData();
            // 创建下载a标签
            const oA = document.createElement("a");
            oA.download = ""; // 设置下载的文件名，默认是'下载'
            oA.href = imageData;
            document.body.appendChild(oA);
            oA.click();
            oA.remove();
            // 下载后调整回来
            canvas.setZoom(oldZoom);
          });
        } else if (toolName == "cropper") {
          // （裁剪）
          $(`.${toolName}`).click(function () {
            const isActive = $(this).hasClass("active");
            if (isActive) {
              $(this).removeClass("active");
              // 删除掉 裁剪区域
              that.deleteCropArea();
              that.updateBottomTips.call(that, "common");
            } else {
              // 进入裁剪，需要退出其他图形的编辑模式
              $(this)
                .parent()
                .find(".imgEditor-tools-item.active:not(.cropper)")
                .each(function (index, item) {
                  const $item = $(item);
                  that.typeChange($item.attr("name"));
                  $item.removeClass("active");
                });
              $(this).addClass("active");
              that.createCropArea();
              that.updateBottomTips.call(that, "cropper");
            }
          });
        } else if (toolName == "confirm_cut") {
          // （确认裁剪）将当前裁剪区域作为新的图片
          $(`.${toolName}`).click(function () {
            if (!curCropArea || !curImg) return;
            const oldZoom = canvas.getZoom();
            canvas.setZoom(1);
            const imgData = that.getResImageData();

            const bakImgData = curImg.toDataURL({
              format: uploadImgType.canvasType,
              quality: 1,
            });
            curImg.saveState(); // save cur state
            history.add(
              new TransformCommand(curImg, "cropper", {
                data: bakImgData,
                canvas: canvas,
              })
            ); // add command to history
            // 替换图片数据
            curImg.setSrc(imgData, function () {
              canvas.setZoom(oldZoom);
              canvas.renderAll();
              $(".cropper").removeClass("active");
              // 删除掉 裁剪区域
              that.deleteCropArea();
              // 删除除curImg外的其他图形
              canvas.forEachObject(function (i) {
                if (i != curImg) {
                  canvas.remove(i);
                }
              });
            });
          });
        }
      });
      $(".detail_color").on("input", function (e) {
        options.color = e.target.value;
        if (curClick) {
          if (curClick.text) {
            // 文本
            curClick.set("fill", options.color);
          } else {
            // 图形，不填充只改stroke(边框)，填充改fill和stroke
            options.fill && curClick.set("fill", options.color);
            curClick.set("stroke", options.color);
          }
        } else if (pencilBrush) {
          // 自由笔刷
          pencilBrush.color = options.color;
          canvas.freeDrawingBrush = pencilBrush;
        }
        canvas.requestRenderAll();
      });

      that.$element
        .find('.imgEditor-tools-item[data-toggle="tooltip"]')
        .tooltip();
    },
    // 获取结果图像数据
    getResImageData: function () {
      // 更新targetPos，拿到最新的截图区域信息
      this.updateCurCropAreaInfo();
      // 透明化裁剪边框
      curCropArea && curCropArea.set("stroke", "transparent");
      let imageData = null;
      // 获取图片数据
      if (curCropArea) {
        // 图片裁剪区域存在，取裁剪区域
        imageData = canvas.toDataURL({
          ...targetPos,
          format: uploadImgType.canvasType,
          quality: 1,
        });
      } else {
        // 图片裁剪区域不存在，取图片区域
        // const imgRect = curImg.getBoundingRect();
        // const realY = imgRect.top;
        // const realX = imgRect.left;
        // const realWidth = imgRect.width;
        // const realHeight = imgRect.height;
        // 检测边界 (获取)
        const { minLeft, maxLeft, minTop, maxTop } = this.getCurBoundarySize();
        imageData = canvas.toDataURL({
          width: maxLeft - minLeft,
          height: maxTop - minTop,
          top: minTop,
          left: minLeft,
          format: uploadImgType.canvasType,
          quality: 1,
        });
      }
      // 重新设置裁剪框为红色
      curCropArea && curCropArea.set("stroke", cropAreaStrokeColor);
      return imageData;
    },
    // 获取图像有内容的边界
    getCurBoundarySize: function () {
      if (!canvas) return;
      // 代表四个边的边界：左边界、右边界、上边界、下边界
      let minLeft, maxLeft, minTop, maxTop;
      canvas.getObjects().forEach(function (i, index) {
        const { width, height, top, left } = i.getBoundingRect();
        if (index == 0) {
          minLeft = left;
          maxLeft = left + width;
          minTop = top;
          maxTop = top + height;
        } else {
          minLeft = Math.min(minLeft, left);
          maxLeft = Math.max(maxLeft, left + width);

          minTop = Math.min(minTop, top);
          maxTop = Math.max(maxTop, top + height);
        }
      });
      return { minLeft, maxLeft, minTop, maxTop };
    },
    // 找到空着的地方（标点）
    getFreeSpacePos: function (direct, x, y) {
      const distance = lineWH * 2;
      const intY = parseInt(y);
      let resY = intY;

      if (markLines.size == 0) {
        for (let i = intY - distance; i <= intY + distance; i++) {
          markLines.add(`${direct}_${i}`);
        }
      } else {
        let t = 0;
        curY = direct + "_" + intY;
        while (markLines.has(curY)) {
          curY = direct + "_" + (intY + t);
          t += distance;
        }
        resY = intY + t;
        for (let i = resY - distance; i <= resY + distance; i++) {
          markLines.add(`${direct}_${i}`);
        }
      }
      return resY;
    },
    // 清空关闭窗口，清空数据
    closeAndClear: function (that) {
      markIndex = 1;
      that.$element.hide();
      // 清空原先数据
      canvas && canvas.clear(); // clear且清除绑定的事件
      curCropArea = null;
      currentType = null;
      $(".reset-clear-all")
        .find(".imgEditor-tools-item")
        .each(function (index, item) {
          $(item).removeClass("active");
        });
      that.$element.find(".canvas_fileInputs").val("");
      window.removeEventListener("wheel", that.windowWheelEvent);
    },
    output: function () {
      var objects = canvas.getObjects();
      objects.forEach(function (object, index) {
        console.log("图层 " + (index + 1) + " 的信息：");
        console.log(
          "类型：" + object.type,
          " 位置：left -> " + object.left + ", top -> " + object.top,
          " 宽高: width -> " + object.width + ", height -> " + object.height
        );
      });
      // console.log(
      //   "curImg: width - height - left - top - scaleX - scaleY为：",
      //   curImg.width,
      //   curImg.height,
      //   curImg.left,
      //   curImg.top,
      //   curImg.scaleX,
      //   curImg.scaleY
      // );
    },
    updateBottomTips: function (type, text = "") {
      if (currentType && type == currentType) return;
      let tips =
        "通用提示：鼠标滚轮缩放，ctrl+z为撤销，ctrl+a为全选，backspace可以删除选中图形，调色板修改选中的图形颜色以及之后画的图形的颜色。单击选中上传的图片，为全选效果";
      switch (type) {
        case "common":
          break;
        case "cropper":
          tips = "目前为：裁剪模式，无法进行画其他图形，重新点击裁剪退出模式";
          break;
        case "line":
          tips =
            "正在画：直线，可选取线段或箭头，修改画出的图形，鼠标滚轮改变图形的粗细";
          break;
        case "rect":
          tips =
            "正在画：矩形/正方形，退出模式可以调整图形宽、高、旋转角度，鼠标滚轮改变图形的粗细";
          break;
        case "circle":
          tips =
            "正在画：圆形/椭圆，退出模式可以调整图形，鼠标滚轮改变图形的粗细";
          break;
        case "text":
          tips =
            "正在进行：文本输入，单击画布上的任意位置输入，鼠标滚轮改变文字的粗细。此时可以移动其他图形，但是无法移动图片";
          break;
        case "pencilbrush":
          tips = "正在使用：铅笔，按shift画直线，鼠标滚轮改变所画线条的粗细";
          break;
        case "markpoint":
          tips =
            "正在使用：标记点位，单击图片上的任意一个位置，标记点位，从1开始递增";
          break;
        default:
          break;
      }
      tips = text ? text : tips;
      // 设置
      this.$element.find(".imgEditor-container .imgEditor-tips").html(tips);
    },
  };

  $.fn.cropper = function (options, para) {
    let instance;
    instance = $.data(this, "cropper");
    if (!instance) {
      instance = new cropper(this, options, para);
      $.data(this, "cropper", instance);
    }

    if ($.type(options) == "string") {
      return instance[options](para);
    }
    return this;
  };
})(jQuery);
