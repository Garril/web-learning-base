const obj = {
  name: "why",
  age: 18
}

// Object.defineProperty(obj, "name", {
//   get: function() {
//     console.log("监听到obj对象的name属性被访问了")
//   },
//   set: function() {
//     console.log("监听到obj对象的name属性被设置值")
//   }
// })

// 上述没有在get里面设置值，console.log(obj.name) 的执行结果
// 先输出 第8里get的console.log, 然后输出 undefined

Object.keys(obj).forEach(key => {
  let value = obj[key]

  Object.defineProperty(obj, key, {
    get: function() {
      console.log(`监听到obj对象的${key}属性被访问了`)
      return value // 这里访问的value是不对的，在34行之后，被修改了，但是还是没变化，得加上28行
    },
    set: function(newValue) {
      console.log(`监听到obj对象的${key}属性被设置值`)
      value = newValue
    }
  })
})

obj.name = "kobe"
obj.age = 30

console.log(obj.name)
console.log(obj.age)

obj.height = 1.88


// 上述说明：用Object.defineProperty 可以去监听截止一个对象中的所有属性
// 但是设计之初不是这个想法
// 而且，新增，删除属性，是没法实现的