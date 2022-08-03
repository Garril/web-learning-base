// Promise有哪些对象方法
// console.log(Object.getOwnPropertyDescriptors(Promise.prototype))

const promise = new Promise((resolve, reject) => {
  resolve("hahaha")
})

// 1.同一个Promise “可以” 被多次调用then方法
// 当我们的resolve方法被回调时, 所有的then方法传入的回调函数都会被调用
// promise.then(res => {
//   console.log("res1:", res)
// })

// promise.then(res => {
//   console.log("res2:", res)
// })

// promise.then(res => {
//   console.log("res3:", res)
// })

// 2.then方法传入的 "回调函数: 可以有返回值
// then方法本身也是有返回值的, 它的返回值是Promise

// 1> 如果我们返回的是一个普通值(数值/字符串/普通对象/undefined), 
//  那么这个普通的值被作为一个新的Promise的resolve值
// promise.then(res => {
//   return "aaaaaa"
// }).then(res => {
//   console.log("res:", res)
//   return "bbbbbb"
// })

// 2> 如果我们返回的是一个Promise
// promise.then(res => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(111111)
//     }, 3000)
//   })
// }).then(res => {
//   console.log("res:", res)
// })
//  这里return 了一个 new Promise，姑且叫他newPromise，但是和之前理解一样，这个newPromise，
//  是return出去的，他的外面包裹了一个promise，
//  也就是整体 返回一个new promise( (resolve,reject)=> { resolve(newPromise); })
//  因为是传入了一个 promise(newPromise没有then/catch)，所以，这个 promise的状态由newPromise决定。
//  另一种情况，看看 test2.js

// 3> 如果返回的是一个对象, 并且该对象实现了thenable
promise.then(res => {
  return {
    then: function(resolve, reject) {
      resolve(222222)
    }
  }
}).then(res => {
  console.log("res:", res) // 2222222
},err => {
  console.log(err);
})
// return相当于 new promise(（resolve,reject）=> { resolve(obj)})，obj实现了thenable
// 自动调用then方法，obj的then里面决定promise的状态, resolve(22222)，所以58行是调用then
