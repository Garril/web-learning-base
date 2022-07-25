// 使用另外一个模块导出的对象, 那么就要进行导入 require
// const { aaa, bbb } = require("./why.js")
const { name, age, sum } = require("./why.js")

// console.log(aaa)
// console.log(bbb)

console.log(name)
console.log(age)
console.log(sum(20, 30))

// webpack配置本身用common.js
// 搭建自己的项目Vue/React(common.js/es module ==》最后webpack都会转化)

// 和amd，cmd用于浏览器不同，commonjs提出来是想用在服务器上的