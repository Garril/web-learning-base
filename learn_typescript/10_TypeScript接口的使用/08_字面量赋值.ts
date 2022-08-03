interface IPerson {
  name: string
  age: number
  height: number
}
/*  现象描述：
  const p:IPerson = {
    name:"hhh",
    age:18
    height:1.99
  }
  实现了IPerson的对象p，
  但是，如果要在p上加一个属性，比如address
  就会报错。
  而你要是先把对象所有属性，以及要加入的address属性，
  直接写到一个普通的info对象中，再把info赋值给p，反而不会报错
*/
// const info = {
//   name: "why",
//   age: 18,
//   height: 1.88,
//   address: "广州市"
// }

// 本质原因：这里ts会做一个 freshness擦除 的操作
// 当我们把info的引用赋值给了p，它会把IPerson外，多余的属性，擦除了
// 且这里的擦除，不是把属性删除的意思，只是在编译阶段的“暂时忽视”
// （非多余的属性比如name、age、height都有，就满足了，就可以赋值
//  ---如果没有name、age、height其中一个，都不行）
// const p: IPerson = info

// 编译和打印，都没有错误（直接p上加address属性，编译就报错）
// console.log(info)
// console.log(p)


function printInfo(person: IPerson) {
  console.log(person)
  // 下面传入的时候person有address属性，且不会报错，但是，这里不能用address
  // ts类型检测的时候，你IPerson就是没有address属性
}

// 代码会报错
// printInfo({
//   name: "why",
//   age: 18,
//   height: 1.88,
//   address: "广州市"
// })

const info = {
  name: "why",
  age: 18,
  height: 1.88,
  address: "广州市"
}
// 报错
printInfo(info)



export {}