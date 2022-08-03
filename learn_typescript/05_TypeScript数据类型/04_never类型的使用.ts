// never: 不返回东西


// function foo(): never {
//   // 死循环
//   while(true) {

//   }
// }

// function bar(): never {
//   throw new Error()
// }

// 例子
// 封装一个核心函数
function handleMessage(message: string | number | boolean) {
  switch (typeof message) {
    case 'string':
      console.log("string处理方式处理message")
      break
    case 'number':
      console.log("number处理方式处理message")
      break
    case 'boolean':
      console.log("boolean处理方式处理message")
      break
    default: // 这样如果参数有新加入的类型，但是switch没有做处理，就会直接报错
      const check: never = message // 因为never无法赋值
  }
}

handleMessage("abc")
handleMessage(123)

// 张三
handleMessage(true)


