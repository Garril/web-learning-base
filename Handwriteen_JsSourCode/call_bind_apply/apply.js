Function.prototype.zwapply = function(thisArg,argArr) {
  let fn = this;
  thisArg = (thisArg!==undefined && thisArg!==null) ? Object(thisArg) : window;
  thisArg.fn = fn;
  // if(!argArr) argArr = [];
  argArr = argArr || [];
  let res = thisArg.fn(...argArr);
  delete thisArg.fn;
  return res;
}
function sum(a,b) {
  let res = a+b;
  res = res || 0;
  console.log("函数执行: ",this,"res: ",res);
  return res;
}
sum.apply(undefined);
sum.apply(undefined,[10,29]);
sum.apply(undefined,[10,29,39]);
sum.apply(undefined,10,29);