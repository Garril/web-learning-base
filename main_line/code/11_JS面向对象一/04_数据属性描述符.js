// name和age虽然没有使用属性描述符来定义, 但是它们也是具备对应的特性的
// value: 赋值的value
// configurable: true
// enumerable: true
// writable: true
var obj = {
  name: "why",
  age: 18
}

// 数据属性描述符
// 用了属性描述符, 那么会有默认的特性
Object.defineProperty(obj, "address", {
  // 很多配置
  value: "北京市", // 默认值undefined

  // 该特殊不可删除/也不可以重新定义属性描述符
  configurable: false, // 默认值false

  // // 该特殊是配置对应的属性(address)是否是可以枚举
  enumerable: true, // 默认值false
  
  // // 该特性是属性是否是可以赋值(写入值) 
  writable: false // 默认值false------ 可以写入，不报错，但是不修改
})

// 测试configurable的作用
// delete obj.name
// console.log(obj.name)
// delete obj.address
// console.log(obj.address)

// Object.defineProperty(obj, "address", {
//   value: "广州市",
//   configurable: true
// })
// TypeError: Cannot redefine property: address

// 测试enumerable的作用
// console.log(obj)
// for (var key in obj) {
//   console.log(key)
// }
// console.log(Object.keys(obj))
// 正常

// 测试Writable的作用
obj.address = "上海市"
console.log(obj.address)
// 北京市  ------ 可以写入，不报错，但是不修改

// 对obj通过json深拷贝，新生成对象没有相关配置
let testObj = JSON.parse(JSON.stringify(obj));
testObj.address = "hhh"
console.log(testObj.address); // hhh
delete testObj.address;
Object.defineProperty(testObj,"address",{
  value:"ee",
  configurable:true,
  enumerable: true
})
console.log(testObj.address) // ee