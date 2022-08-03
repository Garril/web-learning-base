interface ILength {
  length: number
}
/* 
  对传进来的 函数参数 做一些限制

  在函数参数上用 泛型
  function getLength<T>(arg: T) {
    return arg.length
    但是你不知道arg是不是有length属性，所以，会报错
  }
  解决方法：
  一般把 T 去extends 另外一个定义的接口，比如上面的length
  那么传进来的值，他一定要实现 接口定义的 属性/方法，否则传不进来，报错
*/

function getLength<T extends ILength>(arg: T) {
  return arg.length
}

getLength("abc")
getLength(["abc", "cb a"])
getLength({length: 100})


export {}