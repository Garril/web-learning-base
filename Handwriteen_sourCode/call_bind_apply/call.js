Function.prototype.zwcall = function(thisArg,...args) {
  let fn = this;
  thisArg = (thisArg!==undefined && thisArg!==null) ? Object(thisArg):window;
  thisArg.fn = fn;
  let res = thisArg.fn(...args);
  delete thisArg.fn;
  return res;
}

function a() {
  console.log("函数执行: ",this,"name",this.name);
}
let obj = {
  name:"hhh"
}
a.zwcall(undefined);
a.zwcall(obj);
