const obj = {
  name: "why",
  age: 18
}

// Reflect 是一个对象，字面意：反射
// 1. Object作为一构造函数，把defineProperty/getPrototype等操作放到上边，不合适
// 2. in 和 delete等操作符，也集中到了Reflect。
// 是一种对js的规范化，同时他实现了13种trap（捕获器），和Proxy搭配使用
const objProxy = new Proxy(obj, {
  // 之前的 target[key] = newValue等操作，本质还是对原来对象进行操作
  // 这里全改成Reflect操作，避免了对原对象做操作
  get: function(target, key, receiver) {
    console.log("get---------")
    return Reflect.get(target, key)  // 不还是 target[key] ===> obj.name
  },
  set: function(target, key, newValue, receiver) {
    console.log("set---------")
    // target[key] = newValue;   原先法子

    const result = Reflect.set(target, key, newValue)
    if (result) { //  调用Reflect.set等会返回一个boolean类型，判断是否操作成功
      // 前面的老方法看不了，为什么？ 可能 Object.freeze(obj) 冻结了，又不会给你报错
    } else {
    }
  }
})

objProxy.name = "kobe"
console.log(objProxy.name)
/*  
set---------
get---------
kobe
*/


