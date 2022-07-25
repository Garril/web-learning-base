function createArrayIterator(arr) {
  let index = 0
  return {
    next: function() {
      if (index < arr.length) {
        return { done: false, value: arr[index++] }
      } else {
        return { done: true, value: undefined } 
      }
    }
  }
}

const names = ["abc", "cba", "nba"]
const nums = [10, 22, 33, 12]

const namesIterator = createArrayIterator(names)
console.log(namesIterator.next())
console.log(namesIterator.next())
console.log(namesIterator.next())

const numsIterator = createArrayIterator(nums)
console.log(numsIterator.next())
console.log(numsIterator.next())
console.log(numsIterator.next())
console.log(numsIterator.next())

// 创建一个无限的迭代器，你的done不可能为true就是无限
function createNumberIterator() {
  let index = 0
  return {
    next: function() {
      return { done: false, value: index++ }
    }
  }
}

const numberInterator = createNumberIterator()
console.log(numberInterator.next())
console.log(numberInterator.next())
console.log(numberInterator.next())
console.log(numberInterator.next())
console.log(numberInterator.next())
console.log(numberInterator.next())
console.log(numberInterator.next())
console.log(numberInterator.next())
console.log(numberInterator.next())
console.log(numberInterator.next())
console.log(numberInterator.next())
console.log(numberInterator.next())
console.log(numberInterator.next())

// 相较于一，对生成迭代器做了一层封装。
// 但是，这里可以看出names，index还有迭代器对象，关联性非常强
// 那为什么不做一层封装呢? 把他们三个封装到一个对象里面，就称这个对象为可迭代对象

