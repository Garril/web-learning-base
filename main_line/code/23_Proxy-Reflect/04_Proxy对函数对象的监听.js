function foo() {

}

const fooProxy = new Proxy(foo, {
  // thisArg是函数调用apply绑定的this，argArray是参数数组
  apply: function(target, thisArg, argArray) {
    console.log("对foo函数进行了apply调用",target, thisArg, argArray);
    return target.apply(thisArg, argArray)
  },
  construct: function(target, argArray, newTarget) {
    console.log("对foo函数进行了new调用",target, argArray, newTarget);
    return new target(...argArray)
  }
})

fooProxy.apply({}, ["abc", "cba"]) // apply第二个参数要是一个参数数组，与call不同
new fooProxy("abc", "cba")

/* 
对foo函数进行了apply调用 [Function: foo] {} [ 'abc', 'cba' ]
对foo函数进行了new调用 [Function: foo] [ 'abc', 'cba' ] [Function: foo]
*/