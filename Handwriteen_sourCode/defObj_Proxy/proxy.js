let obj = {
  name: "muggle",
  age: "18",
  foo () {
    console.log("foo function running!");
  }
}


const objProxy = new Proxy(obj, {
  get(target,key) {
    console.log(`这里${key}被get了`)
    return target[key];
  },
  set(target,key,newValue) {
    console.log(`这里${key}被set了`)
    target[key] = newValue;
  },
  has(target,key) {
    console.log(`there object's ${key} run in operation`)
    return key in target
  },
  deleteProperty(target,key)  {
    console.log(`监听到对象的${key}属性删除操作`, target)
    delete target[key]
  }
})
// 改的代理对象，原对象obj属性也变化
// 但是直接修改obj.name/age，不会触发监听事件（clg）
objProxy.age  = 20;
objProxy.name =  "test"
console.log("=========")
console.log(obj.name)
console.log(obj.age)
/* 
这里age被set了
这里name被set了
=========
test
20
*/
console.log("=============")
console.log("name" in objProxy);
delete objProxy.name;
/* 
=============
there object'sname run in operation
true
监听到对象的name属性删除操作 { name: 'test', age: 20 }
*/
console.log("=============")
objProxy.foo();
/* 
=============
这里foo被get了
foo function running!
*/