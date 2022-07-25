function hyCompose(...fns) {
  // 判断传入的都是函数
  var length = fns.length
  for (var i = 0; i < length; i++) {
    if (typeof fns[i] !== 'function') {
      throw new TypeError("Expected arguments are functions")
    }
  }
  // 开始compose
  function compose(...args) {
    var index = 0
    var result = length ? fns[index].apply(this, args): args // 保存前一次的结果
    // 这里的思路就决定了之后，执行的函数，只会有一个参数，就是result，只有第一个执行有机会传数组
    while(++index < length) {
      result = fns[index].call(this, result)// 传入下一次函数求值
    }
    return result
  }
  return compose
}

function double(m,n) {
  return m * n
}

function square(n) {
  return n ** 2
}
function chu(n) {
  return n/2;
}
function add(n) {
  return n+10;
}

var newFn = hyCompose(double, square, chu)
console.log(newFn(10,2)) // (10*2)^2 / 2
