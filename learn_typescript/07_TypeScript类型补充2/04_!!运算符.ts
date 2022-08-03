const message = "Hello World"

// const flag = Boolean(message)
// console.log(flag) --- 有值：为true

const flag = !!message  // 就是上面的语法糖 
// !message 做了取反，变成布尔值，再取反，变成代表的布尔值
console.log(flag)

export {}