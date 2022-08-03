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
    const defaultOnRejected = err => { throw err }
    onRejected = onRejected || defaultOnRejected

    // 这里就是处理
    const defaultOnFulfilled = value => { return value }
    onFulfilled = onFulfilled || defaultOnFulfilled

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

  // 下面两个都是ES6的，非promise a+规范里的
  catch(onRejected) {
    //then会放回promise，把promise，return出去
    return this.then(undefined, onRejected)
  }

  finally(onFinally) {
    // 不管成功还是失败，都要调用 onFinally
    this.then(() => {
      onFinally()
    }, () => {
      onFinally()
    })
  }
}

const promise = new HYPromise((resolve, reject) => {
  console.log("状态pending")
  resolve(1111) // resolved/fulfilled
  // reject(2222)
})

// 调用then方法多次调用
promise.then(res => {
  console.log("res1:", res)
  return "aaaaa"
}).then(res => {
  console.log("res2:", res)
}).catch(err => {
  console.log("err:", err)
}).finally(() => {
  console.log("finally")
}) 
/*
  遇到的第一个问题：
  promise.then(res=>{
    console.log("res1:",res)
    return "aaa";
  }).catch(err=>{
    console.log("err:",err);
  }).finally(()=>{
    console.log("finally");
  })

  这样的调用， 比如 第一个promise1，then传入 
  res=>{
    console.log("res1:",res)
    return "aaa";
  }
  还有 onRejected是自动初始化 throw err
  但是promise1.resolve(111)，在这里return aaa了，传给promise2构造函数
  要调用promise2的onFulfilled，可惜catch，onFulfilled是undefined，
  没有对接收到的值做任何的处理，这个数据在这里就断层了，就算调用catch返回了promise
  这个promise也没有拿到return的aaa，finally也拿不到了
  解决法子： 和 onRejected一样，如果undefined，给onFulfilled一个值
*/


