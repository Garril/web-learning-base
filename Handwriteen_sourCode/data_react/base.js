class Depend {
  constructor() {
    this.reactiveFns = [];
  }
  addDepend(fn) {
    this.reactiveFns.push(fn);
  }
  notify() {
    this.reactiveFns.forEach( fn => fn() )
  }
}

const targetMap = new WeakMap();

let activeReactiveFn = null;

function watchFn(fn) {
  activeReactiveFn = fn;
  fn();
  activeReactiveFn = null;
  // console.log("second: ",activeReactiveFn,fn);
}

const obj = {
  name: "muggle",
  age: 18
}

function getDepend(obj,key) {
  let map = targetMap.get(obj);
  if(!map) {
    map = new Map();
    targetMap.set(obj,map);
  }
  let depend = map.get(key);
  if(!depend) {
    depend = new Depend();
    map.set(key,depend);
  }
  return depend;
}

const objProxy = new Proxy(obj,{
  get(target,key,receiver) {
    const depend = getDepend(target,key);
    depend.addDepend(activeReactiveFn);
    console.log("get key: ",key)
    return Reflect.get(target,key,receiver);
  },
  set(target,key,newValue,receiver) {
    Reflect.set(target,key,newValue,receiver);
    const depend = getDepend(target,key);
    depend.notify();
  }
})
console.log("=========================")
watchFn(() => {
  console.log("just test");
})
console.log("=========================")
watchFn(function() {
  console.log(objProxy.name, "name 发生变化 1")
})
watchFn(function() {
  console.log(objProxy.age, "age 发生变化是需要执行的----1")
})
watchFn(function() {
  console.log(objProxy.age, "age 发生变化是需要执行的----2")
})
/* 
=========================
just test
second:  null [Function (anonymous)]
========================= 下面 是watchFn默认的执行。
get key:  name  --- 在这里就清楚了，看下面注释!!!:
muggle name 发生变化 1
get key:  age
18 age 发生变化是需要执行的----1
get key:  age
18 age 发生变化是需要执行的----2

注释!!!：watchFn函数的调用 watchFn（fn），先是把函数fn函数保存到全局变量activeReactiveFn中
然后，因为执行 fn(),内部访问到了，使用到了 对应的属性，那么 就会调用 objProxy中对应属性的 get
get中，会拿到/创建 当前属性相应的 depend，再把刚刚保存的fn，
也就是全局变量 activeReactiveFn -- 函数，通过调用 addDepend
把函数 push进 depend类实例对象中的数组（constructor中初始化）。
最后 activeReactiveFn 函数还在watchFn函数中重新置为了null

这里注意的就是，我 添加依赖到对象 对应属性的 对应的depend，是在调用属性的get过程中完成的
这也免不了，初始化收集依赖的时候要执行一次，且执行的函数中必须有对应的属性的调用get的情况
否则之后对属性进行值的修改，会没有函数回调（因为之前没收集）
*/
console.log("===============")
objProxy.name = "kobe";
/* 下面是修改了name之后，对应的响应式回调
===============
get key:  name
kobe name 发生变化 
*/
objProxy.age = 20;
/* 
get key:  age
20 age 发生变化是需要执行的----1
get key:  age
20 age 发生变化是需要执行的----2
*/
console.log(targetMap.get(obj))
console.log(targetMap.get(obj).get("name"))
console.log(targetMap.get(obj).get("age"))
/* 
Map(2) {
  'name' => Depend { reactiveFns: [ [Function (anonymous)], null ] },
  'age' => Depend {
    reactiveFns: [ [Function (anonymous)], [Function (anonymous)], null, null ]
  }
}
Depend { reactiveFns: [ [Function (anonymous)], null ] }
Depend {
  reactiveFns: [ [Function (anonymous)], [Function (anonymous)], null, null ]
}
*/

