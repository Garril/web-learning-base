// 创建多个Promise
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    // resolve(11111)
    reject(1111)
  }, 1000);
})

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(22222)
  }, 500);
})

const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    // resolve(33333)
    reject(3333)
  }, 3000);
})

// any方法
// 相当于是 race，但是不会直接就被reject结束掉，而会至少等一个resolve结果。
Promise.any([p1, p2, p3]).then(res => {
  console.log("res:", res)
}).catch(err => {
  // 只有等到所有的，都拒绝，才执行这里的catch
  console.log("err:", err.errors)// 自动生成一个AggregateError类，有一个errors属性
  // 可以拿到含所有 err的数组
})

