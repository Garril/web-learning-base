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

    onFulFilledFn = onFulFilledFn || ((value) => { throw value;})
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
  }
  // 不管成功还是失败，都要调用 onFinally
  finally(onFinally) {
    this.then(() => {
      onFinally()
    }, () => {
      onFinally()
    })
  }
  static resolve(value) {
    return new ZWPromise((resolve, reject) => resolve(value))
  }

  static reject(reason) {
    return new ZWPromise((resolve, reject) => reject(reason))
  }

  static all(promisesArr) {
    return new ZWPromise((resolve,reject) => {
      const valuesArr = [];
      promisesArr.forEach(promise => {
        promise.then(res => {
          valuesArr.push(res);
          if(valuesArr.length === promisesArr.length) {
            resolve(valuesArr)
          }
        },err => {
          reject(err)
        })
      })
    })
  }
  
  static allSettled(promisesArr) {
    return new ZWPromise((resolve,reject) => {
      const resultArr = [];
      promisesArr.forEach(promise => {
        promise.then(res => {
          resultArr.push({ status: PROMISE_STATUS_FULFILLED, value: res })
          if(promisesArr.length === resultArr.length) {
            resolve(resultArr)
          }
        },err => {
          resultArr.push({ status: PROMISE_STATUS_REJECTED, value: err })
          if(promisesArr.length === resultArr.length) {
            resolve(resultArr)
            // 一定要把if判断放到两个回调中！
          }
        })
      })
    })
  }
  static race(promisesArr) {
    return new ZWPromise((resolve,reject) => {
      promisesArr.forEach(promise => {
        promise.then(resolve,reject);
      })
    })
  }
  static any(promisesArr) {
    const reasons = [];
    return new ZWPromise((resolve,reject) => {
      promisesArr.forEach(promise => {
        promise.then(resolve,reject);
      })
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

// 测试 ----- resolve,reject
ZWPromise.resolve("Hello World").then(res => {
  console.log("res:", res)
})

ZWPromise.reject("Error Message").catch(err => {
  console.log("err:", err)
})
/* 
res: Hello World
err: Error Message
*/
const p1 = new ZWPromise((resolve) => {
  setTimeout(() => { resolve(1111) }, 1000)
})
const p2 = new ZWPromise((resolve, reject) => {
  setTimeout(() => { reject(2222) }, 2000)
})
const p3 = new ZWPromise((resolve) => {
  setTimeout(() => { resolve(3333) }, 3000)
})
/* 
ZWPromise.allSettled([p1, p2, p3]).then(res => {
  console.log(res)
})
[
  { status: 'fulfilled', value: 1111 },
  { status: 'rejected', value: 2222 },
  { status: 'fulfilled', value: 3333 }
]
*/
ZWPromise.all([p1, p2, p3]).then(res => {
  console.log("res:",res);
},err => {
  console.log("err:",err);
})
/* err:2222 */