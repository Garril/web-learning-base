async function foo() {
  console.log("foo function start~")

  console.log("中间代码~")

  console.log("foo function end~")

  // 1.返回一个值

  // 2.返回thenable --- 会自动执行then方法
  // return {
  //   then: function(resolve, reject) {
  //     resolve("hahahah")
  //   }
  // }
  // 上面的情况返回出去，封装成的promise，执行then的时机
  // 就是 调用resolve的时机

  // 3.返回Promise。同上，返回的promise的then执行时机，是这里调用resolve
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("hehehehe")
    }, 2000)
  })
}

// 异步函数的返回值一定是一个Promise，没有返回就默认undefined
const promise = foo()
promise.then(res => { // then 执行的时机就是 上面return的时候
  console.log("promise then function exec:", res)
})
