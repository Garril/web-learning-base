function* foo() {
  console.log("代码开始执行~")

  const value1 = 100
  try {
    yield value1
  } catch (error) {
    console.log("捕获到异常情况:", error)

    yield "abc"

    console.log("aaaa")
  }

  console.log("第二段代码继续执行")
  const value2 = 200
  yield value2

  console.log("代码执行结束~")
}

const generator = foo()

const result = generator.next()
console.log(result); // { value: 100, done: false }
// 相当于，卡在第6行，执行generator.throw的时候，从6行之后开始，被catch到错误，输出
generator.throw("error message") // 捕获到异常情况: error message，然后在第10行卡住
console.log("--------------------")
console.log(generator.next()); 
/* 
aaaa
第二段代码继续执行 
{ value: 200, done: false }
*/

console.log(generator.next()); 
/*
代码执行结束~ 
{ value: undefined, done: true }
*/

