// 父类: 公共属性和方法
function Person(name, age, friends) {
  // this = stu
  this.name = name
  this.age = age
  this.friends = friends
}

Person.prototype.eating = function() {
  console.log(this.name + " eating~")
}

// 子类: 特有属性和方法
function Student(name, age, friends, sno) {
  Person.call(this, name, age, friends)
  // this.name = name
  // this.age = age
  // this.friends = friends
  this.sno = 111
}

// 直接将父类的原型赋值给子类, 作为子类的原型
Student.prototype = Person.prototype

Student.prototype.studying = function() {
  console.log(this.name + " studying~")
}


// name/sno
var stu1 = new Student("hhh", 18, ["kobe"], 111)
var stu2 = new Student("www", 22, [], 112)
console.log(stu1) // Person { name: 'hhh', age: 18, friends: [ 'kobe' ], sno: 111 }
stu1.eating() // hhh eating~
