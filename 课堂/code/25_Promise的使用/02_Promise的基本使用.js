function foo() {
  // Promise
  // 传入一个函数，这个函数会被立即执行，类似其他类的构造函数
  // 且函数的两个参数分别为： resolve和reject函数
  return new Promise((resolve, reject) => {
    resolve("success message")
    // reject("failture message")
  })
}

// main.js
const fooPromise = foo()
// then方法传入的回调函数两个回调函数:
// > 第一个回调函数, 会在Promise执行resolve函数时, 被回调
// > 第二个回调函数, 会在Promise执行reject函数时, 被回调
fooPromise.then((res) => {
  console.log(res)
}, (err) => {
  console.log(err)
})

// // catch方法传入的回调函数, 会在Promise执行reject函数时, 被回调
fooPromise.catch(() => {

})


// 传入的这个函数, 被称之为 executor
// > resolve: 回调函数, 在成功时, 回调resolve函数
// >reject: 回调函数, 在失败时, 回调reject函数
// const promise = new Promise((resolve, reject) => {
//   // console.log("promise传入的函数被执行了")
//   // resolve()
//   reject()
// })

// promise.then(() => {

// })

// promise.catch(() => {

// })


// 钩子函数: hook
function foo(fn) {
  fn()
}

foo(() => {

})

// Promise 就简单多了，知道返回Promise，直接去调then/catch
// 成功时候调用resolve，执行then，失败调用 reject，执行catch