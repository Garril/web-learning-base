// 宏任务
//    定时器 -- ajax -- dom -- UI rendering
// 微任务
//    queueMicrotask Promise.then  MutataionObserver API
// 执行宏任务之前，保证微任务被清空了
// main script主线程优先级最高
setTimeout(() => {
  console.log("setTimeout")
}, 1000)

queueMicrotask(() => {
  console.log("queueMicrotask")
})

Promise.resolve().then(() => {
  console.log("Promise then")
})

function foo() {
  console.log("foo")
}

function bar() {
  console.log("bar")
  foo()
}

bar()

console.log("其他代码")
