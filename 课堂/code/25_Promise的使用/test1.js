// constructor 里面 const的变量，无用，不会变成你属性加如到创建的类里
// 了解了new一个对象的过程后，就知道了，constructor里面的this指向了新创建的对象
// 后续的this.name = name 才是加属性的过程
class Person {
  constructor(foo) {
    const name = 'aaa';
    foo(name);
  }
}
function foo(a) {
  console.log(a);
}

const person = new Person(foo);

console.log("person.name: ",person.name); // undefined