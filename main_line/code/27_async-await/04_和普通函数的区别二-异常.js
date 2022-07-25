async function foo() {
  console.log("foo function start~")

  console.log("中间代码~")

  // 异步函数中的异常, 会被作为异步函数返回的Promise的reject值的
  throw new Error("error message")

  console.log("foo function end~") // 不执行
}

// 异步函数的返回值一定是一个Promise
foo().catch(err => {
  console.log("coderwhy err:", err)
})
// 注意，是异步函数！！！

console.log("后续还有代码~~~~~")

/*
foo function start~
中间代码~
后续还有代码~~~~~
coderwhy err: Error: error message
  报错信息**************************略
*/