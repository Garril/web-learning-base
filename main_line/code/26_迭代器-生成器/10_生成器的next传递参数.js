// 相较09，10表达了foo可以传参数
// yield value*2 也可以
function* foo(num) {
  console.log("函数开始执行~")

  const value1 = 100 * num
  console.log("第一段代码:", value1)
  const n = yield value1

  const value2 = 200 * n
  console.log("第二段代码:", value2)
  const count = yield value2

  const value3 = 300 * count
  console.log("第三段代码:", value3)
  yield value3

  console.log("函数执行结束~")
  return "123"
}

// 生成器上的next方法可以传递参数
const generator = foo(5)
console.log(generator.next()) // { value: 500, done: false } ----第一次num为5
// // 第二段代码, 第二次调用next的时候执行的
console.log(generator.next(10))// { value: 2000, done: false } ----把10传入next，作为yield中的n传给第10行
// 没传给next参数 ----{ value: NaN, done: false }
console.log(generator.next(25))// { value: 7500, done: false } ----同上


