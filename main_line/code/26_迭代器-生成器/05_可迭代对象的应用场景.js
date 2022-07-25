// 1.for of场景

// 2.展开语法(spread syntax)
const iterableObj = {
  names: ["abc", "cba", "nba"],
  [Symbol.iterator]: function() {
    let index = 0
    return {
      next: () => {
        if (index < this.names.length) {
          return { done: false, value: this.names[index++] }
        } else {
          return { done: true, value: undefined }
        }
      }
    }
  }
}

const names = ["abc", "cba", "nba"]
const newNames = [...names, ...iterableObj]
console.log(newNames)

const obj = { name: "why", age: 18 }
// for (const item of obj) {

// }
// ES9(ES2018)中新增的一个特性: 用的不是迭代器
const newObj = { ...obj }
console.log(newObj)
console.log("-----------------------------");

// 3.解构语法
const [ name1, name2 ] = names
// const { name, age } = obj 不一样ES9新增的特性

// 4.创建一些其他对象时
const set1 = new Set(iterableObj)
const set2 = new Set(names)

const arr1 = Array.from(iterableObj) // 数组转对象
// Array.from() 方法对一个类似数组或可迭代对象创建一个新的，浅拷贝的数组实例。
/*
console.log(Array.from('foo'));    
// expected output: Array ["f", "o", "o"]

console.log(Array.from([1, 2, 3], x => x + x));
// expected output: Array [2, 4, 6]
*/
console.log("typeof arr1: ",typeof arr1);
console.log("arr1: ",arr1);
console.log("arr1[1]: ",arr1[1]);

console.log("-----------------------------");
// 5.Promise.all
Promise.all(iterableObj).then(res => { // iterableObj { names: ["abc", "cba", "nba"] }
  console.log(res)
})
