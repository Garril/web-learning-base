class Depend {
  constructor() {
    this.reactiveFns = [];
  }
  addDepend(fn) {
    this.reactiveFns.push(fn);
  }
  notify() {
    this.reactiveFns.forEach(fn => {
      fn();
    })
  }
}

function forReact() {
  console.log("there is something changed!");
}

let depend = new Depend();

function watchFn(depend,fn) {
  depend.addDepend(fn);
}
watchFn(depend,forReact);

var obj = {
  name:"aaa",
  age:18
}

const targetMap = new WeakMap();

function getDepend(target,key) {
  let map = targetMap.get(target);
  if(!map) {
    map = new Map();
    targetMap.set(target,map);
  }
  let depend = map.get(key);
  if(!depend) {
    depend = new Depend();
    map.set(key,depend);
  }
  if(depend.reactiveFns.length == 0) {
    // depend.addDepend(forReact);
    watchFn(depend,forReact);
  }
  return depend;
}

const objProxy = new Proxy(obj,{
  get: function(target,key,receiver) {
    return Reflect.get(target,key,receiver);
  },
  set: function(target,key,newValue,receiver) {
    Reflect.set(target,key,newValue,receiver);
    const depend = getDepend(target,key);
    depend.notify();
  }
})


objProxy.name = 'bbb';
