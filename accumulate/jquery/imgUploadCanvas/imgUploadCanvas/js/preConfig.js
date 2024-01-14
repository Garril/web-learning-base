// 命令栈
class CommandHistory {
  constructor(canvas) {
    this.commands = [];
    this.index = 0;
    this.canvas = canvas;
  }
  getIndex() {
    return this.index;
  }
  back() {
    if (this.index > 0) {
      let command = this.commands[--this.index];
      // console.log("当前back的command为: ", command);
      // console.log("原操作类型为operType: ", command.operType);
      if (command.operType == "origin") {
        // 传入的被编辑的图片，不撤销处理
        return this.index;
      } else if (command.operType == "modified") {
        // 图像的移动和变换大小
        command.undo();
      } else if (command.operType == "create") {
        // 图形创建
        this.canvas.remove(command.receiver);
        command.undo();
      } else if (command.operType == "delete") {
        // backspace的删除操作
        this.canvas.add(command.receiver);
      } else if (command.operType == "rotate") {
        // 旋转
        let { angle, direct } = command.params;
        angle = direct == 'left' ? (angle + 45) : (angle - 45);
        rotateImg(angle);
      } else if (command.operType == 'cropper') {
        // 裁剪操作
        const curImg = command.receiver,
          imgData = command.params.data || '',
          canvas = command.params.canvas;
        if (!imgData || !canvas) return;
        const oldZoom = canvas.getZoom();
        canvas.setZoom(1);
        curImg.setSrc(imgData, function () {
          canvas.setZoom(oldZoom);
          canvas.renderAll();
        });
      } else if (command.operType == "create_group") {
        // 创建同组图像
        let tindex = this.index; // 当前被删除图像的index
        let curGroupId = command.params && command.params.id; // 当前分组id
        let tGroupId = curGroupId, tcommand = command;
        while (tGroupId && tindex > 0 && tGroupId == curGroupId) {
          // 执行删除
          this.canvas.remove(tcommand.receiver);
          tcommand.undo();
          // 下一个command
          tindex--;
          tcommand = this.commands[tindex];
          tGroupId = tcommand.params && tcommand.params.id;
        }
        if (tindex >= 0) {
          this.index = tindex + 1;
        }
        return { id: curGroupId, index: this.index };
      }
    }
    return { index: this.index };
  }
  forward() {
    if (this.index < this.commands.length) {
      let command = this.commands[this.index++];
      command.execute();
    }
    return this;
  }
  add(command) {
    // console.log("add command: ", command);
    if (this.commands.length) {
      this.commands.splice(this.index, this.commands.length - this.index);
    }
    this.commands.push(command);
    this.index++;
    return this;
  }
  clear() {
    this.commands.length = 0;
    this.index = 0;
    return this;
  }
}
// 操作类
class TransformCommand {
  constructor(receiver, operType, params = {}) {
    this.receiver = receiver;
    this.operType = operType;
    this.params = params;
    // save _stateProperties
    this.stateProperties = Object.keys(this.receiver._stateProperties);

    this.state = {};
    this.prevState = {};

    // save state
    this.stateProperties.forEach((prop) => {
      this.state[prop] = this.receiver.get(prop);
    });
    // save prev state
    if (this.receiver._stateProperties) {
      this.stateProperties.forEach((prop) => {
        this.prevState[prop] = this.receiver._stateProperties[prop];
      });
    }
  }
  execute() {
    this._restore(this.state);
    this.receiver.setCoords();
  }
  undo() {
    // console.log("this.receiver: ", this.receiver);
    this._restore(this.prevState);
    this.receiver.setCoords();
  }
  _restore(state) {
    this.stateProperties.forEach((prop) => {
      this.receiver.set(prop, state[prop]);
    });
  }
};
function preConfigFabric(fabric) {
  // 箭头线类相关配置
  fabric.LineArrow = fabric.util.createClass(fabric.Line, {
    hasBorders: false,
    hasControls: false,
    // 初始化时动态使用lineWH
    initialize(points, options) {
      options || (options = {});
      this.callSuper("initialize", points, options);
      this.strokeWidth = options.strokeWidth || 4; // 设置strokeWidth为变量lineWH，如果未设置则默认为4
    },
    _getCacheCanvasDimensions() {
      var dim = this.callSuper("_getCacheCanvasDimensions");
      dim.width += 20; // found by trial and error
      dim.height += 20; // found by trial and error
      return dim;
    },

    _render(ctx) {
      this.callSuper("_render", ctx);
      ctx.save();
      const xDiff = this.x2 - this.x1;
      const yDiff = this.y2 - this.y1;
      const angle = Math.atan2(yDiff, xDiff);
      ctx.translate((this.x2 - this.x1) / 2, (this.y2 - this.y1) / 2);
      ctx.rotate(angle);
      ctx.beginPath();
      // Move 5px in front of line to start the arrow so it does not have the square line end showing in front (0,0)
      // 在_render函数中箭头绘制部分
      ctx.moveTo(2 * this.strokeWidth, 0);
      ctx.lineTo(-2 * this.strokeWidth, 2 * this.strokeWidth);
      ctx.lineTo(-2 * this.strokeWidth, -2 * this.strokeWidth);

      ctx.closePath();
      ctx.fillStyle = this.stroke;
      ctx.fill();
      ctx.restore();
    },
  });
  fabric.LineArrow.fromObject = function (object, callback) {
    callback &&
      callback(
        new fabric.LineArrow([object.x1, object.y1, object.x2, object.y2], object)
      );
  };
  fabric.LineArrow.async = true;
}