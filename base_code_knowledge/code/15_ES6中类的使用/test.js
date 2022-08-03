const SymbolA = Symbol('A');
const SymbolB = Symbol('B');
// 外部私有
function getAge(age) {
  this.age = age
}

const Cat = class Tom {
  // 公有方法
  getAge(age) {
    getAge.call(this,age);
  }
  // Symbol值的唯一性
  SymbolName(name) {
    this[SymbolA](name)
  }
  [SymbolA](name) {
    this[SymbolB] = name;
  }

}
console.log(typeof Cat); // function
console.log(Cat.name) // Tom

const obj = new Cat;
console.log(obj) // Tom {}

obj[SymbolA]("aaa");
console.log(obj[SymbolB]) //aaa
