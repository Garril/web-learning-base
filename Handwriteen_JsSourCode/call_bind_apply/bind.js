Function.prototype.zwBind = function(thisArg,...args) {
  let fn = this;
  thisArg = (thisArg !== null && thisArg !== undefined) ? Object(thisArg): window;
  
  function proxyFn(...arg) {
    thisArg.fn = fn;
    let finArr = [...args,...arg];
    let res = thisArg.fn(...finArr);
    delete thisArg.fn;
    return res;
  }
  return proxyFn;
}


// 测试代码
function foo(a,b,c) {
  let res = a+b+c;
  console.log("foo执行",this);
  console.log(res)
  return res;
}

let zwfoo = foo.zwBind(undefined,10,20,30)
zwfoo();

console.log("============ first ===========")

let obj = {
  name:'hhh'
}
let zwfoo1 = foo.zwBind(obj,10,20)
zwfoo1(30,40);

console.log("============ second ===========")
let obj1 = {
  name: "second"
}
let zwfoo2 = zwfoo1.zwBind(obj1);
zwfoo2();

/* 
foo执行： window
60
==== first ===
foo执行： { name:'hhh', fn:f }
60
==== second ===
foo执行：{ name:'hhh', fn:f }
NaN
*/