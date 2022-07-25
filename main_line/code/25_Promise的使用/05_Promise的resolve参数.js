/**
 * resolve(参数)
 *  1> 普通的值或者对象  pending -> fulfilled
 *  2> 传入一个Promise
 *    那么当前的Promise的状态会由传入的Promise来决定
 *    相当于状态进行了移交
 *  3> 传入一个对象, 并且这个对象有实现then方法(并且这个对象是实现了thenable接口)
 *    那么也会执行该then方法, 并且由该then方法决定后续状态
 */

// 1.传入Promise的特殊情况
// const newPromise = new Promise((resolve, reject) => {
//   // resolve("aaaaaa")
//   reject("err message")
// })

// new Promise((resolve, reject) => {
//   // pending -> fulfilled
//   resolve(newPromise)
// }).then(res => {
//   console.log("res:", res)
// }, err => {
//   console.log("err:", err)
// })

// 第一种情况，这种把 newPromise通过resolve/reject传出的，！！！如果这个 newPromise,也写了then和catch！！！
// 看test.js
// 那么，比方说 promise,resolve(newPromise):
// 在newPromise里面，不过他是 resolve还是reject，会去执行自己对应的then/catch，
// 而不会对promise的状态做任何的影响，promise只看自己是调的resolve还是reject


// 这里反而相反：resolve中的newPromise，resolve/reject了，但是没有实现对应的then/catch，
// newPromise无视了promise原先的fulfilled/reject状态，
// 他自己决定resolve/reject，影响了也决定了，promise的then/catch
// 并且他还把自己reject(xxx)中的xxx，作为结果传入,作为：promise的catch中的err


// 2.传入一个对象, 这个对象有then方法

const obj1 = {
  then: function(resolve, reject) {
    // 对象里面有then方法，这个 then会自动执行，resolve和reject是自动传入的
    // 在这个then里面, 通过调用resolve/reject来决定promise的状态
    // resolve("resolve message")
    reject("reject message")
  }
}
new Promise((resolve, reject) => {
  // pending -> fulfilled
  const obj = {
    then: function(resolve, reject) {
      // 对象里面有then方法，这个 then会自动执行，resolve和reject是自动传入的
      // 在这个then里面, 通过调用resolve/reject来决定promise的状态
      // resolve("resolve message")
      reject("reject message")
    }
  }
  // obj1/obj 效果一样
  // resolve(obj1)
  resolve(obj);
  // reject 效果不一样了，err: { then: [Function: then] }
  // reject就直接把整个对象都 抛出去了，没有去让obj的then里面决定 promise的状态
  // 测试搭配， obj的then里resolve，这里reject
  // reject(obj);
}).then(res => {
  console.log("res:", res)
}, err => {
  console.log("err:", err)
})

// eatable/runable
const obj = {
  eat: function() {

  },
  run: function() {

  }
}
