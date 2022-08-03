// 10, 20, 40, 333
// 1.创建Set结构
const set = new Set()
set.add(10)
set.add(20)
set.add(40)
set.add(333)

set.add(10)

// 2.添加对象时特别注意:
// **** 这里加两个不同的空对象（认为是两个不同的引用了）
set.add({})
set.add({})

const obj = {}
// **** 加两次空对象，但是都是obj，重复了，只算一个（同个引用）
set.add(obj)
set.add(obj)

console.log(set) // Set(7) { 10, 20, 40, 333, {}, {}, {} }
console.log("===================================");

// 3.对数组去重(去除重复的元素)
const arr = [33, 10, 26, 30, 33, 26]
// const newArr = []
// for (const item of arr) {
//   if (newArr.indexOf(item) !== -1) {
//     newArr.push(item)
//   }
// }

const arrSet = new Set(arr)
// ***** 这里直接把数组传了进去，重复性的数会被删了
// const newArr = Array.from(arrSet)
// const newArr = [...arrSet]
// console.log(newArr)


// 4.size属性
console.log(arrSet.size) // *** 4 把重复的删掉了

// 5.Set的方法
// add
arrSet.add(100)
console.log(arrSet) // Set(5) { 33, 10, 26, 30, 100 }
console.log("===================================");


// delete
arrSet.delete(33)
console.log(arrSet) // Set(4) { 10, 26, 30, 100 }

// has
console.log("arrSet.has(100):  ",arrSet.has(100)); // arrSet.has(100):   true
console.log("===================================");
// clear
// arrSet.clear()
console.log(arrSet)

// 6.对Set进行遍历
arrSet.forEach(item => {
  console.log(item)
})

console.log("===================================");

for (const item of arrSet) {
  console.log(item)
}

