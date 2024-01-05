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

    const canvasEle = `<canvas id=${canvasId} style="border: 1px solid #ccc;min-height: 360px;"></canvas>`;
    const canvasContainer = $element.find(".imgEditor-editField").eq(0);
    canvasContainer.append(canvasEle);

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
      canvasWidth = this.$element.find(".imgEditor-editField").width();
      // 画布两边间距
      canvasWidth -= 30;
      canvasHeight = this.$element.find(".imgEditor-editField").height();
      // 创建画布
      canvas = new fabric.Canvas(canvasId, {
        width: canvasWidth,
        height: canvasHeight,
      });
      canvas.stateful = true;
      // 设置背景颜色
      canvas.backgroundColor = "#fff";

      canvas.on("mouse:down", this.canvasMouseDown.bind(this)); // 鼠标在画布上按下
      canvas.on("mouse:up", this.canvasMouseUp.bind(this)); // 鼠标在画布上松开
      canvas.on("mouse:move", this.canvasMouseMove.bind(this)); // 鼠标在画布上移动
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
    },
    windowWheelEvent: function (e) {
      e.preventDefault();
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
