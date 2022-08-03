// 1.JavaScript中对象中是不能使用对象来作为key的
const obj1 = { name: "why" }
const obj2 = { name: "kobe" }

// const info = {
//   [obj1]: "aaa",
//   [obj2]: "bbb"
// }
// ***** 上述info输出后，就是只有一个属性 [object object]: "bbb",
// 因为带了 方括号[]， 都是去读，读出来的属性名是一样的

// console.log(info)

// 2.Map就是允许我们对象类型来作为key的
// 构造方法的使用
const map = new Map()
map.set(obj1, "aaa")
map.set(obj2, "bbb")
map.set(1, "ccc")
console.log(map)
/* 
  Map(3) {
    { name: 'why' } => 'aaa',
    { name: 'kobe' } => 'bbb',
    1 => 'ccc'
  }
*/

const map2 = new Map([[obj1, "aaa"], [obj2, "bbb"], [2, "ddd"]])
console.log(map2)
/* 
Map(3) {
  { name: 'why' } => 'aaa',
  { name: 'kobe' } => 'bbb',
  2 => 'ddd'
}
*/

// 3.常见的属性和方法
console.log("length",map2.size) // 3

// set
map2.set("why", "eee")
console.log("set",map2)

// get(key)
console.log("get",map2.get("why"))

// has(key)
console.log("has",map2.has("why"))

// delete(key)
map2.delete("delete","why")

console.log("============================");
console.log(map2)

// clear
// map2.clear()
// console.log(map2)
console.log("============================");
// 4.遍历map
// *** 这里固定的， 第一个是 item也就是value，第二个是key
map2.forEach((item, key) => {
  console.log(item, key)
})
console.log("============================");
for (const item of map2) {
  // ****** console.log(item),每次item就一个数组，两个元素，为key和value
  console.log(item[0], item[1])
}
console.log("============================");
for (const [key, value] of map2) { // 对key和value直接做解构
  console.log(key, value)
}


console.log("get",map2.get(obj1))
console.log("has",map2.has(obj1))