var foo = "foo"

// if (true) {
//   console.log(foo)

//   let foo = "abc"
// }


function bar() {
  let foo = "abc"
  console.log(foo)
  // ****** 如果调换位置，变成
  // console.log(foo)
  // let foo =" abc"
  // foo不会到外层去找，内部因为let了报错。
}

bar()


var name1 = "abc"
let name2 = "cba"
const name3 = "nba"


// 构建工具的基础上创建项目\开发项目 webpack/vite/rollup
// babel
// ES6 -> ES5

const info = {name: "why"}

// info = {name: "kobe"}
