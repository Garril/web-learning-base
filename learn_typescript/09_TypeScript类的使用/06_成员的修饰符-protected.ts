// protected: 在类内部和子类中可以访问

class Person {
  protected name: string = "123"
}

class Student extends Person {
  getName() {
    return this.name
  }
}

const stu = new Student()
// 直接 stu.name 访问不到
console.log(stu.getName())

/*  
  const per = new Person()
  console.log(per.name)
  per也不能访问，需要Person内部定义name的set和get
*/

export {}