function debounce(fn, delay) {
  // 1.定义一个定时器, 保存上一次的定时器
  let timer = null

  // 2.真正执行的函数
  const _debounce = function(...args) { // 参数是触发后自动传过来的event，全放args类数组里
    // 取消上一次的定时器
    if (timer) clearTimeout(timer)
    // 延迟执行
    timer = setTimeout(() => {
      // 外部传入的真正要执行的函数
      fn.apply(this, args)
    }, delay)
  }

  return _debounce
}

/**
 * 相比01的改进思路：
 *  input.oninput 绑定的是return的_debounce，那么就会把this传到_debounce里面去
 *   _debounce函数内的this就是我们要的this
 *  只要把fn在_debounce函数内做一个this绑定就行
 *  函数参数，，，作为apply第二参数传入，作为fn的参数
 *  
 *  如果绑定this用call，第二个参数args要解构一下 ...args传入
 *  
 * call()方法接受的是若干个参数的列表，而apply()方法接受的是一个包含多个参数的数组。
 */