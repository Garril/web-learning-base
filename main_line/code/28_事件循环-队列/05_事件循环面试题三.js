Promise.resolve().then(() => {
  console.log(0);
  // 1.直接return一个值 相当于resolve(4)
  // return 4

  // 2.return thenable的值
  return {
    then: function(resolve) {
      // 业务使用场景： 大量的计算
      // 推迟了一次，让后面的微任务内顺利执行 
      // ps: 正常使用不会后面那么多then
      resolve(4)
    }
  }
  // 本来是直接帮你执行then函数，相当于直接resolve(4)
  // 但是这里，会把return的对象的then不自动执行，而是加到微任务队列

  // 3.return Promise
  // 不是普通的值, 多加一次微任务
  // Promise.resolve(4), 多加一次微任务
  // 一共多加两次微任务
  return Promise.resolve(4)
  // 这里怎么理解呢？
  /* Promise.resolve(4) => 相当于
  Promise.resolve( (resolve,reject) => {
    resolve(4);
  })
  内部是一个resolve(4)的promise
  那么，第一次（也就是return的时候），相当于
  把 最外层的promise.then，放到了微任务队列里
  这个then执行时，的res就是，刚刚说的，内部resolve(4)的promise
  这个promise同样，他被执行时，因为resolve(4)
  会把他的then 第二次的 放入到微任务队列里面，所以，一共两次
  这个then里面的res，就是从最外层传到内层promise，内层promise，resolve的4
  */
}).then((res) => {
  console.log(res)
})

Promise.resolve().then(() => {
  console.log(1);
}).then(() => {
  console.log(2);
}).then(() => {
  console.log(3);
}).then(() => {
  console.log(5);
}).then(() =>{
  console.log(6);
})

// 1.return 4
// 0
// 1
// 4
// 2
// 3
// 5
// 6

// 2.return thenable
// 0
// 1
// 2
// 4
// 3
// 5
// 6

// 3.return promise
// 0
// 1
// 2
// 3
// 4
// 5
// 6
