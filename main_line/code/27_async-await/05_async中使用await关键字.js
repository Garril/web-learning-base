// 1.await更上表达式
function requestData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // resolve(222)
      reject(1111)
    }, 2000);
  })
}

// async function foo() {
//   const res1 = await requestData()
//  可以把 下面的三个console.log当作是，返回的promise的then中的执行内容
//   console.log("后面的代码1", res1)
//   console.log("后面的代码2")
//   console.log("后面的代码3")


//   const res2 = await requestData()
//   console.log("res2后面的代码", res2)
// }

// 2.跟上其他的值
// async function foo() {
//   // const res1 = await 123
//   // const res1 = await {
//   //   then: function(resolve, reject) {
//   //     resolve("abc")
//   //   }
//   // }
//   const res1 = await new Promise((resolve) => {
//     resolve("why")
//   })
//   console.log("res1:", res1)
// }

// 3.reject值
async function foo() {
  const res1 = await requestData() 
  // await 等待 后续表达式返回的promise 调用 resolve
  // requestData() 返回的promise调用的reject，那相当于
  // foo 这个异步函数的返回的promise，reject
  console.log("res1:", res1)
}

foo().catch(err => {
  console.log("err:", err) // err: 1111
})
