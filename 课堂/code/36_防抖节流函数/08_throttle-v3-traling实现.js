function throttle(fn, interval, options = { leading: true, trailing: false }) {
  // 1.记录上一次的开始时间
  const { leading, trailing } = options
  let lastTime = 0
  let timer = null

  // 2.事件触发时, 真正执行的函数
  const _throttle = function() {

    // 2.1.获取当前事件触发时的时间
    const nowTime = new Date().getTime()
    if (!lastTime && !leading) lastTime = nowTime

    // 2.2.使用当前触发的时间和之前的时间间隔以及上一次开始的时间, 计算出还剩余多长事件需要去触发函数
    const remainTime = interval - (nowTime - lastTime)
    if (remainTime <= 0) {

      if (timer) {
        clearTimeout(timer)
        timer = null
      }

      // 2.3.真正触发函数
      fn()
      // 2.4.保留上次触发的时间
      lastTime = nowTime
      return
      /**
       *  return的作用：保证在触发的时候，不加定时器（而在触发的时间点上，
       * 之前设置的定时器也会触发，执行了两次fn，所以上面要清除timer）
      */ 
    }

    if (trailing && !timer) { // !timer 保证只有一个定时器
      timer = setTimeout(() => {
        timer = null // 使得下一次定时器可以开启
        lastTime = !leading ? 0: new Date().getTime()
        /**
         * 不能直接把lastTime设置为0，假设interval是10s，在1s的时候，设置了定时器9s后执行，
         * 到第10s的时候，上面计算remainTime=0，将要执行fn，可是，定时器也是这个时间点执行，
         * 说不好到底谁先执行（第二种情况---在10s的时刻刚好输入）：
         * 1、如果定时器先（第10s后过几ms，输入内容）
         *  其内部修改了lastTime为0，那么定时器内执行一次fn，
         * 上面判断remainTime肯定是远远小于0（nowTime-lastTime极大）又会执行一次fn。
         * 2、如果fn先执行，那会先把定时器取消掉，然后执行fn()一次，return，是期望的结果
         * 
         * 解决方法：
         * lastTime由leading来决定修改值（对照12行）：
         * !!!要知道运行顺序，先执行定时器内函数，然后执行_throttle函数整体!!!!
         * =======================================================================
         * leading为true --- 下一次隔了很久后再次输入，第一次立即执行
         *    定时器设置lastTime为nowTime，去执行_throttle函数的时候，第12行不改变lastTime
         *    nowTime获取了最新，lastTime保持这一次的值，时间间隔很短，使得nowTime-lastTime近乎为0
         *    remain>0，就不会让fn连续执行两次（第一次在定时器内执行）
         *    但是隔了一段时间nowTime-lastTime变大，remainTime<=0时，就出现了第一次立即执行的效果
         * =======================================================================
         * leading为false --- 第一次不立即执行
         *    定时器设置lastTime为0，执行_throttle函数的时候，第十二行，lastTime设置为了最新nowTime
         *    remainTime>0,不执行fn。隔一段时间，nowTime获取最小值，lastTime非空，不改变值
         *    进行正常的节流处理
         */
        fn()
      }, remainTime)
    }
  }

  return _throttle
}

/**
 * 实现了trailing的功能
 */