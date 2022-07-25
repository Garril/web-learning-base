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
  Object.keys(obj).forEach(key => { // 改用 Object.defineProperty
    let value = obj[key];
    Object.defineProperty(obj,key,{
      get() {
        const depend = getDepend(obj,key);
        depend.addDepend();
        return value;
      },
      set(newValue) {
        value = newValue
        const depend = getDepend(obj,key);
        depend.notify()
      }
    })
  })
  return obj;
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