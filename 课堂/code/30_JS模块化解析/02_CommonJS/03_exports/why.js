const name = "why"
const age = 18
function sum(num1, num2) {
  return num1 + num2
}

// 源码
// module.exports = {}
// exports = module.exports

// 第一种 module.exports = { name,age,sum }
// 第二种导出方式
// exports.name = name
// exports.age = age
// exports.sum = sum

// 注意有一种是ESModule规则： export const xxx = xx; 导出的xxx

// 这种代码不会进行导出
// exports = {
//   name,
//   age,
//   sum
// }


module.exports = {

}

// 最终能导出的一定是module.exports

