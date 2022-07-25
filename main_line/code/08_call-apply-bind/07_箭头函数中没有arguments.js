// 1.案例一:
var foo1 = () => {
  console.log(arguments)
}

foo1()

// 2.案例二:
function foo2() {
  // 这里可以看出来，bar的arguments是用的foo的，是往上层找的
  var bar = () => {
    console.log(arguments)
  }
  return bar
}

var fn = foo2(123)
fn()
// [Arguments] { '0': 123 }

// 3.案例三:
// var foo = (num1, num2, ...args) => {
//   console.log(args)
// }

// foo(10, 20, 30, 40, 50)

// [ 30, 40, 50 ]
