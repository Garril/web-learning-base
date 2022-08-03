// class Person {
//   name: string = ""
//   age: number = 12
// }

// const p = new Person()
// p.name = "123"

class Student {
  // 上面的name和age都为成员属性
  
  // 定义类属性
  static time: string = "20:00"

  static attendClass() {
    console.log("去学习~")
  }
}

console.log(Student.time)
Student.attendClass()



export {}