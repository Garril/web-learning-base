// 箭头线类相关配置
fabric.LineArrow = fabric.util.createClass(fabric.Line, {
  hasBorders: false,
  hasControls: false,

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
    ctx.moveTo(10, 0);
    ctx.lineTo(-10, 10);
    ctx.lineTo(-10, -10);
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