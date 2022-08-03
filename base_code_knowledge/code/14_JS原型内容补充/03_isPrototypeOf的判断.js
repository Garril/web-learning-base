function Person() {

}

var p = new Person()

console.log(p instanceof Person) // true
console.log(Person.prototype.isPrototypeOf(p)) // true


var obj = {
  name: "why",
  age: 18
}

var info = Object.create(obj)

// console.log(info instanceof obj)
console.log(obj.isPrototypeOf(info)) // true
