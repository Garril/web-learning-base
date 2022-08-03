

const obj = {
  name: "why",
  age: 18,
  friends: {
    name: "kobe"
  },
  hobbies: ["篮球", "足球"]
}

// 将obj转成JSON格式的字符串
const objString = JSON.stringify(obj)

// 将对象数据存储localStorage
localStorage.setItem("obj", objString)
// localStorage.setItem(a,b) 要求a和b都是字符串类型
// 如果传入对象，他会把对象直接转换成string，而对象转字符串都是：[object,object]
// 而且没法还原

const jsonString = localStorage.getItem("obj")

// 将JSON格式的字符串转回对象
const info = JSON.parse(jsonString)
console.log(info)
