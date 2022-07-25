class Person {

}

function mixinRunner(BaseClass) {
  class NewClass extends BaseClass {
    running() {
      console.log(this,"running~")
    }
  }
  return NewClass
}

function mixinEater(BaseClass) {
  return class extends BaseClass {
    eating() {
      console.log(this,"eating~")
    }
  }
}

// 在JS中类只能有一个父类: 单继承
class Student extends Person {
  constructor(name) {
    super();
    this.name = name;
  }
}

var NewStudent = mixinEater(mixinRunner(Student))
var ns = new NewStudent("hhh")
ns.running()
ns.eating()

var NewStudent2 = mixinEater(Student)
var ns2 = new NewStudent2("hhh")
ns2.eating()
