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
// 17的思路：
// 调用new Promise，传入回调函数
// 构造函数自动执行，里面创建了resolve和reject函数，把两函数传入回调，执行回调
// 回调中调用resolve/reject，传入value/reason
// 执行resolve/reject,resolve中先判断状态，
// 然后将改变状态和执行 对应数组的操作 通过queueMicrotask扔到微任务队列末尾
// 调用then的时候，判断promise状态，pending，就扔到数组中，到末尾的时候会遍历执行
// 如果非pending，那么就直接传入参数，执行onFulfilled/ onRejected

class HYPromise {
  constructor(executor) {
    this.status = PROMISE_STATUS_PENDING
    this.value = undefined
    this.reason = undefined
    this.onFulfilledFns = []
    this.onRejectedFns = []
    // 想着定义变量，去保存微任务队列末尾执行的函数的返回值，再传到 then返回的
    // new promise 里面调用的resolve，不好做
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
  // 改变一： then返回一个new Promise
  then(onFulfilled, onRejected) {
    // 利用构造器，把代码放到 new Promise的参数里面，会自动传入resolve和reject，并且执行
    return new HYPromise((resolve, reject) => {
      // 1.如果在then调用的时候, 状态已经确定下来
      if (this.status === PROMISE_STATUS_FULFILLED && onFulfilled) {
  // 改变二：要拿到这里调用回调函数后的返回值。再resolve出去
  // 注意：调用then后返回的promise，不管是resolve还是reject，都是
  // then(res=> {拿到res})，除非throw error，才能catch
  // 下面execFunctionWithCatchError是对try和catch做了封装
        // try { 严谨写法，try catch，抛出错误再reject
        //   const value = onFulfilled(this.value)
        //   resolve(value)
        // } catch(err) {
        //   reject(err)
        // }
        execFunctionWithCatchError(onFulfilled, this.value, resolve, reject)
      }
      if (this.status === PROMISE_STATUS_REJECTED && onRejected) {
        // try {
        //   const reason = onRejected(this.reason)
        //   resolve(reason) -- reject返回的值也是传给new promise的 resolve
        // } catch(err) {
        //   reject(err)
        // }
        execFunctionWithCatchError(onRejected, this.reason, resolve, reject)
      }

      // 2.将成功回调和失败的回调放到数组中
      if (this.status === PROMISE_STATUS_PENDING) {
  // 改变三：
        // 这里对比17，不是单单的把onFulfilled/onRejected给push进数组
        // 而是"整了个函数"，内部调用onFulfilled/onRejected，把this.value/reason传入
        // 拿到返回值，resolve出去，最外层包裹try catch，有错reject出去
        // 17里面直接把onFulfilled/onRejected函数传入数组，其实函数中也会带resolve/reject
        // 18算是 外面包裹了箭头函数，push进数组,函数如下，能够多拿个返回值resolve出去
        /*
        () => {
          try {
            const result = onFulfilled/onRejected(this.value)
            resolve(result)
          }catch(err) { 
            reject(err)
          }
        }
        */
        this.onFulfilledFns.push(() => {
          // try {
          //   const value = onFulfilled(this.value)
          //   resolve(value)
          // } catch(err) {
          //   reject(err)
          // }
          execFunctionWithCatchError(onFulfilled, this.value, resolve, reject)
        })
        this.onRejectedFns.push(() => {
          // try {
          //   const reason = onRejected(this.reason)
          //   resolve(reason)
          // } catch(err) {
          //   reject(err)
          // }
          execFunctionWithCatchError(onRejected, this.reason, resolve, reject)
        })
      }
    })
  }
}




const promise = new HYPromise((resolve, reject) => {
  console.log("状态pending")
  // resolve(1111) // resolved/fulfilled
  reject(2222)
  // throw new Error("executor error message")
})

// 调用then方法多次调用
promise.then(res => {
  console.log("res1:", res)
  return "aaaa"
  // throw new Error("err message")
}, err => {
  console.log("err1:", err)
  return "bbbbb"
  // throw new Error("err message")
}).then(res => {
  console.log("res2:", res)
}, err => {
  console.log("err2:", err)
})
