let obj = {
  name: "muggle",
  age: "18",
  foo () {
    console.log("foo function running!");
  },
  _count: 20,
  get count() {
    return this._count;
  },
  set count(v) {
    this._count = v;
  }
}


const objProxy = new Proxy(obj, {
  get(target,key,receiver) {
    console.log(`这里${key}被get了`)
    return Reflect.get(target,key,receiver)
  },
  set(target,key,newValue,receiver) {
    const res = Reflect.set(target,key,newValue,receiver);
    if(res) {
      console.log(`这里${key}被成功set了`)
    }
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
监听到对象的name属性删除操作 { name: 'test', age: 20 , foo: [Function: foo] }
*/
console.log("=============")
objProxy.foo();
/* 
=============
这里foo被get了
foo function running!
*/
// 到这里为止，上面的东西和结不结合reflect使用没差别
// 关键要看 _xxx和xxx的情况：
console.log("=============")
objProxy.count = 100;
console.log(objProxy.count)
console.log(obj.count)
/* 
=============
这里_count被成功set了
这里count被成功set了
这里count被get了
这里_count被get了
100
100

注意看上面的get和set：因为set多了一层if判断
使得 _count比count 先输出set
也就是说，先设置了 _count再设置了 count
*/
console.log("======");
console.log(obj.name === objProxy._name);
console.log(obj.name === objProxy.name);
console.log(obj._name === objProxy._name);
console.log(obj._name === objProxy.name);
/* 
======
这里_name被get了
true
这里name被get了
true
这里_name被get了
true
这里name被get了
true

看出差别了？ 值都同一个，但是你调用了objProxy，你多了代理
就可以决定你在调用对象对应属性值的时候，去额外执行其他操作
*/

