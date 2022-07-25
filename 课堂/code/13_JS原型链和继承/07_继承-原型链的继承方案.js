// 父类: 公共属性和方法
function Person() {
  this.name = "hhh"
  this.friends = []
}

Person.prototype.eating = function() {
  console.log(this.name + " eating~")
}

// 子类: 特有属性和方法
function Student() {
  this.sno = 111
}

var p = new Person()
Student.prototype = p

Student.prototype.studying = function() {
  console.log(this.name + " studying~")
}


// name/sno
var stu = new Student()

console.log(stu.name)
stu.eating()
stu.studying()
/* 
hhh
hhh eating~
hhh studying~
*/

// 原型链实现继承的弊端:
// 1.第一个弊端: 打印stu对象, 继承的属性是看不到的
// console.log(stu.name)

// 2.第二个弊端: 创建出来两个stu的对象
var stu1 = new Student()
var stu2 = new Student()

// 直接修改对象上的属性, 是给本对象添加了一个新属性
stu1.name = "kobe" // 修改stu1.name，其实是stu1自己创了个name属性
console.log(stu2.name) // hhh --- stu2没有影响，用的还是原型对象的name属性
stu1.studying(); // kobe studying~

// 获取引用, 修改引用中的值, 会相互影响 --- 同一个firends数组
stu1.friends.push("kobe")

console.log(stu1.friends) // ['kobe']
console.log(stu2.friends) // ['kobe']

// 3.第三个弊端: 在前面实现类的过程中都没有传递参数
var stu3 = new Student("lilei", 112)
