const obj = {
  name: "why",
  age: 18,
  friends: {
    name: "kobe"
  },
  hobbies: ["篮球", "足球"],
  foo: function() {
    console.log("foo function")
  }
}

// 将obj对象的内容放到info变量中
// 1.引用赋值
const info = obj
obj.age = 100
console.log(info.age) // 100
console.log(obj.age)
console.log("=========================")

// 2.浅拷贝, 第二层的对象friend还是一样的引用
const info2 = { ...obj }
obj.age = 1000
console.log(info2.age)
console.log(obj.age)

obj.friends.name = "james"
console.log(info2.friends.name)
console.log("=========================")

// 3.stringify和parse来实现
const jsonString = JSON.stringify(obj)
console.log(jsonString)
const info3 = JSON.parse(jsonString)
obj.friends.name = "curry"
console.log(info3.friends.name) // james 而不是curry，说明深拷贝
console.log(info3)
