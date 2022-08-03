// number|string 联合类型
function printID(id: number|string|boolean) {
  // 使用联合类型的值时, 需要特别的小心
  // 比如在这里 console.log(id.toUpperCase())。会报错

  // narrow: 缩小
  if (typeof id === 'string') {
    // TypeScript帮助确定id一定是string类型，所以这里不会报错
    console.log(id.toUpperCase())
  } else {
    console.log(id)
  }
}

printID(123)
printID("abc")
printID(true)

