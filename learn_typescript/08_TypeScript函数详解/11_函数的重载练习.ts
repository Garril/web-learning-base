// 题目：
// 输入一个字符串或者数组，返回他的长度。
// ( 能通过联合类型实现的，就用联合类型 )

// 实现方式一: 联合类型
function getLength(args: string | any[]) {
  return args.length
}

console.log(getLength("abc"))
console.log(getLength([123, 321, 123]))

// 实现方式二: 函数的重载
// function getLength(args: string): number;
// function getLength(args: any[]): number;

// function getLength(args: any): number {
//   return args.length
// }

// console.log(getLength("abc"))
// console.log(getLength([123, 321, 123]))


export {}