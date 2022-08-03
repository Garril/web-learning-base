// 1.函数作为参数时, 在参数中如何编写类型
function foo() {}

type FooFnType = () => void
function bar(fn: FooFnType) {
  fn()
}

bar(foo)

// 2.定义常量时, 编写函数的类型
type AddFnType = (num1: number, num2: number) => number
// 可能在其他语言num1和num2可以省略，但是ts，不能省略，
// num1和num2，不会限制 add函数内，对参数的命名，如下：可以为a1和a2
const _1add: AddFnType = (a1: number, a2: number) => {
  return a1 + a2
}

export {}
