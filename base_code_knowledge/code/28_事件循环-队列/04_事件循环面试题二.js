// async function bar() {
//   console.log("222222")
//   return new Promise((resolve) => {
//     resolve()
//   })
// }
// async function foo() {
//   console.log("111111")
//   await bar()  // 等待bar return的promise调用resolve，再执行
//   console.log("333333") // 在这相当于在上面promise的then中
// }
// foo()
// console.log("444444")

/*
111111
222222
444444
333333
*/
// 上面的代码 
// 理解：
// console.log("111111")和 await bar() 相当于在同个代码块内
// await 后面的代码块相当于在then中执行



async function async1 () {
  console.log('async1 start')
  await async2();
  console.log('async1 end')
}

async function async2 () {
  console.log('async2')
}

console.log('script start')

setTimeout(function () {
  console.log('setTimeout')
}, 0)

async1();

new Promise (function (resolve) {
  console.log('promise1')
  resolve();
}).then (function () {
  console.log('promise2')
})

console.log('script end')

// script start
// async1 start
// async2
// promise1
// script end
// async1 end
// promise2
// setTimeout
