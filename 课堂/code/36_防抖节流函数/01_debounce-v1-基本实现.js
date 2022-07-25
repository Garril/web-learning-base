function debounce(fn, delay) {
  // 1.定义一个定时器, 保存上一次的定时器
  let timer = null

  // 2.真正执行的函数
  const _debounce = function() {
    // 取消上一次的定时器
    if (timer) clearTimeout(timer)
    // 延迟执行
    timer = setTimeout(() => {
      // 外部传入的真正要执行的函数
      fn()
    }, delay)
  }

  return _debounce
}

/**不足的地方：
 * 如果我们在被进行防抖操作的函数内部，console.log("xxx",this,event)
 * 也就是：fn为   function(event) { console.log("xxx",this,event) }
 * 这里的this和event的输出，会有问题
 * 正确的应该是： this: 指的是触发这个函数的对象（比如搜索框，就是input标签触发的<input type="text" />  ）
 *               event: 是InputEvent对象
 * 可是我们这个防抖，结果为：
 *  this: Window对象 --- 因为这里的函数fn，是独立函数调用，指向window
 *  event: undefined --- 没给fn传参数，为undefined
*/ 

