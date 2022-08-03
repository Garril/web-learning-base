class Person {
  name: string = "123"
  eating() {

  }
}

const p = new Person()

const p1: Person = {
  // 通过类型注解，把Person写到这里
  // 那么这里要求实现 name和eating（也就是Person类有的成员）否则报错
  name: "why", 
  eating() {

  }
}

function printPerson(p: Person) {
  console.log(p.name)
}

printPerson(new Person())
// 本来要求的是Person类的实例对象，这里直接传一个对象，也是可以的
printPerson({name: "kobe", eating: function() {}})

export {}

