const obj = {
  name: "why",
  age: 18,
  friends: {
    name: "kobe"
  },
  hobbies: ["篮球", "足球"],
  // toJSON: function() {
  //   return "123456"
  // }
}

// 需求: 将上面的对象转成JSON字符串
// 1.直接转化
const jsonString1 = JSON.stringify(obj)
console.log(jsonString1)

// 2.stringify第二个参数replacer
// 2.1. 传入数组: 设定哪些是需要转换
const jsonString2 = JSON.stringify(obj, ["name", "friends"]) // 过滤，只剩下 name和friends
console.log(jsonString2)

// 2.2. 传入回调函数:
const jsonString3 = JSON.stringify(obj, (key, value) => {
  if (key === "age") {
    return value + 1
  }
  return value
})
console.log(jsonString3)

// 3.stringify第三参数 space
const jsonString4 = JSON.stringify(obj, null, "2") // 把下面的console.log输出时，按格式来
// 新换的行，开头空2格子
const jsonString4 = JSON.stringify(obj, null, "---")
console.log(jsonString4)

// 4.如果obj对象中有toJSON方法
// 会直接使用toJSON返回的值作为结果