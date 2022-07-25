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
    this.onFulfilledFns = []
    this.onRejectedFns = []

    const resolve = (value) => {
      if (this.status === PROMISE_STATUS_PENDING) {
        // 添加微任务
        queueMicrotask(() => {
          // 这里的if存在的理由：
          // 如果没有if，那么，resolve和reject都会执行
          // 因为resolve和reject的调用的时候，都会使得这里的queueMicrotask的回调在微任务在最后被调用
          // 但是状态的改变是在微任务的队列里面，对状态的判断是在微任务外边
          // 微任务里面就算状态去改变了，但是后面的语句照应会执行
          if (this.status !== PROMISE_STATUS_PENDING) return
          // 这里把状态的转换返回到queueMicrotask里面，不然，先改变状态了,在then那里，就会直接执行函数
          // 也就是说，把状态改变和执行内容，全部通过queueMicrotask放到微任务队列的最后执行，
          // 这样，就可以在 "then中" (因为状态是pedding)把回调函数onFulfilled或者onRejected存到数组里面，
          // 再来这个 queueMicrotask里面的这个函数通过forEach数组执行
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
    executor(resolve, reject)
  }

  // 如果then只是单单的
  // 把then传入的参数--函数，选择性push到 onFulfilledFns 和 onRejectedFns 这两个数组
  // 那可以解决 promise.then的覆盖问题（就是多次调用只看最后一个）
  // 但是，如果有一个setTimeout，1s后调用promise.then，原生promise情况，应该也是可以的
  // 而这里不行，因为数组遍历的时候，他还没有加入到数组里
  // 而等他调用then，把onFulfilled, onRejected函数传进来的时候，
  then(onFulfilled, onRejected) {
    // 1.如果在then调用的时候, 状态已经确定下来
    if (this.status === PROMISE_STATUS_FULFILLED && onFulfilled) {
      onFulfilled(this.value)
    }
    if (this.status === PROMISE_STATUS_REJECTED && onRejected) {
      onRejected(this.reason)
    }

    // 2.将成功回调和失败的回调放到数组中
    if (this.status === PROMISE_STATUS_PENDING) {
      this.onFulfilledFns.push(onFulfilled)
      this.onRejectedFns.push(onRejected)
    }
  }
}

const promise = new HYPromise((resolve, reject) => {
  console.log("状态pending")
  resolve(1111) // resolved/fulfilled
  reject(2222) // 无效的 --- 处理看resolve/reject的queueMicrotask中的return
})

//  调用then方法多次调用
promise.then(res => {
  console.log("res1:", res)
}, err => {
  console.log("err:", err)
})

promise.then(res => {
  console.log("res2:", res)
}, err => {
  console.log("err2:", err)
})

// const promise = new Promise((resolve, reject) => {
//   resolve("aaaaa")
// })

// 在确定Promise状态之后, 再次调用then
setTimeout(() => {
  promise.then(res => {
    console.log("res3:", res)
  }, err => {
    console.log("err3:", err)
  })
}, 1000)

// 解决了then能多次，分别的调用，以及能监听定时器内对then的调用

// 待优化： then调用后要返回一个promise