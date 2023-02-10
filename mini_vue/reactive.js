let activeEffect
let weakMap = new WeakMap()

export function watchEffect(effect) {
  activeEffect = effect
  effect()
  activeEffect = null
}

function getDep(target, key) {
  let objMap = weakMap.get(target)
  if( !objMap ) {
    objMap = new Map()
    weakMap.set(target, objMap)
  }
  let keyDep = objMap.get(key)
  if( !keyDep ) {
    keyDep = new Dep()
    objMap.set(key, keyDep)
  }
  return keyDep
}

class Dep {
  constructor() {
    this.subscribers = new Set()
  }
  depend() {
    if( activeEffect ) {
      this.subscribers.add(activeEffect)
    }
  }
  notify() {
    this.subscribers.forEach(effect => {
      effect()
    })
  }
}

const reactiveHandlers = {
  get(target, key, receiver) {
    const dep = getDep(target, key)
    dep.depend()
    return Reflect.get(target, key, receiver)
  },
  set(target, key, value, receiver) {
    const dep = getDep(target, key)
    const res = Reflect.set(target, key, value, receiver)
    dep.notify()
    return res
  }
}

export function reactive(obj) {
  return new Proxy(obj, reactiveHandlers)
}