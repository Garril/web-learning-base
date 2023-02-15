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
    /* 
      改变：这里对 onRejectedFn 做了一层初始化
    */
    // onRejectedFn = onRejectedFn ? onRejectedFn :(err) => { throw err };
    onRejectedFn = onRejectedFn || ((err) => { throw err });

    return new ZWPromise((resolve,reject) => {
      if(this.status === PROMISE_STATUS_FULFILLED && onFulFilledFn) {
        execFnWithCatchError(onFulFilledFn,this.value,resolve,reject);
      }
      if(this.status === PROMISE_STATUS_REJECTED && onRejectedFn) {
        execFnWithCatchError(onRejectedFn,this.reason,resolve,reject);
      }
      if(this.status === PROMISE_STATUS_PENDING) {
        // 下面都加了个if，因为catch的实现其实用的还是then，只是第一个参数传的undefined
        if(onFulFilledFn) this.fulFilledFns.push(() => {
          execFnWithCatchError(onFulFilledFn,this.value,resolve,reject);
        });
        if(onRejectedFn) this.rejectedFns.push(() => {
          execFnWithCatchError(onRejectedFn,this.reason,resolve,reject);
        });
      }
    })
  }
  catch(onRejectedFn) {
    return this.then(undefined,onRejectedFn); 
    // 记得要return出去,这里return了一个promise
    // 处理了： .then().catch()情况
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


