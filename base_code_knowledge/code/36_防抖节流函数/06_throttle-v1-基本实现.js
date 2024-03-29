function throttle(fn, interval, options) {
  // 1.记录上一次的开始时间
  let lastTime = 0

  // 2.事件触发时, 真正执行的函数
  const _throttle = function() {

    // 2.1.获取当前事件触发时的时间
    const nowTime = new Date().getTime()

    // 2.2.使用当前触发的时间和之前的时间间隔以及上一次开始的时间, 计算出还剩余多长事件需要去触发函数
    const remainTime = interval - (nowTime - lastTime)
    if (remainTime <= 0) {
      // 2.3.真正触发函数
      fn()
      // 2.4.保留上次触发的时间
      lastTime = nowTime
    }
  }

  return _throttle
}

/**
 * 当前功能：
 *   ！整体的第一次！（不像之前说的每一次停顿后）会立即执行，最后一次如果没踩到时间点上，不会执行
 * （这里，第一次一定执行的原因： nowTime很大，使得 remainTime基本都是负数）
 */