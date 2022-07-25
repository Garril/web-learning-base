// 1.ES6之前, 对象的属性名(key)
var obj = {
  name: "why",
  friend: { name: "kobe" },
  age: 18
}

obj['newName'] = "james" // 添加新属性
console.log(obj)
// { name: 'why', friend: { name: 'kobe' }, age: 18, newName: 'james' }


// 2.ES6中Symbol的基本使用---是一个基本数据类型es6加入的，且没有construct。所以不能new
const s1 = Symbol()
const s2 = Symbol()

console.log(s1 === s2) // false

// ES2019(ES10)中, Symbol还有一个描述(description)
const s3 = Symbol("aaa")
console.log(s3.description) // aaa
console.log("============================================================");
// ***** 注意区分，描述，而不是调用 Symbol.for()传入的key
// *** 这里的description 不能通过 Symbol.keyFor( symbol实例 ) 获取
// 只能通过上述的 .description 来

// 3.Symbol值作为key
// 3.1.在定义对象字面量时使用
const obj1 = {
  [s1]: "abc",
  [s2]: "cba"
}

// 3.2.新增属性
obj1[s3] = "nba"

// 3.3.Object.defineProperty方式
const s4 = Symbol()
Object.defineProperty(obj1, s4, {
  enumerable: true,
  configurable: true,
  writable: true,
  value: "mba"
})

console.log(obj1[s1], obj1[s2], obj1[s3], obj1[s4])
// abc cba nba mba
console.log("============================================================");
// ***** 注意: 
// 对象一般存储的时候，要么key就是string类型，不然就是Symbol类型，而
// Symbol类型，是不能通过.语法获取 
// 比如：console.log(obj.s1) ，不行！！！

// 4.使用Symbol作为key的属性名,在遍历/Object.keys等中是获取不到这些Symbol值
// 即便你通过 Object.defineProperty()去设置，其中的 enumerable 为 true
// 需要Object.getOwnPropertySymbols来获取所有Symbol的key
console.log(obj1);
/* 
{
  [Symbol()]: 'abc',
  [Symbol()]: 'cba',
  [Symbol(aaa)]: 'nba',
  [Symbol()]: 'mba'
}
*/
console.log("====================================")
obj1.name = "hhh_test"
console.log(Object.keys(obj1))
console.log(Object.getOwnPropertyNames(obj1))
console.log(Object.getOwnPropertySymbols(obj1))
/* 
[ 'name' ]
[ 'name' ]
[ Symbol(), Symbol(), Symbol(aaa), Symbol() ]
*/
console.log("====================================================================")

const sKeys = Object.getOwnPropertySymbols(obj1)
for (const sKey of sKeys) {
  console.log("there is key: ",sKey);
  console.log(obj1[sKey]) // 没法通过 . 来调用
}
/* 
abc
cba
nba
mba
*/

// 5.Symbol.for(key)/Symbol.keyFor(symbol)
// 注意和 description 区分开
const sa = Symbol.for("aaa")
const sb = Symbol.for("aaa")
console.log(sa === sb) // true

const key = Symbol.keyFor(sa)
console.log(key) // aaa
const sc = Symbol.for(key)
console.log(sa === sc) // true
