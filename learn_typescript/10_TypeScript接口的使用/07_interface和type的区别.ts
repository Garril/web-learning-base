/* 联合类型、函数类型（等非对象类型）都建议type定义
  对象可以考虑interface或者type（推荐interface，除非联合类型）

  总结： interface支持同名，会合并同名
  type不支持同名
*/
// ===============================
interface IFoo {
  name: string
}

interface IFoo {
  age: number
}

// 两个同名称的接口，属性会合并
// ===============================

// const foo: IFoo = {
//   name: "why",
//   age: 18
// }


// ===============================

// document.getElementById("app") as HTMLDivElement
// window.addEventListener
// 这里只是说明typescript执行上下文，已经有了很多内置的类型

// ===============================

// 但是window是Window类型，他没有age的这个属性的
// 想要加上去，怎么办？我们不可能去 type Window里面修改（type不能同名）
// 这时interface的不覆盖且支持同名，就有用了
// interface Window {
//   age: number
// }
// window.age = 19
// console.log(window.age)

// ===============================

// type IBar = {
//   name: string
//   age: number
// }

// type IBar = {
// }

interface IPerson {
  
}


export {}