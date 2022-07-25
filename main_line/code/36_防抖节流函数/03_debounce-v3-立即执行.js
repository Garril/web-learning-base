function debounce(fn, delay, immediate = false) {
  // 1.定义一个定时器, 保存上一次的定时器
  let timer = null

  let isInvoke = false

  // 2.真正执行的函数
  const _debounce = function(...args) {
    // 取消上一次的定时器
    if (timer) clearTimeout(timer)

    // 判断是否需要立即执行
    if (immediate && !isInvoke) {
      fn.apply(this, args)

      isInvoke = true

    } else {
      // 延迟执行
      timer = setTimeout(() => {
        // 外部传入的真正要执行的函数
        fn.apply(this, args)

        isInvoke = false

      }, delay)
    }
  }

  return _debounce
}
/**
 * 改进的效果： 
 *    能够让使用函数者，决定，是否输入的第一次一定是立即执行，
 *    能够先看到一点搜索效果，而不会被后续的输入给冲掉
 *    这里的“第一次，立即执行” 不是指的整体的第一次。
 *    比如：
 *        我输入了abcd，然后停止，a的时候就发送了一次请求，d的时候又发了一次
 *        然后我再接着输入efghi，停止，e的时候发送一次请求，i的时候又发了一次
 * 解决方法：
 *    外层加了一个变量 isInvoke，也保证了不修改外部传来的 immediate
 */

