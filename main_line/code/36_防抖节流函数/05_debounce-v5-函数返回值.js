function debounce(fn, delay, immediate = false, resultCallback) {
  // 1.定义一个定时器, 保存上一次的定时器
  let timer = null
  let isInvoke = false

  // 2.真正执行的函数
  const _debounce = function(...args) {
    return new Promise((resolve, reject) => {
      // 取消上一次的定时器
      if (timer) clearTimeout(timer)

      // 判断是否需要立即执行
      if (immediate && !isInvoke) {
        const result = fn.apply(this, args)
        if (resultCallback) resultCallback(result)
        resolve(result)
        isInvoke = true
      } else {
        // 延迟执行
        timer = setTimeout(() => {
          // 外部传入的真正要执行的函数
          const result = fn.apply(this, args) // 这里可以考虑try，catch包裹，捕获fn内部的throw异常捕获
          if (resultCallback) resultCallback(result)
          resolve(result)
          isInvoke = false
          timer = null
        }, delay)
      }
    })
  }

  // 封装取消功能
  _debounce.cancel = function() {
    if (timer) clearTimeout(timer)
    timer = null
    isInvoke = false
  }

  return _debounce
}

/**
 * 被封装的函数fn有返回值，要怎么拿出来？因为是定时器，异步没办法直接return
 * 
 * 两个思路：
 * 1、加个参数 resultCallback，如果有传参数，把fn函数return的结果传入
 * 2、既然是延迟执行，异步，要结果，那就把整体用Promise包裹，把要return出去的结果resolve出去
 *    在使用时，传给 inputElement.oninput，需要再一层封装
 * eg: const debounceChange =  debounce(fn,3000,false,(res) => {console.log(res) }) 
 *     ---这里第四个参数，是思路1，在resultCallback函数可以拿到 数据，
 *     const tempCallback = () => { 
 *        debounceChange().then(res => {
 *          console.log(res)
 *        })
 *     }
 *    inputElement.oninput = tempCallback
 *    触发oninput后会去执行tempCallback函数，内部去执行debounceChange函数，
 *    我们可以在then内拿到结果
 */
