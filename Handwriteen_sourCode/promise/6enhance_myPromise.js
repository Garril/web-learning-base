/* 在base_myPromise的基础上，完成了
  then的调用return一个新的promise
*/
const PROMISE_STATUS_PENDING = 'pending';
const PROMISE_STATUS_FULFILLED = 'fulfilled';
const PROMISE_STATUS_REJECTED = 'rejected';

class ZWPromise {
  constructor(executorFn) {
    this.status = PROMISE_STATUS_PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.fulFilledFns = [];
    this.rejectedFns = [];

    const resolve = (value) => {
      if(this.status === PROMISE_STATUS_PENDING) {
        queueMicrotask(() => {
          if(this.status !== PROMISE_STATUS_PENDING) return;
          this.status = PROMISE_STATUS_FULFILLED;
          this.value = value;
          this.fulFilledFns.forEach( fn => {
            fn(this.value)
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
          this.rejectedFns.forEach( fn => {
            fn(this.reason)
          })
        })
      }
    }

    try {
      executorFn(resolve,reject);
    } catch(err) {
      reject(err);
    }
  }

  then(onFulFilledFn,onRejectedFn) {
    return new ZWPromise((resolve,reject) => {
      if(this.status === PROMISE_STATUS_FULFILLED && onFulFilledFn) {
        execFnWithCatchError(onFulFilledFn,this.value,resolve,reject);
      }
      if(this.status === PROMISE_STATUS_REJECTED && onRejectedFn) {
        execFnWithCatchError(onRejectedFn,this.reason,resolve,reject);
      }
      if(this.status === PROMISE_STATUS_PENDING) {
        this.fulFilledFns.push(() => {
          execFnWithCatchError(onFulFilledFn,this.value,resolve,reject);
        });
        this.rejectedFns.push(() => {
          execFnWithCatchError(onRejectedFn,this.reason,resolve,reject);
        });
      }
    })
  }
}
function execFnWithCatchError(fn,value,resolve,reject) {
  try {
    const res = fn(value);
    resolve(res);
  } catch(err) {
    reject(err);
  }
}

// 测试
const promise = new ZWPromise((resolve, reject) => {
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
/* 
状态pending
err1: 2222
res2: bbbbb
*/


