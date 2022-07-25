// 同步过程：
// import { name, age, foo } from './foo.js'
// console.log(name)
// console.log("解析为import前，后续的代码都是不会运行的~")


// import 函数! 返回的结果是一个Promise
import("./foo.js").then(res => {
  console.log("res:", res.name)
  // res显示是一个Module，其实是一个对象
})



// ES11新增的特性
// meta属性本身也是一个对象: { url: "当前模块所在的路径" }
console.log(import.meta)
