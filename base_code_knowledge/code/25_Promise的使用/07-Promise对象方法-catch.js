// const promise = new Promise((resolve, reject) => {
//   resolve()
//   // reject("rejected status")
//   // throw new Error("rejected status")
// })

// 1.当executor抛出异常时, 也是会调用错误(拒绝)捕获的回调函数的
// promise.then(undefined, err => {
//   console.log("err:", err)
//   console.log("----------")
// })

// 2.通过catch方法来传入错误(拒绝)捕获的回调函数
// promise/a+规范
// promise.catch(err => {
//   console.log("err:", err)
// })
// promise.then(res => {
//   // return new Promise((resolve, reject) => {
//   //   reject("then rejected status")
//   // })
//   throw new Error("error message") --- 抛出异常，这里是在then里单独使用的
// }).catch(err => {
//   console.log("err:", err)
// })
// 总结： 这是es6的语法糖，第23行，也就是最后的catch
// 其实是 捕获两个地方的，优先捕获第18行promise里面的reject
// 如果promise是resolve，那么这个catch再当作，
// 对promise调用then后返回的promise的监听,比如这里的第20行




// 3.拒绝捕获的问题(前面课程)
// 这里其实是想说明，如果用promise.then()和promise.catch()
// 两者的调用对对方是没太多影响的，上面两种法子就可以解决
// 测试看 test3.js

// promise.then(res => {

// }, err => {
//   console.log("err:", err)
// })
// const promise = new Promise((resolve, reject) => {
//   reject("111111")
//   // resolve()
// })
// promise.then(res => {
//  
// }).then(res => {
//   throw new Error("then error message")
// }).catch(err => {
//   console.log("err:", err)
// })

//  如果是45行的reject，那么52行catch就是对应44行的promise的
//  如果是46行的resolve，那么catch先对应48调用then后返回的promise，
//  没reject，再对应50行then返回的promise

// promise.catch(err => {

// })

// 4.catch方法的返回值
const promise = new Promise((resolve, reject) => {
  reject("111111")
})

promise.then(res => {
  console.log("res:", res)
}).catch(err => {
  console.log("err:", err)
  return "catch return value"
  // catch里面return也会返回一个promise，理解上和then的差不多
}).then(res => {
  console.log("res result:", res)
}).catch(err => {
  console.log("err result:", err)
})

