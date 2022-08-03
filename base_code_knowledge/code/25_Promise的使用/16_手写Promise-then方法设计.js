// ES6 ES2015
// https://promisesaplus.com/
const PROMISE_STATUS_PENDING = 'pending'
const PROMISE_STATUS_FULFILLED = 'fulfilled'
const PROMISE_STATUS_REJECTED = 'rejected'

class HYPromise {
  constructor(executor) {
    this.status = PROMISE_STATUS_PENDING
    this.value = undefined
    this.reason = undefined

    const resolve = (value) => {
      if (this.status === PROMISE_STATUS_PENDING) {
        this.status = PROMISE_STATUS_FULFILLED // 不要把状态的变化放到 queueMicrotask里面
        // 否则，resolve之后，reject也能执行 --- 还没变状态，就和函数一块被扔到微任务队列的后边去

        queueMicrotask(() => { // setTimeout(....,0);也可以实现，但是，是把函数加到宏任务里
          // 作用：把函数加入到微任务队列里，会延迟调用,但是是在本轮主线程的事件循环里执行
          this.value = value
          this.onFulfilled(this.value)
        });
      }
    }

    const reject = (reason) => {
      if (this.status === PROMISE_STATUS_PENDING) {
        this.status = PROMISE_STATUS_REJECTED
        queueMicrotask(() => {
          this.reason = reason
          this.onRejected(this.reason)
        })
      }
    }

    executor(resolve, reject)
  }

  then(onFulfilled, onRejected) {
    this.onFulfilled = onFulfilled
    this.onRejected = onRejected
  }
}

const promise = new HYPromise((resolve, reject) => {
  console.log("状态pending")
  // reject(2222)
  resolve(1111)
})

// 调用then方法
promise.then(res => {
  console.log("res1:", res)
  return 1111
}, err => {
  console.log("err:", err)
}).then(res => {
  console.log("res3:", res)
})

// promise.then(res => {
//   console.log("res2:", res)
// }, err => {
//   console.log("err2:", err)
// })

// 目前还要更进：
/*
1. 再次调用 promise.then() ，也要能够执行,而不是只执行最后一个（现在最后一个会覆盖前面的-web，node环境报错） --- 放数组
2. 传入的第二个参数，err=> {},可能不传
3. 在then/err里面return，没有链式调用 
*/