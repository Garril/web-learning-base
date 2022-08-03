var obj = {
  name: 'why',
  age: 18
}

// 1.禁止对象继续添加新的属性
Object.preventExtensions(obj)

obj.height = 1.88
obj.address = "广州市"

console.log(obj) // { name: 'why', age: 18 } --- 不报错，但是加属性没有效果

// 2.禁止对象配置/删除里面的属性
// for (var key in obj) {
//   Object.defineProperty(obj, key, {
//     configurable: false,
//     enumerable: true,
//     writable: true,
//     value: obj[key]
//   })
// }

Object.seal(obj)
/* 
  seal 封闭一个对象，阻止添加新属性
  并将所有现有属性标记为不可配置。
  当前属性的值只要原来是可写的就可以改变。
*/

delete obj.name
console.log(obj.name) // why 

// 3.让属性不可以修改(writable: false)
Object.freeze(obj)
/* Object.freeze() 方法可以冻结一个对象。一个被冻结的对象再也不能被修改；
冻结了一个对象则不能向这个对象添加新的属性，不能删除已有属性，
不能修改该对象已有属性的可枚举性、可配置性、可写性，
以及不能修改已有属性的值。
此外，冻结一个对象后该对象的原型也不能被修改。
freeze() 返回和传入的参数相同的对象。*/

obj.name = "kobe"
console.log(obj.name) // why 
