// 1.生成器来替代迭代器 --- 从而减少代码量
function* createArrayIterator(arr) {

  // 3.第三种写法 yield*
  yield* arr // 第二种写法的语法糖

  // 2.第二种写法
  // for (const item of arr) {
  //   yield item
  // }
  // 1.第一种写法
  // yield "abc" // { done: false, value: "abc" }
  // yield "cba" // { done: false, value: "abc" }
  // yield "nba" // { done: false, value: "abc" }
}

// const names = ["abc", "cba", "nba"]
// const namesIterator = createArrayIterator(names)

// console.log(namesIterator.next())
// console.log(namesIterator.next())
// console.log(namesIterator.next())
// console.log(namesIterator.next())

// 2.创建一个函数, 这个函数可以迭代一个范围内的数字
// 10 14
function* createRangeIterator(start, end) {
  let index = start
  while (index < end) {
    yield index++
  }
  // 上面生成器写法，相较下面的迭代器写法就显示出了优势
  // let index = start
  // return {
  //   next: function() {
  //     if (index < end) {
  //       return { done: false, value: index++ }
  //     } else {
  //       return { done: true, value: undefined }
  //     }
  //   }
  // }
}

const rangeIterator = createRangeIterator(10, 14)
console.log(rangeIterator.next())// { value: 10, done: false }
console.log(rangeIterator.next())// { value: 11, done: false }
console.log(rangeIterator.next())// { value: 12, done: false }
console.log(rangeIterator.next())// { value: 13, done: false }
console.log(rangeIterator.next())// { value: undefined, done: true }



// 3.class案例
class Classroom {
  constructor(address, name, students) {
    this.address = address
    this.name = name
    this.students = students
  }

  entry(newStudent) {
    this.students.push(newStudent)
  }

  foo = () => {
    console.log("foo function")
  }

  // [Symbol.iterator] = function*() {
  //   yield* this.students
  // }

  *[Symbol.iterator]() {
    yield* this.students
  }
}

const classroom = new Classroom("3幢", "1102", ["abc", "cba"])
for (const item of classroom) {
  console.log(item) 
  /*
  abc
  cba
  */
}

