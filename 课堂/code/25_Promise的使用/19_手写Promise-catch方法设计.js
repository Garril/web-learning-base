// ES6 ES2015
// https://promisesaplus.com/
const PROMISE_STATUS_PENDING = 'pending'
const PROMISE_STATUS_FULFILLED = 'fulfilled'
const PROMISE_STATUS_REJECTED = 'rejected'

// 工具函数
function execFunctionWithCatchError(execFn, value, resolve, reject) {
  try {
    const result = execFn(value)
    resolve(result)
  } catch(err) {
    reject(err)
  }
}

class HYPromise {
  constructor(executor) {
    this.status = PROMISE_STATUS_PENDING
    this.value = undefined
    this.reason = undefined
    this.onFulfilledFns = []
    this.onRejectedFns = []

    const resolve = (value) => {
      if (this.status === PROMISE_STATUS_PENDING) {
        // 添加微任务
        queueMicrotask(() => {
          if (this.status !== PROMISE_STATUS_PENDING) return
          this.status = PROMISE_STATUS_FULFILLED
          this.value = value
          this.onFulfilledFns.forEach(fn => {
            fn(this.value)
          })
        });
      }
    }

    const reject = (reason) => {
      if (this.status === PROMISE_STATUS_PENDING) {
        // 添加微任务
        queueMicrotask(() => {
          if (this.status !== PROMISE_STATUS_PENDING) return
          this.status = PROMISE_STATUS_REJECTED
          this.reason = reason
          this.onRejectedFns.forEach(fn => {
            fn(this.reason)
          })
        })
      }
    }

    try {
      executor(resolve, reject)
    } catch (err) {
      reject(err)
    }
  }

  then(onFulfilled, onRejected) {
    // 改变的地方：！！！！！！！！！
    // 处理下面catch方法的调用：因为这里想要实现
    /*
      promise.then(...).catch()，
      但是第一个then内没有传入onRejected函数
      onRejected是undefined，那么在下面的判断里面，是什么都不会做的
      promise1 -> onRejected是undefined，这里的实现：
      是要去调用 then 返回的 promise2 的 catch 中传来的 onRejected
      那么已知，promise不管是resolve还是reject
      都是把结果执行后，resolve（res），把res传入到
      promise2 的 then ---- 具体看  execFunctionWithCatchError 就知道了
      除非throw error，这就是下面 defaultOnRejected 的由来
      ==》 把未传的 onRejected 定义为 throw err的函数，push到数组
      如果promise1 reject，那就调用，promise1把err值catch到
    */
    const defaultOnRejected = err => { throw err }
    onRejected = onRejected || defaultOnRejected

    return new HYPromise((resolve, reject) => {
      // 1.如果在then调用的时候, 状态已经确定下来
      if (this.status === PROMISE_STATUS_FULFILLED && onFulfilled) {
        execFunctionWithCatchError(onFulfilled, this.value, resolve, reject)
      }
      if (this.status === PROMISE_STATUS_REJECTED && onRejected) {
        execFunctionWithCatchError(onRejected, this.reason, resolve, reject)
      }

      // 2.将成功回调和失败的回调放到数组中
      if (this.status === PROMISE_STATUS_PENDING) {
        if (onFulfilled) this.onFulfilledFns.push(() => {
          execFunctionWithCatchError(onFulfilled, this.value, resolve, reject)
        })
        if (onRejected) this.onRejectedFns.push(() => {
          execFunctionWithCatchError(onRejected, this.reason, resolve, reject)
        })
      }
    })
  }
// catch-改进：
  catch(onRejected) {
    this.then(undefined, onRejected)
    // 注意，是this.then，下面其实是promise2 调用自身的then
    // 传入 undefined, onRejected
  }
}

const promise = new HYPromise((resolve, reject) => {
  console.log("状态pending")
  // resolve(1111) // resolved/fulfilled
  reject(2222)
})

// 调用then方法多次调用
promise.then(res => {
  console.log("res:", res)
},err => {
  console.log("err1:", err)
}).catch(err => {
  console.log("err2:", err)
})


promise.then(res => {
  console.log("res:", res)
}).catch(err => {
  console.log("=========")
  console.log("err2:", err)
})
/* 
状态pending
err1: 2222
=========
err2: 2222
*/
