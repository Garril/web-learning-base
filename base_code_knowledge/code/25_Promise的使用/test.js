/**
 * resolve(参数)
 *  1> 普通的值或者对象  pending -> fulfilled
 *  2> 传入一个Promise
 *    那么当前的Promise的状态会由传入的Promise来决定
 *    相当于状态进行了移交
 *  3> 传入一个对象, 并且这个对象有实现then方法(并且这个对象是实现了thenable接口)
 *    那么也会执行该then方法, 并且又该then方法决定后续状态
 */



// 1.传入Promise的特殊情况
const newPromise = new Promise((resolve, reject) => {
  resolve("aaaaaa")
  // reject("err message1")
  // resolve(100);
}).then(res =>{
  console.log(res);
},err => {
  console.log(err)
})
// 只要newPromise加了then/catch，不管是 reject还是resolve,参数都传不到下面的promise
// 下面的promise，状态不变，还是resolve

new Promise((resolve, reject) => {
  // pending -> fulfilled
  resolve(newPromise)
  // reject(newPromise)
}).then(res => {
  // 会帮你把 类型正确传过来
  console.log("res:", res," ",typeof(res));
}, err => {
  console.log("err:", err," ",typeof(err));
})
/*
aaaaaa
res: undefined   undefined
*/

const newPromise1 = new Promise((resolve, reject) => {
  // resolve("aaaaaa")
  reject("err message111")
})

new Promise((resolve, reject) => {
  // pending -> fulfilled
  resolve(newPromise1)
}).then(res => {
  console.log("========")
  console.log("res111:", res)
}, err => {
  console.log("========")
  console.log("err111:", err)
})
/* 
========
err111: err message111
*/