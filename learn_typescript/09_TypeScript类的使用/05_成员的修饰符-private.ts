class Person {
  private name: string = ""

  // 封装了两个方法, 通过方法来访问name
  getName() {
    return this.name
  }

  setName(newName) {
    this.name = newName
  }
}
/* private
  通过 p.name访问报错，只能自己写get和set方法，
  然后p.get/setxxx去调用，修改和访问name
*/
const p = new Person()
console.log(p.getName())
p.setName("why")

export {}