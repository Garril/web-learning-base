var names = ["abc", "cba", "nba"]

class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
    this._address = "广州市"
  }

  // 普通的实例方法
  // 创建出来的对象进行访问
  // var p = new Person()
  // p.eating()
  eating() {
    console.log(this.name + " eating~")
  }

  running() {
    console.log(this.name + " running~")
  }

  // 类的访问器方法
  get address() {
    console.log("拦截访问操作")
    return this._address
  }

  set address(newAddress) {
    console.log("拦截设置操作")
    this._address = newAddress
  }

  // 类的静态方法(类方法)
  // Person.createPerson()
  static randomPerson() {
    var nameIndex = Math.floor(Math.random() * names.length)
    var name = names[nameIndex]
    var age = Math.floor(Math.random() * 100)
    return new Person(name, age)
  }
}

var p = new Person("why", 18)
p.eating()
p.running()
/* 
why eating~
why running~
*/
console.log(p.address)
p.address = "北京市"
console.log(p.address)
/* 
拦截访问操作
广州市
拦截设置操作
拦截访问操作
北京市
*/

console.log(p) // Person { name: 'why', age: 18, _address: '北京市' }
console.log(p._address) // 北京市 ---可以直接访问，看来得完善

// console.log(Object.getOwnPropertyDescriptors(Person.prototype))

for (var i = 0; i < 3; i++) {
  console.log(Person.randomPerson())
}
/* 
Person { name: 'abc', age: 39, _address: '广州市' }
Person { name: 'cba', age: 9, _address: '广州市' }
Person { name: 'cba', age: 91, _address: '广州市' }
*/