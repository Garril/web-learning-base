// 命令栈
export default class CommandHistory {
  constructor() {
    this.commands = [];
    this.index = 0;
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
        return this.index;
      } else if (command.operType == "modified") {
        command.undo();
      } else if (command.operType == "create") {
        canvas.remove(command.receiver);
        command.undo();
      } else if (command.operType == "delete") {
        canvas.add(command.receiver);
      } else if (command.operType == "rotate") {
        let { angle, direct } = command.params;
        angle = direct == 'left' ? (angle + 45) : (angle - 45);
        rotateImg(angle);
      }
    }
    return this.index;
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