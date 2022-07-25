// ES12: WeakRef类
// WeakRef.prototype.deref: 
// > 如果原对象"没有"销毁, 那么可以获取到原对象
// > 如果原对象"已经"销毁, 那么获取到的是undefined
const finalRegistry = new FinalizationRegistry((value) => {
  console.log("注册在finalRegistry的对象, 某一个被销毁", value)
})

let obj = { name: "why" }
let info = new WeakRef(obj)
// let info = new WeakSet()
// info.add(obj)  -- 弱引用，即便info指向obj，GC还是直接会回收
// WeakRef也是同作用 

finalRegistry.register(obj, "obj")

// console.log(info.name); undefined 直接拿，拿不到

obj = null

setTimeout(() => { // 用可选链/&&，就不会报错了，只是undefined
  console.log(info.deref()?.name)  // why
  console.log(info.deref() && info.deref().name)
}, 10000)
