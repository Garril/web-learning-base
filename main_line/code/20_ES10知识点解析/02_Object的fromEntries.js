// const obj = {
//   name: "why",
//   age: 18,
//   height: 1.88
// }

// const entries = Object.entries(obj)
// console.log(entries)

// 下面这部分适用于： [ [key,value],['age',18],['height',1.88] ] 要转换成为一个对象
// const newObj = {}
// for (const entry of entries) {
//   newObj[entry[0]] = entry[1]
// }
// console.log(newObj);
//  结束
// 便利的方法如下：
// 1.ES10中新增了Object.fromEntries方法
// const newObj = Object.fromEntries(entries)
// console.log(newObj)


// 2.Object.fromEntries的应用场景
const queryString = 'name=why&age=18&height=1.88'
const queryParams = new URLSearchParams(queryString)
for (const param of queryParams) {
  console.log(param)
}
const paramObj = Object.fromEntries(queryParams) // 要求传入可迭代对象
console.log(paramObj)
/* 
[ 'name', 'why' ]
[ 'age', '18' ]
[ 'height', '1.88' ]
{ name: 'why', age: '18', height: '1.88' }
*/