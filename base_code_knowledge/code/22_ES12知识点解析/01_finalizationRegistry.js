// ES12: FinalizationRegistry类
const finalRegistry = new FinalizationRegistry((value) => {
  console.log("注册在finalRegistry的对象, 某一个被销毁", value)
  // 隔了一会才打印---GC检测有间隔的
})

let obj = { name: "why" }
let info = { age: 18 }

finalRegistry.register(obj, "obj_") // 第二个参数传给第二行的回调的value
finalRegistry.register(info, "value_")

obj = null
info = null

