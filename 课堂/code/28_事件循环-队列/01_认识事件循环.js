
console.log("script start")

// 业务代码
setTimeout(function() {
// setTimeout 本身是同步的，里面的回调才是异步
}, 1000)

console.log("后续代码~")


console.log("script end")

// js线程，把异步操作，比如setTimeout的计时 ，
// 抛给浏览器其他线程去处理（DOM监听，定时器，XMLHttpRequest）
// 同时，处理过后的回调会被放入到事件队列中(微任务/宏)。
// 最后把队列中回调返还给js线程执行