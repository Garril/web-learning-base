const obj = {
  name: "why",
  age: 18
}

console.log(Object.entries(obj)) // [ ['name','why'],['age',18] ]
const objEntries = Object.entries(obj)
objEntries.forEach(item => {
  console.log(item[0], item[1]) 
  // name why
  // age 18
})
// 传入一个数组，转化为一个数组 [] ,数组中放着多个数组[key,value]，key是原数组的index
console.log(Object.entries(["abc", "cba", "nba"]))
console.log(Object.entries("abc")) // key是单个字符的顺序

console.log(objEntries instanceof Array) // true