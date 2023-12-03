const promise = new Promise((resolve, reject) => {
  resolve()
  // reject("rejected status")
  // throw new Error("rejected status")
})
promise.then(res => {
  return new Promise((resolve, reject) => {
    reject("then rejected status")
  })
  throw new Error("error message")
}).catch(err => {
  console.log("err:", err)
})
/* 
err: then rejected status

.catch 是 es6的语法糖
只捕获一个地方:
  1、优先捕获第8行promise里面的reject：
    你return一个promise，且没有实现then/catch。
    那么内部决定后面的promise的状态。
    因为内部是reject，所以后面执行catch
  2、如果promise是resolve */
const promise1 = new Promise((resolve, reject) => {
  resolve()
})
promise1.then(res => {
  return new Promise((resolve, reject) => {
    resolve("then rejected status")
  })
  throw new Error("error message") // 这里不会执行，因为前面return了
}).catch(err => {
  console.log("err:", err)
})
/* promise1   什么都没输出 
promise1.then后return的是一个promise，这里记做promise3

const promise2 = new Promise((resolve,reject) => {
  resolve("then rejected status");
})

promise3 = new Promise((resolve,reject) => {
  resolve(promise2);
})
且因为promise2，没有then/catch，调用的是resolve，所以
promise3后面也是执行的then。所以不会去调用catch

p.s.:如果把return注释，而去throw new Error。那么：
catch会拿到throw的错误
*/