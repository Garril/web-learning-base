let message: string|null = "Hello World"

const content = message ?? "你好啊"
// const content = message ? message: "你好啊, 李银河"
console.log(content)

export {}

/**
 * 空值合并操作符？？是一个逻辑操作符，当操作符的左侧是null或者 undefined时，
 * 返回右侧的操作数，否则返回左侧
 * 看上面的例子， 其实就是 
 * 第一行： message 为 null 的时候，第3行，就赋值，拿到字符串 “你好啊”
 * 如果 第一行 message 为 “Hello World”，第三行就保留原先的值，不再重新赋值
 * 
 * 第四行就是相同的含义
 */