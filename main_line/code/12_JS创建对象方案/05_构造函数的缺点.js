function foo() {
  function bar() {

  }
  return bar
}

var fn1 = foo()
var fn2 = foo()

console.log(fn1 === fn2) // false,每个对象的属性，方法都不一样（其实差不多的东西应该做一层抽象）


/* 
构造函数的缺点：
1、不是原型链继承，只是借用构造函数，所以不能继承原型的属性和方法
2、虽然构造函数中定义的属性和方法是可以访问的，但是每个实例都被复制了。
---如果例子太多，方法太多，占用内存很大，那么方法就在构造函数中定义，函数的复用就无从谈起。
*/

// 父构造函数
function Father() {
  this.name = 'father'
  this.speakName1 = function () {
      console.log('speakName1')
  }
}
// 父原型上 方法
Father.prototype.alertName = function () {
  console.log(this.name)
}
// 父原型上 属性
Father.prototype.age = 21
// 子构造函数
function Children() {
  Father.call(this)
}

// 创建子实例
let c1 = new Children()
// 调用原型方法,实例访问不到
c1.alertName()
// TypeError: c1.alertName is not a function

// instanceof isPrototypeOf 无法判断实例和类型的关系
console.log(Father.prototype.isPrototypeOf(c1))// false
console.log(c1 instanceof Father)// false
/* 
  你还会发现 c1.__proto__与Father.prototype不相等
*/