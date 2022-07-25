const obj = {
  _name: "why",
  get name() {
    return this._name
  },
  set name(newValue) {
    this._name = newValue
  }
}
/* 
大总结： 我明面上还是去调用的 obj.name，实际上我改变了 obj的get name中的this
反而代理对象objProxy成为this，去调用 _name，那么就又返回到 obj对象，去调用obj对象的 _name
*/


// receiver的引入: 如果，不改变访问obj.name时调用的get方法里面的this
// 那么其实，这里的 console.log(objProxy.name);
// 原理也就是调用了objProxy的get方法，get又return Reflect.get
// 最后还是去访问的obj对象里get name() { this } 其中的this还是obj，而不是objProxy
// 这样和 直接访问 obj.name 效果一样

// 注意：receiver也可以自己定，就是改变this指向，只是他有给默认值
const objProxy = new Proxy(obj, {
  get: function(target, key, receiver) {
    // receiver是创建出来的代理对象 
    console.log("get方法被访问--------", key, receiver) // 这里调用两次，key为name和_name
    // console.log(receiver === objProxy)  true
    return Reflect.get(target, key, receiver)
    // 这里的get调用的第三个参数receiver，就会跑到obj对象的get name()里面
    // 把this指向改为 receiver，也就是 objProxy
    // 那么 Reflect.get第一次调用 key为name，跑到obj调用 get name，因为this是objProxy
    // 又会回到 objProxy里面，调用get，但是这次的key为_name, 调用return Reflect.get()
    // 默认调用了 obj._name的get，拿到了值
  },
  set: function(target, key, newValue, receiver) {
    console.log("set方法被访问--------", key)
    Reflect.set(target, key, newValue, receiver)
  }
})

// console.log(objProxy.name)
objProxy.name = "kobe"


/* 
set方法被访问-------- name
set方法被访问-------- _name
*/
console.log(objProxy.name);
console.log("===========");
console.log(obj.name);
/* 
get方法被访问-------- name { _name: 'kobe', name: [Getter/Setter] }
get方法被访问-------- _name { _name: 'kobe', name: [Getter/Setter] }
kobe
===========
kobe
*/