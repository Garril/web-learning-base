// function foo() {

// }

// console.log(foo.prototype)
// const f = new foo()
// f.__proto__ = foo.prototype

var bar = () => {
  console.log(this, arguments)
}

console.log(bar.prototype) // undefined

const b = new bar(); // bar is not a constructor

