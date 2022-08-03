// 编写的一个迭代器,-- iterator protocol 迭代器协议，注意与可迭代iterable协议区分
// iterator protocol内容如下：
// 迭代器是一个对象，对象内有方法next，
// next函数是无参/一个参数的 ----生成器是“特殊”的迭代器，generator.next()要传参
// 且next方法还要返回一个对象，对象内必须有两个属性done和value
const iterator = {
  next: function() {
    return { done: true, value: 123 }
  }
}

// 数组
const names = ["abc", "cba", "nba"]
// 测试
// const iterator = names[Symbol.iterator]()
// console.log(iterator.next());
// console.log(iterator.next());
// console.log(iterator.next());
// console.log(iterator.next());
// 结果：
// { value: 'abc', done: false }
// { value: 'cba', done: false }
// { value: 'nba', done: false }
// { value: undefined, done: true }


// 创建一个迭代器对象来访问数组
let index = 0

const namesIterator = {
  next: function() {
    if (index < names.length) {
      return { done: false, value: names[index++] }
    } else {
      return { done: true, value: undefined }
    }
  }
}

console.log(namesIterator.next()) // .....
console.log(namesIterator.next()) // .....
console.log(namesIterator.next()) // { done: false, value: "nba" }
console.log(namesIterator.next()) // { done: true, value: undefined }
console.log(namesIterator.next()) // { done: true, value: undefined }
console.log(namesIterator.next()) // { done: true, value: undefined }
console.log(namesIterator.next()) // .....下面略
console.log(namesIterator.next())
console.log(namesIterator.next())
