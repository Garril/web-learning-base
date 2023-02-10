function isObject(value) {
  const valueType = typeof value
  return (value !== null) && (valueType === "object" || valueType === "function")
}

function deepClone(originValue) {
  // 判断传入的originValue是否是一个对象类型
  if (!isObject(originValue)) {
    return originValue
  }

  const newObject = {}
  for (const key in originValue) {
    newObject[key] = deepClone(originValue[key])
  }
  return newObject
}


// 测试代码
let s1 = Symbol("aaa")
let s2 = Symbol("bbb")

const obj = {
  name: "why",
  age: 18,
  friend: {
    name: "james",
    address: {
      city: "广州"
    }
  },
  // Symbol作为key和value
  [s1]: "abc",
  s2: s2,
  foo() {
    console.log("hhh")
  }
}

const newObj = deepClone(obj)
console.log(newObj === obj)

obj.friend.name = "kobe"
obj.friend.address.city = "成都"
console.log(newObj)

// 完成了最基本的深拷贝功能，但是
// 如果对象中有数组
/**
 * eg:
 * const obj = {
 *   hobbies: ["abc","cba","nba"]
 * }
 * const newObj = deepClone(obj)
 * console.log(newObj) 
 * 结果如下：
 * {
 *  hobbies: {'0':'abc','1':'cba','2':'nba'}
 * }
 * 造成的问题，数组也判断是对象，但是赋值给的是对象，第12行
 */