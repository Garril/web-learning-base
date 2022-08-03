
const obj = {name: "obj1"}
// 1.WeakMap和Map的区别二:
const map = new Map()
map.set(obj, "aaa")

const weakMap = new WeakMap()
weakMap.set(obj, "aaa")

// 2.区别一: 不能使用基本数据类型
let arr = [1,2];
weakMap.set(arr, "ccc") // Invalid value used as weak map key

// 3.常见方法
// get方法
console.log(weakMap.get(obj)) // aaa
console.log(weakMap.get(arr)) // ccc

// has方法
console.log(weakMap.has(obj)) // true

// delete方法
console.log(weakMap.delete(obj)) // true
// WeakMap { <items unknown> }
console.log(weakMap)  // WeakMap { <items unknown> }
