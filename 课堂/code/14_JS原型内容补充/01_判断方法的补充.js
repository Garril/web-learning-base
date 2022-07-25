var obj = {
  name: "why",
  age: 18
}

var info = Object.create(obj, {
  address: {
    value: "北京市",
    enumerable: true
  }
})

// hasOwnProperty方法判断 --- 是不是自己的属性
console.log(info.hasOwnProperty("address")) // true -- 自己的
console.log(info.hasOwnProperty("name")) // false --- 原型链上的

// in 操作符: 不管在当前对象还是原型中返回的都是true
console.log("address" in info) // true
console.log("name" in info) // true

// // for in
for (var key in info) {
  console.log(key)
}
/* 
address
name
age
*/