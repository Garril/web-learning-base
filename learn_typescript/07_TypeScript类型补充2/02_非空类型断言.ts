// message? -> undefined | string
function printMessageLength(message?: string) {
  // if (message) {
  //   console.log(message.length)
  // }
  // vue3源码 的proxy 部分就用到了 非空类型断言
  console.log(message!.length)  // 感叹号表示 message一定有值： 非空断言
  // message有可能为undefined，不加 !.length 编译不能通过
  // tsc 文件名.ts 可以生成对应的js代码，但是如果 tsc --init，
  // 生成了tsconfig.json后就会 开始报错
}

printMessageLength("aaaa")
printMessageLength("hello world")

export {}