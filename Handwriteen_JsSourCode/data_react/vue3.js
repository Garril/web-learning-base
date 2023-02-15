class Depend {
  constructor() {
    this.reactiveFn = new Set(); // 变成了set
  }
  addDepend() {
    if(needWatchedFn) {
      this.reactiveFn.add(needWatchedFn);
    }
  }
  notify() {
    this.reactiveFn.forEach( fn => fn() )
  }
}
let needWatchedFn = null;

function watchFn(fn) {
  needWatchedFn = fn;
  fn();
  needWatchedFn = null;
}

const weakMap = new WeakMap();
function getDepend(obj,key) {
  if(obj instanceof Object) {
    let map = weakMap.get(obj);
    if(!map) {
      map = new Map();
      weakMap.set(obj,map);
    }
    let depend = map.get(key);
    if(!depend) {
      depend = new Depend();
      map.set(key,depend);
    }
    return depend;
  }
}

const obj = {
  name:"hhh",
  age: 18
}

function getReactObject(obj) { // 做了一层封装
  return new Proxy(obj, {
    get(target,key,receiver) {
      const depend = getDepend(target,key);
      depend.addDepend(); // 改变在这里，对于回调函数的收集，到Depend类中去了
      return Reflect.get(target,key,receiver);
    },
    set(target,key,value,receiver) {
      Reflect.set(target,key,value,receiver);
      const depend = getDepend(target,key);
      depend.notify();
    }
  })
}
const objProxy = getReactObject(obj);

watchFn(function() {
  console.log(objProxy.name, "name 发生变化 1")
})
watchFn(function() {
  console.log(objProxy.age, "age 发生变化是需要执行的----1")
})
watchFn(function() {
  console.log(objProxy.age, "age 发生变化是需要执行的----2")
})

console.log("===============")
objProxy.name = "kobe";
/* 
hhh name 发生变化 1
18 age 发生变化是需要执行的----1
18 age 发生变化是需要执行的----2
===============
kobe name 发生变化 1
*/