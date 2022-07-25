class Depend {
  constructor() {
    this.reactiveFns = [];
  }
  appendFn(fn){ 
    this.reactiveFns.push(fn)
  }
  notify() {
    this.reactiveFns.forEach( fn => {
      fn();
    })
  }
}

var obj = {
  name:"aaa",
  age:18
}


const objProxy = new Proxy(obj,{
  get: function(target,key,receiver) {
    return Reflect.get(target,key,receiver);
  },
  set: function(target,key,newValue,receiver) {
    Reflect.set(target,key,newValue,receiver);
  }
})

const depend = new Depend();
function forReact() {
  console.log("something changed!");
}
function watchFn(fn) {
  depend.appendFn(forReact);
}

objProxy.name = "bbb";