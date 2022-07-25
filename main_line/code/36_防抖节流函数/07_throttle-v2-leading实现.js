function throttle(fn, interval, options = { leading: true, trailing: false }) {
  // 1.记录上一次的开始时间
  const { leading, trailing } = options
  let lastTime = 0

  // 2.事件触发时, 真正执行的函数
  const _throttle = function() {

    // 2.1.获取当前事件触发时的时间
    const nowTime = new Date().getTime()
    // lastTime ==0且 leading为false的时候，取消整体的第一次的立即执行
    if (!lastTime && !leading) lastTime = nowTime

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
 * 新增的options：
 *  leading: true 表示第一次立即执行。trailing: false 表示最后一次没卡到时间点就不执行了
 * 这里只是 实现了 leading的功能
 */