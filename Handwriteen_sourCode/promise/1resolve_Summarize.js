new Promise((resolve, reject) => {
  resolve(newPromise)
}).then(res => {
  console.log("res:", res," ",typeof(res));
}, err => {
  console.log("err:", err," ",typeof(err));
})
/* 
情况一：传入Promise
  一个promise的resolve/reject传入的是另外一个promise
  首先，你把newPromise，resolve出去（这个是promise的resolve），
  那么回去！！自动！！调用 newPromise的resolve/reject（这个看newPromise内部如何）
    1、如果这个newPromise实现了then和catch
      那么根据newPromise调用的是 resolve还是reject，去执行响应的回调
      然后：
      不管是 reject还是resolve,参数都传不到下面的promise
      他不会影响promise，promise状态不变，还是resolve（因为我们是 resolve(newPromise) ）
    2、如果这个newPromise 没有实现 then和catch
      那么他调用的 resolve/reject
      会直接决定 promise的状态，而不会管promise是resolve(newPromise)还是reject(newPromise)
*/


new Promise((resolve, reject) => {
  // pending -> fulfilled
  const obj = {
    then: function(resolve, reject) {
      reject("reject message")
    }
  }
  resolve(obj);
}).then(res => {
  console.log("res:", res)
}, err => {
  console.log("err:", err)
})
/* 
情况二：传入对象
  同样道理，resolve(obj)会自动去执行 obj内的then。
  obj1的then内部 会 调用 resolve/reject，这里直接决定了promise的状态
  比如这里，promise会去跑 err => {.... }
  和情况一不同的地方：
    如果 promise不是 resolve(obj)，而是 reject(obj)
    那么相当于抛错，直接把 obj对象抛了出去
    err: { then: [Function: then] }
*/
