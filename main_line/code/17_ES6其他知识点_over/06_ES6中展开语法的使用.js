const names = ["abc", "cba", "nba"]
const name = "why"
const info = {name: "why", age: 18}

// 1.函数调用时
function foo(x, y, z) {
  console.log(x, y, z)
}

// foo.apply(null, names)
foo(...names)
foo(...name)
/* 
abc cba nba
w h y
*/
// foo(...info)
// 没办法 ...object,报错

// 2.构造数组时
const newNames = [...names, ...name]
console.log(newNames)
// [ 'abc', 'cba', 'nba', 'w', 'h', 'y' ]

// 3.构建对象字面量时ES2018(ES9)
const obj = { ...info, address: "广州市", ...names}
console.log(obj)
// *** 字符串数组names的属性值为index索引
// {
//   '0': 'abc',
//   '1': 'cba',
//   '2': 'nba',
//   name: 'why',
//   age: 18,
//   address: '广州市'
// }

