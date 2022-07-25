function isObject(value) {
  const valueType = typeof value
  return (value !== null) && (valueType === "object" || valueType === "function")
}

function deepClone(originValue) {
  // 判断是否是一个Set类型
  if (originValue instanceof Set) {
    return new Set([...originValue])
  }

  // 判断是否是一个Map类型
  if (originValue instanceof Map) {
    return new Map([...originValue])
  }

  // 判断如果是Symbol的value, 那么创建一个新的Symbol
  if (typeof originValue === "symbol") {
    return Symbol(originValue.description)
  }

  // 判断如果是函数类型, 那么直接使用同一个函数
  if (typeof originValue === "function") {
    return originValue
  }

  // 判断传入的originValue是否是一个对象类型
  if (!isObject(originValue)) {
    return originValue
  }

  // 判断传入的对象是数组, 还是对象
  const newObject = Array.isArray(originValue) ? []: {}
  for (const key in originValue) { 
    // symbol作为key的话，用for in是遍历不出来的
    newObject[key] = deepClone(originValue[key])
  }

  // 对Symbol的key进行特殊的处理
  const symbolKeys = Object.getOwnPropertySymbols(originValue)
  for (const sKey of symbolKeys) {
    // const newSKey = Symbol(sKey.description)
    newObject[sKey] = deepClone(originValue[sKey])
    // 新对象里面的key用的symbol是一样的，但是作为key没必要不同了
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
  // 数组类型
  hobbies: ["abc", "cba", "nba"],
  // 函数类型
  foo: function(m, n) {
    console.log("foo function")
    console.log("100代码逻辑")
    return 123
  },
  // Symbol作为key和value
  [s1]: "abc",
  s2: s2,
  // Set/Map
  set: new Set(["aaa", "bbb", "ccc"]),
  map: new Map([["aaa", "abc"], ["bbb", "cba"]]),
}

const newObj = deepClone(obj)
console.log(newObj === obj)

obj.friend.name = "kobe"
obj.friend.address.city = "成都"
console.log(newObj)
console.log(newObj.s2 === obj.s2)

/**
 * 解决了 函数，set，map，symbol，数组 的拷贝
 * 注意：这里的map和set是浅拷贝，需要时自己封装。
 *      且，没有实现循环引用
 */