promise.then(res => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(111111)
    }, 3000)
  })
}).then(res => {
  console.log("res:", res)
})
/*
then里面不管return 出什么东西，把他设为整体 xxx
都认为 用 promise做了一层包裹，暂时叫做 WrapPromise
*/
/*
比如上面：
情况一： promise
  then里面return了一个 new promise，这个promise在3s后resolve（11111）
  但是他没有自己的then/catch，也就相当于：
  WrapPromise就是( (resolve,reject) => { promise })
  return WrapPromise;
  结合resolve_Summarize.js文件可以知道，WrapPromise的状态
  由promise决定，因为第四行是resolve，所以可以知道
  return WrapPromise，到最外层去调用的是：then
*/


promise.then(res => {
  return "aaaaaa"
}).then(res => {
  console.log("res:", res)
  return "bbbbbb"
})
/* 
情况二：一个普通值(数值/字符串/普通对象/undefined)
这个普通的值被作为一个新的Promise的resolve值
*/


promise.then(res => {
  return {
    then: function(resolve, reject) {
      resolve(222222)
    }
  }
}).then(res => {
  console.log("res:", res) // 2222222
},err => {
  console.log(err);
})
/* 
情况三：返回的是一个对象, 并且该对象实现了thenable
相当于 
return new promise(（resolve,reject）=> { resolve(obj)})，
obj实现了thenable。
自动调用then方法，obj的then里面通过resolve/reject决定promise的状态
*/

