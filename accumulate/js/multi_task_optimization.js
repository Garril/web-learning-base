/* 
  运行一个耗时任务
  如果要异步执行任务，返回Promise
  要尽快完成任务，同时不要让页面阻塞、卡顿
  （页面有个小球在跑，停住或者掉帧闪动位置，都不行）

  假设会调用1000次runTask，把每次要执行的函数传入
*/
// 写个辅助函数判断是否当前可以运行，不阻塞渲染
function canRunTask(task, callback) {
  // 需要考虑兼容性 -- requestIdleCallbackL: 将在浏览器空闲时期被调用
  requestIdleCallback((idle) => {
    if (idle.timeRemaining() > 0) {
      task();
      callback();
    } else {
      canRunTask(task, callback);
    }
  })
}

function _canRunTask(task, callback) {
  let startTime = Date.now();
  // requestAnimationFrame 兼容性就好很多
  requestAnimationFrame(() => {
    if (Date.now() - startTime < 16.6) {
      task();
      callback();
    } else {
      canRunTask(task, callback);
    }
  })
}

function runTask(task) {
  return new Promise((resolve) => {
    canRunTask(task, resolve);
  })
}
/* 
1、直接运行 task() 阻塞，卡顿

2、微任务 阻塞，卡顿
  return new Promise(resolve =>  {
    Promise.resolve().then(() => {
      task();
      resolve();
    })
  })
因为事件循环中，微任务队列一定要全部清空，才会执行后面的事情，包括渲染
渲染帧为16.6ms一次，1000个调用产生的微任务，把渲染的帧往后推迟了，就会卡。

requestAnimationFrame也差不多效果，他是在渲染帧要调用之前，插入执行了1000task，推后渲染

3、setTimeout 无阻塞，有卡顿（有动，但是不流畅）
  return new Promise(resolve =>  {
    setTimeout(() => {
      task();
      resolve();
    },0);
  })
  为什么不流畅？事件循环-死循环：
    取宏任务，执行宏任务，
    判断是否现在渲染（不同浏览器不同处理方式）
    chorme、edge看到宏任务太多，会交出一部分渲染时间，资源给宏任务那边
    （在渲染任务重的情况下，把渲染时间交出一部分有助于尽快计算出结果，然后渲染）
    safari，不会阻塞渲染，不会交出渲染时间。在复杂页面可能就会延后任务完成的时间。
  各有取舍。。。。
*/