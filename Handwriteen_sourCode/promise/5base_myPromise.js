const PROMISE_STATUS_PENDING = "pending";
const PROMISE_STATUS_FULFILLED = 'fulfilled';
const PROMISE_STATUS_REJECTED = 'rejected';

class ZWPromise {
  constructor(executorFn) {
    this.status = PROMISE_STATUS_PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.onFulFilledFns = [];
    this.onRejectedFns = [];

    const resolve = (value) => {
      if(this.status === PROMISE_STATUS_PENDING) {
        queueMicrotask(() => {
          if(this.status !== PROMISE_STATUS_PENDING) return;
          this.status = PROMISE_STATUS_FULFILLED;
          this.value = value;
          this.onFulFilledFns.forEach( fn => {
            fn(this.value);
          })
        })
      }
    }

    const reject = (reason) => {
      if(this.status === PROMISE_STATUS_PENDING) {
        queueMicrotask(() => {
          if(this.status !== PROMISE_STATUS_PENDING) return;
          this.status = PROMISE_STATUS_REJECTED;
          this.reason = reason;
          this.onRejectedFns.forEach( fn => {
            fn(reason);
          })
        })
      }
    }

    executorFn(resolve,reject);
  }
  then(onFulFilledFn,onRejectedFn) {
    if(this.status === PROMISE_STATUS_FULFILLED && onFulFilledFn) {
      onFulFilledFn(this.value);
    }
    if(this.status === PROMISE_STATUS_REJECTED && onRejectedFn) {
      onRejectedFn(this.reason);
    }
    if(this.status === PROMISE_STATUS_PENDING) {
      this.onFulFilledFns.push(onFulFilledFn);
      this.onRejectedFns.push(onRejectedFn);
    }
  }
}


// 测试：
const promise = new ZWPromise((resolve, reject) => {
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