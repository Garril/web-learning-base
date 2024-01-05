// 操作类
export default class TransformCommand {
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