class HYEventBus {
  constructor() {
    this.eventBus = {}
  }

  on(eventName, eventCallback, thisArg) {
    let handlers = this.eventBus[eventName]
    if (!handlers) {
      handlers = []
      this.eventBus[eventName] = handlers
    }
    handlers.push({
      eventCallback,
      thisArg
    })
  }

  off(eventName, eventCallback) {
    const handlers = this.eventBus[eventName]
    if (!handlers) return
    const newHandlers = [...handlers]
    for (let i = 0; i < newHandlers.length; i++) {

      const handler = newHandlers[i] // 含有 回调函数 和 绑定this 的对象

      if (handler.eventCallback === eventCallback) { // 是要删除的回调函数
      // 假设数组有多个函数，fn1、fn2、fn3、fn2，其中fn2有两个，都要删除，
      // 所以拷贝了个新数组作为模板，进行操作
        const index = handlers.indexOf(handler)
        handlers.splice(index, 1)
      }

    }
  }

  emit(eventName, ...payload) {
    const handlers = this.eventBus[eventName]
    if (!handlers) return
    handlers.forEach(handler => {
      handler.eventCallback.apply(handler.thisArg, payload)
    })
  }
}

const eventBus = new HYEventBus()

// main.js
eventBus.on("abc", function() { 
// 一般不要把回调写成箭头函数，因为后面可能要绑定this
  console.log("监听abc1", this)
}, {name: "why"})

const handleCallback = function() {
  console.log("监听abc2", this)
}
eventBus.on("abc", handleCallback, {name: "why"})

// utils.js
eventBus.emit("abc", 123)

// 移除监听
eventBus.off("abc", handleCallback)
eventBus.emit("abc", 123)


// 可以自己写once，clear，以及考虑eventName、eventCallback的类型进行判断