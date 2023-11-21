import CommandHistory from "./class/CommandHistory.js";
import TransformCommand from "./class/TransformCommand.js";

const eidtTools = [
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
];

export function useCropper($) {
  let downPoint, upPoint; // 点击初始和结束的两个鼠标点
  let curClick; // 当前选中的图像/图形
  let curDraw, curText; // 当前画的图,当前的文本
  let canvas, res_canvas;
  let currentType; // 创建的图像类型
  let curImg, originalImage; // 当前被编辑的图片
  let curCropArea; // 只会有一个裁剪的区域
  let loadImageInfo = {}; // 图片初始的width和height
  let canvasWidth = 400,
    canvasHeight = 400; // 画布的宽高
  let options = {
    color: "#000000",
    segment: true,
    arrow: false,
    point: true,
    fill: false,
  };
  let edit_status = "over";
  // 记录鼠标起始位置和标记
  const dragInfo = {
    open: false,
    isDragging: false,
    startMouseX: 0,
    startMouseY: 0,
  };
  const history = new CommandHistory(); // 历史记录栈
  let cropAreaStroke = "red";
  let curUrl = null;
  let pencilBrush = null;
  let targetPos = {};
  let uploadImgType;
  const canvasRan = Math.random().toFixed(10).slice(-5);
  const canvasId = "canvas" + canvasRan,
    resCanvasId = "rescanvas" + canvasRan;

  function cropper($element, options) {
    this.$element = $element;

    const canvasEle = `<canvas id=${canvasId} style="border: 1px solid #ccc;min-height: 360px;"></canvas>`,
      resCanvasEle = `<canvas id=${resCanvasId} style="border: 1px solid #ccc;min-height: 360px;"></canvas>`;
    const canvasContainer = $element.find(".imgEditor-editField").eq(0);
    canvasContainer.append(canvasEle);
    canvasContainer.append(resCanvasEle);

    this._default = {
      addToolsEvent: false,
      tools: eidtTools,
    };
    const params = {};
    this.options = $.extend({ params }, this._default, options || {});

    // // 监听图片上传
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
        curCropArea = null;
        cropAreaStroke = "red";
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
    // 初始化画板
    initCanvas: function (data) {
      let that = this;
      canvasWidth = this.$element.find(".imgEditor-editField").width() / 2;
      // 画布两边间距
      canvasWidth -= 30;
      canvasHeight = this.$element.find(".imgEditor-editField").height();
      // 创建画布
      canvas = new fabric.Canvas(canvasId, {
        width: canvasWidth,
        height: canvasHeight,
      });
      canvas.stateful = true;
      // 展示编辑结果
      if (!res_canvas) {
        res_canvas = new fabric.Canvas(resCanvasId, {
          width: canvasWidth,
          height: canvasHeight,
        });
      } else {
        res_canvas.set({
          width: canvasWidth,
          height: canvasHeight,
        });
      }
      // 设置背景颜色
      canvas.backgroundColor = "#fff";

      canvas.on("mouse:down", this.canvasMouseDown.bind(this)); // 鼠标在画布上按下
      canvas.on("mouse:up", this.canvasMouseUp.bind(this)); // 鼠标在画布上松开
      canvas.on("mouse:move", this.canvasMouseMove.bind(this)); // 鼠标在画布上移动
      // 按下alt后的事件
      canvas.on("mouse:down", this.altMouseDown.bind(this));
      canvas.on("mouse:move", this.altMouseMove.bind(this));
      canvas.on("mouse:up", this.altMouseUp.bind(this));
      // 控制画布内图像的不越过画布边界
      canvas.on("object:moving", function (e) {
        const curMoving = e.target;
        that.limitSizeAndMove(curMoving);
      });
      let mouseWheelTimer = null;
      // 监听鼠标滚轮缩放事件
      canvas.on("mouse:wheel", (opt) => {
        that.mouseWheel(opt);
        mouseWheelTimer && clearTimeout(mouseWheelTimer);
        mouseWheelTimer = setTimeout(function () {
          that.refreshCurCropImage();
        }, 300);
      });
      canvas.on("object:modified", ({ target }) => {
        history.add(new TransformCommand(target, "modified")); // add command to history
        target.saveState(); // save new state
        // curCropArea需要延后，自己去刷新
        !Object.is(target, curCropArea) && this.refreshCurCropImage();
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
        limitedToCanvasSize: true, // 禁止画笔超出画布
        straightLineKey: "shiftKey", // 按shift画直线
      });
      canvas.freeDrawingBrush = pencilBrush;

      // 铅笔画完一段
      canvas.on("path:created", function (opt) {
        history.add(new TransformCommand(opt.path, "create"));
        opt.path.saveState();
        that.refreshCurCropImage();
      });

      let rotateTimer = null;
      canvas.on("object:rotating", ({ target }) => {
        rotateTimer && clearTimeout(rotateTimer);
        rotateTimer = setTimeout(function () {
          history.add(new TransformCommand(target, "modified")); // add command to history
          target.saveState(); // save new state
          that.refreshCurCropImage();
        }, 1000);
      });
      curUrl = data ? data : "./img/test.png";
      // 使用fabric的api加载图片
      fabric.Image.fromURL(
        curUrl, // ./test.png / data 参数1：图片路径
        (img) => {
          // 图片加载完成后
          // 设置图片在画布中的大小
          img = this.scaleImageToAspectRatio(img, canvasWidth, canvasHeight);
          loadImageInfo = {
            width: img.width, // 初始宽度
            height: img.height, // 初始高度
            finWidth: img.getScaledWidth(), // 调整后的宽度
            finHeight: img.getScaledHeight(), // 调整后的高度
          };
          // 设置图片居中
          img.top = (canvasHeight - loadImageInfo.finHeight) / 2;
          img.left = (canvasWidth - loadImageInfo.finWidth) / 2;
          curImg = img;
          // originalImage = fabric.util.object.clone(img);
          canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
          // canvas.add(img).sendToBack(img);
          canvas.renderAll(); // 渲染画布
          this.createImgCrop(); // 创建裁剪区域，且刷新右侧结果画布
          img.saveState();
          history.add(new TransformCommand(img, "origin")); // add command to history
          this.bindEventListener(this);
        },
        { crossOrigin: "anonymous" }
      );
      // 监听键盘按下事件
      document.addEventListener("keydown", function (e) {
        that.keyDownEvent(e);
      });
      document.addEventListener("keyup", function (e) {
        that.keyUpEvent(e);
      });
    },
    windowWheelEvent: function (e) {
      e.preventDefault();
    },
    // 给canvas画透明灰白格背景
    drawTransparentPattern: function (canvas) {
      const patternCanvas = document.createElement("canvas");
      patternCanvas.width = 20;
      patternCanvas.height = 20;

      const patternCtx = patternCanvas.getContext("2d");
      patternCtx.fillStyle = "#cccccc";
      patternCtx.fillRect(0, 0, 10, 10);
      patternCtx.fillRect(10, 10, 10, 10);

      const pattern = canvas
        .getContext("2d")
        .createPattern(patternCanvas, "repeat");
      return pattern;
    },
    // 刷新右边截图预览
    refreshCurCropImage: function () {
      if (!curCropArea) return;
      curCropArea.set("stroke", "rgba(0,0,0,0)");
      // 清空右边画布
      res_canvas.clear();
      // 要截取canvas的区域信息
      // console.log(curCropArea);
      const { left, top, width, height } = curCropArea;
      const res_ctx = res_canvas.getContext("2d");
      // 将第一个 canvas 转换为图像数据
      const imageData = canvas.toDataURL({
        format: uploadImgType.canvasType,
      });
      // 在第二个 canvas 上绘制第一个 canvas 的指定区域
      const img = new Image();
      img.src = imageData;
      const that = this;
      img.onload = function () {
        // res_ctx.drawImage(img, left, top, width, height, left, top, width, height);
        // 计算在 res_canvas 中绘制的位置以使其居中
        const res_left = (res_canvas.width - width) / 2;
        const res_top = (res_canvas.height - height) / 2;
        // alt移动/zoom缩放之后 画布的缩放比例和偏移量
        const _scaleX = canvas.viewportTransform[0];
        const _scaleY = canvas.viewportTransform[3];
        const _left = canvas.viewportTransform[4];
        const _top = canvas.viewportTransform[5];
        // 计算缩放后的裁剪矩形的坐标和大小
        const scaledLeft = left * _scaleX + _left;
        const scaledTop = top * _scaleY + _top;
        const scaledWidth = width * _scaleX;
        const scaledHeight = height * _scaleY;
        targetPos = {
          left: scaledLeft,
          top: scaledTop,
          width: scaledWidth,
          height: scaledHeight,
        };

        // 在第二个 canvas 上绘制第一个 canvas 的指定区域
        res_ctx.drawImage(
          img,
          scaledLeft,
          scaledTop,
          scaledWidth,
          scaledHeight,
          res_left,
          res_top,
          width,
          height
        );
        /* setTimeout(function () {
          
        }, 500); */
        curCropArea.set("stroke", cropAreaStroke);
        canvas.renderAll();
        canvas.setBackgroundColor(
          that.drawTransparentPattern(canvas),
          function () {
            canvas.renderAll();
          }
        );
        // that.output();
      };
    },
    // 限制裁剪区域的大小和移动范围
    limitSizeAndMove: function (target) {
      if (target != curCropArea || curImg.angle != 0) return;
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
    // 移除滤镜
    removeFilters: function () {
      curImg.filters = []; // 清空滤镜数组
      curImg.applyFilters(); // 更新滤镜效果
      canvas.renderAll();
    },
    // 重置
    resetAll: function (param) {
      // 清空原先数据
      canvas && canvas.dispose(); // clear且清除绑定的事件
      curCropArea = null;
      currentType = null;
      $(".reset-clear-all")
        .find(".imgEditor-tools-item")
        .each(function (index, item) {
          $(item).removeClass("active");
        });
      cropAreaStroke = "red";
      this.Canvas(curUrl);
    },
    // 旋转图片
    rotateImg: function (angle) {
      curImg.rotate(angle);
      canvas.renderAll();
      curCropArea && this.refreshCurCropImage();
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
      });
      canvas.add(curDraw);
    },
    // 带箭头的直线
    createArrowLine: function () {
      const points = [downPoint.x, downPoint.y, downPoint.x, downPoint.y];
      curDraw = new fabric.LineArrow(points, {
        strokeWidth: 2,
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
      });
      canvas.add(curDraw);
    },
    // 创建可编辑文本
    createText: function () {
      curText = new fabric.IText("", {
        fontFamily: "Arial",
        fontSize: 20,
        left: downPoint.x,
        top: downPoint.y,
        lineHeight: 20,
        fill: options.color, // 字体颜色
        borderColor: "orange", // 选中时边框颜色
        editingBorderColor: "blue", // 点击文字进入编辑状态时的边框颜色
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
    // 创建图片的裁剪区域
    createImgCrop: function () {
      if (curCropArea) return;
      // 上传图片宽高
      const imgWidth = curImg.getScaledWidth(),
        imgHeight = curImg.getScaledHeight();
      // 裁剪区域宽高计算
      let width = imgWidth;
      let height = imgHeight;
      // 根据传入的比例进行修改 裁剪区域的宽高
      const params = this.options.params || {};
      if (params.cropRatio) {
        const arr = params.cropRatio.split(":");
        const aspectRatio = parseInt(arr[0]) / parseInt(arr[1]);
        // 使用最大宽度和最大高度计算限制宽高比例下的宽度和高度
        if (width / aspectRatio > height) {
          width = height * aspectRatio;
        } else {
          height = width / aspectRatio;
        }
      }
      // 裁剪偏移量
      const top = curImg.top + (imgHeight - height) / 2;
      const left = curImg.left + (imgWidth - width) / 2;
      // 裁剪区域对象
      curCropArea = new fabric.Rect({
        top,
        left,
        width,
        height,
        stroke: "rgba(0,0,0,0)",
        strokeWidth: 1,
        strokeDashArray: [5, 5],
        fill: "rgba(255,255,255,0)",
        selectable: true,
        isClipFrame: true,
        // hasRotatingPoint: false, 隐藏旋转的点，新版已移除
        // lockRotation: true 禁用旋转但是有线
      });
      // 新版移除旋转
      curCropArea.setControlsVisibility({ mtr: false });
      let that = this;
      curCropArea.on("modified", function (e) {
        // console.log("curCropArea modified: ", e, " curCropArea: ", curCropArea)
        function innerFn(e) {
          if (e.action == "scale") {
            const scaledWidth = curCropArea.width * curCropArea.scaleX;
            const scaledHeight = curCropArea.height * curCropArea.scaleY;
            curCropArea.set("width", scaledWidth);
            curCropArea.set("height", scaledHeight);
          } else if (e.action == "scaleY") {
            const scaledHeight = curCropArea.height * curCropArea.scaleY;
            curCropArea.set("height", scaledHeight);
          } else if (e.action == "scaleX") {
            const scaledWidth = curCropArea.width * curCropArea.scaleX;
            curCropArea.set("width", scaledWidth);
          }
          curCropArea.set("scaleX", 1);
          curCropArea.set("scaleY", 1);

          curCropArea.setCoords();
          canvas.renderAll();
          that.refreshCurCropImage();
        }
        setTimeout(innerFn(e), 100);
      });
      // 将裁剪的矩形添加到画布上
      canvas.add(curCropArea);
      canvas.renderAll();
      this.refreshCurCropImage();
    },
    // 创建图片的遮罩
    createCropMask: function () {
      // 从原色图片对象中移除灰度滤镜
      originalImage.filters = [];
      originalImage.applyFilters();
      // 创建一个图像灰度滤镜
      const grayscaleFilter = new fabric.Image.filters.Grayscale();
      // 应用灰度滤镜到图像
      curImg.filters.push(grayscaleFilter);
      curImg.applyFilters();
      canvas.renderAll();
    },
    //  ===== keyboard.js =======
    // ctrl + z
    listenBackOut: function (event) {
      if (event.ctrlKey && event.keyCode == 90) {
        const index = history.back();
        // index == 0 只剩下个背景了,再撤销也无效果
        if (!index) return;
        curCropArea.set("stroke", "transparent");
        canvas.renderAll();
        this.refreshCurCropImage();
      }
    },
    keyDownEvent: function (e) {
      if (e.keyCode == "8") {
        // backspace
        if (!curClick || curClick == curCropArea) return;
        canvas.discardActiveObject(); // 取消选择对象
        if (curClick.text) {
          curClick.text = "";
        }
        history.add(new TransformCommand(curClick, "delete")); // add command to history
        curClick.saveState(); // save new state
        canvas.remove(curClick);
        canvas.renderAll();
        this.refreshCurCropImage();
      } else if (e.keyCode == "18") {
        // alt
        dragInfo.open = true;
      } else if (e.keyCode == "17") {
        document.addEventListener("keydown", this.listenBackOut.bind(this));
      }
    },
    keyUpEvent: function (e) {
      if (e.keyCode == "18") {
        // alt
        dragInfo.open = false;
      } else if (e.keyCode == "17") {
        document.removeEventListener("keydown", this.listenBackOut.bind(this));
      }
    },
    // ==== mouse.js =======
    // 按下alt后鼠标的事件
    altMouseDown: function (event) {
      if (!dragInfo.open) return;
      var evt = event.e;
      dragInfo.isDragging = true;
      dragInfo.startMouseX = evt.clientX;
      dragInfo.startMouseY = evt.clientY;
    },
    altMouseMove: function (event) {
      if (!dragInfo.open) return;
      var evt = event.e;
      if (dragInfo.isDragging) {
        // 检查是否正在拖动画布
        var mouseX = evt.clientX;
        var mouseY = evt.clientY;
        var deltaX = mouseX - dragInfo.startMouseX;
        var deltaY = mouseY - dragInfo.startMouseY;

        // 平移画布
        canvas.viewportTransform[4] += deltaX;
        canvas.viewportTransform[5] += deltaY;
        // 重新渲染画布
        canvas.requestRenderAll();
        // 更新鼠标起始位置
        dragInfo.startMouseX = mouseX;
        dragInfo.startMouseY = mouseY;
      }
    },
    altMouseUp: function (event) {
      if (!dragInfo.open) return;
      dragInfo.isDragging = false;
    },
    // 缩放传入的过大宽度/高度的图像
    scaleImageToAspectRatio: function (
      image,
      maxWidth = canvasWidth,
      maxHeight = canvasHeight
    ) {
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
      return image;
    },
    // 鼠标在画布上按下
    canvasMouseDown: function (event) {
      edit_status = "moving";
      // const downPoint = event.absolutePointer;
      downPoint = canvas.getPointer(event.e);
      // 为选中某个图像，而不是空白处，不创建新图像
      if (event.target) {
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
      if (
        currentType != "text" &&
        JSON.stringify(downPoint) === JSON.stringify(upPoint)
      ) {
        canvas.remove(curDraw);
      }
      // canvas.bringForward(curCropArea);
      canvas.discardActiveObject();
      this.refreshCurCropImage();
    },
    // 滚轮事件
    mouseWheel: function (opt) {
      let delta = opt.e.deltaY; // 滚轮，向上滚一下是 -100，向下滚一下是 100
      if (curClick && !Object.is(curCropArea, curClick)) {
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
        } else {
          // 调整其他图形边框的粗细
          let strokeWidth = curClick.strokeWidth - delta / 100;
          strokeWidth = strokeWidth > 0 ? strokeWidth : 1;
          // console.log("strokeWidth: ", strokeWidth);
          curClick.set("strokeWidth", strokeWidth);
        }
        canvas.renderAll();
        return;
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
      if (type == "rotateleft" || type == "rotateright") {
        const angle =
          type == "rotateleft" ? curImg.angle - 45 : curImg.angle + 45;
        this.rotateImg(angle);
        history.add(
          new TransformCommand(curImg, "rotate", {
            angle: angle,
            direct: type.slice(-4),
          })
        ); // add command to history
        curImg.saveState();
        return;
      }
      if (currentType == "text") {
        curText && curText.exitEditing();
      }
      if (!sign) return;
      // $("#selectBtn").toggleClass("active");
      if (currentType == type) {
        // 关闭
        currentType = null;
        canvas.skipTargetFind = false; // 允许被选中
        canvas.isDrawingMode = false;
      } else {
        // 开启
        currentType = type;
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
    bindEventListener: function (that) {
      that._default.tools.forEach((toolName) => {
        // 先解除绑定
        $(`.${toolName}`).unbind("click");
        // 重新绑定
        if (
          ["line", "rect", "circle", "text", "pencilbrush"].includes(toolName)
        ) {
          $(`.${toolName}`).click(function () {
            const clickThis = this;
            $(clickThis)
              .parent()
              .find(".imgEditor-tools-item")
              .each(function (index, item) {
                !Object.is(item, clickThis) && $(item).removeClass("active");
              });
            that.typeChange(toolName);
            $(this).toggleClass("active");
          });
        } else if (["rotateleft", "rotateright"].includes(toolName)) {
          $(`.${toolName}`).click(function () {
            that.typeChange(toolName, false);
          });
        } else if (["segment", "arrow", "point", "fill"].includes(toolName)) {
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
          $(`.${toolName}`).click(function () {
            console.log("重置");
            that.resetAll();
          });
        } else if (toolName == "sure") {
          $(`.${toolName}`).click(function () {
            if (!curCropArea) return;
            // 确认
            $.iui.getMaskContainer().mask({
              message: "正在上传,请稍等.......",
            });
            curCropArea.set("stroke", "rgba(0,0,0,0)");
            const imageData = canvas.toDataURL({ ...targetPos });

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
            that.closeAndClear(that);
          });
        } else if (toolName == "download") {
          $(`.${toolName}`).click(function () {
            // 计算生成的图片大小
            const aspectRatio = targetPos.width / targetPos.height;
            let width = loadImageInfo.width,
              height = loadImageInfo.height;
            // 使用最大宽度和最大高度计算限制宽高比例下的宽度和高度
            if (width / aspectRatio > height) {
              width = height * aspectRatio;
            } else {
              height = width / aspectRatio;
            }
            curCropArea.set("stroke", "rgba(0,0,0,0)");
            const imageData = canvas.toDataURL({
              ...targetPos,
              format: uploadImgType.canvasType,
            });
            curCropArea.set("stroke", cropAreaStroke);
            const img = new Image(width, height);
            img.src = imageData;
            img.onload = function () {
              const origin_canvas = document.createElement("canvas");
              origin_canvas.width = width;
              origin_canvas.height = height;
              const ctx = origin_canvas.getContext("2d");
              ctx.drawImage(img, 0, 0, width, height);
              const dataURL = origin_canvas.toDataURL(uploadImgType.base64Type);
              const oA = document.createElement("a");
              oA.download = ""; // 设置下载的文件名，默认是'下载'
              oA.href = dataURL;
              // oA.href = imageData;
              document.body.appendChild(oA);
              oA.click();
              oA.remove();
              ctx?.clearRect(0, 0, width, height);
            };
          });
        }
      });

      // 只处理颜色的变化
      let changeColorTimer;
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
        }
        canvas.requestRenderAll();
        changeColorTimer && clearTimeout(changeColorTimer);
        changeColorTimer = setTimeout(function () {
          that.refreshCurCropImage();
        }, 100);
      });

      // that.$element
      //   .find('.imgEditor-tools-item[data-toggle="tooltip"]')
      //   .tooltip();
    },
    closeAndClear: function (that) {
      that.$element.hide();
      // 清空原先数据
      canvas && canvas.clear(); // clear且清除绑定的事件
      res_canvas && res_canvas.clear(); // clear且清除绑定的事件
      curCropArea = null;
      currentType = null;
      $(".reset-clear-all")
        .find(".imgEditor-tools-item")
        .each(function (index, item) {
          $(item).removeClass("active");
        });
      cropAreaStroke = "red";
      that.$element.find(".canvas_fileInputs").val("");
      window.removeEventListener("wheel", that.windowWheelEvent);
    },
    output: function () {
      var objects = canvas.getObjects();
      objects.forEach(function (object, index) {
        console.log("图层 " + (index + 1) + " 的信息：");
        console.log(
          "类型：" + object.type,
          " 位置：" + object.left + ", " + object.top
        );
        console.log(object.width, object.height);
        // 可以根据需要获取其他属性和数据
      });
      console.log(
        "curImg: ",
        curImg.width,
        curImg.height,
        curImg.left,
        curImg.top,
        curImg.scaleX,
        curImg.scaleY
      );
    },
  };
  $.fn.cropper = function (options, para) {
    let instance = new cropper(this, options, para);
    return instance;
  };
}
