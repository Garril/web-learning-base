const weakSet = new WeakSet()

// 1.区别一: 只能存放对象类型
// TypeError: Invalid value used in weak set
// weakSet.add(10)

// 强引用和弱引用的概念(看图)

// 2.区别二: 对对象是一个弱引用
let obj = { 
  name: "why",
  friend: {
    name:"hhh"
  }
}

// weakSet.add(obj)

const set = new Set()
// 建立的是强引用
set.add(obj)

// 建立的是弱引用
weakSet.add(obj)
/* 
Set(1) { { name: 'why' } }
WeakSet { <items unknown> }
*/

// 3.WeakSet的应用场景
// *** 可以预防 类方法的 被 “偷用”
const personSet = new WeakSet()
class Person {
  constructor() {
    personSet.add(this)
  }

  running() {
    if (!personSet.has(this)) {
      throw new Error("不能通过非构造方法创建出来的对象调用running方法")
    }
    console.log("running~", this)
  }
}

let p = new Person()
// 如果是一个Person类，那么 .call 调用没有什么问题
// p.running() // 这样就行得通，结果：  running~ Person {}
// p = null

// p.running.call({name: "why"}) // 报错 --- 不能通过非构造方法创建出来的对象调用running方法
