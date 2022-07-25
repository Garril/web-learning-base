/*
  es6中的继承流程为：创建父类的实例对象this,
  再通过子类的构造函数修改this。在class的继承中，
  子类的_proto_属性表示构造函数的继承，
  指向父类，子类prototype属性的_proto_属性，
  表示方法的继承，总是指向父类的prototype属性。
*/
class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }

  running() {
    console.log(this.name + " running~")
  }

  eating() {
    console.log(this.name + " eating~")
  }

  personMethod() {
    console.log("处理逻辑1")
    console.log("处理逻辑2")
    console.log("处理逻辑3")
  }

  static staticMethod() {
    console.log("PersonStaticMethod")
  }
}

// Student称之为子类(派生类)
class Student extends Person {
  // JS引擎在解析子类的时候就有要求, 如果我们有实现继承
  // 那么子类的构造方法中, 在使用this之前
  constructor(name, age, sno) {
    super(name, age)
    this.sno = sno
  }

  studying() {
    console.log(this.name + " studying~")
  }

  // 类对父类的方法的重写
  running() {
    console.log("student " + this.name + " running")
  }

  // 重写personMethod方法
  personMethod() {
    // 复用父类中的处理逻辑
    super.personMethod()

    console.log("处理逻辑4")
    console.log("处理逻辑5")
    console.log("处理逻辑6")
  }

  // 重写静态方法
  static staticMethod() {
    super.staticMethod()
    console.log("StudentStaticMethod")
  }
}

var stu = new Student("why", 18, 111)
console.log(stu) // Student { name: 'why', age: 18, sno: 111 }

// console.log(Object.getOwnPropertyDescriptors(stu.__proto__))
// console.log(Object.getOwnPropertyDescriptors(stu.__proto__.__proto__))

stu.studying()
stu.running()
stu.eating()
/* 
why studying~
student why running
why eating~
*/

stu.personMethod()

Student.staticMethod()
/* 
处理逻辑1
处理逻辑2
处理逻辑3
处理逻辑4
处理逻辑5
处理逻辑6
PersonStaticMethod
StudentStaticMethod
*/

console.log(Object.getOwnPropertyDescriptors(Person))

/* 
{
  length: { value: 2, writable: false, enumerable: false, configurable: true },
  name: {
    value: 'Person',
    writable: false,
    enumerable: false,
    configurable: true
  },
  prototype: {
    value: {},
    writable: false,
    enumerable: false,
    configurable: false
  },
  staticMethod: {
    value: [Function: staticMethod],
    writable: true,
    enumerable: false,
    configurable: true
  }
}
*/