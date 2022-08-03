// request.js
function requestData(url,) {
  // 异步请求的代码会被放入到executor中
  return new Promise((resolve, reject) => {
    // 模拟网络请求
    setTimeout(() => {
      // 拿到请求的结果
      // url传入的是coderwhy, 请求成功
      if (url === "coderwhy") {
        // 成功
        let names = ["abc", "cba", "nba"]
        resolve(names)
      } else { // 否则请求失败
        // 失败
        let errMessage = "请求失败, url错误"
        reject(errMessage)
      }
    }, 2000);
  })
}

// main.js
const promise = requestData("coderwhy")
// 法一：
promise.then((res) => {
  console.log("请求成功:", res)
}, (err) => {
  console.log("请求失败:", err)
})
/* 法二：
promise.then((res) => {
  console.log("请求成功:", res)
}).catch((err) => {
  console.log("请求失败:", err)
}) */

// node 里面 promise.then( ()=>{.... } ).catch(()=>{....}) 没问题
// 但是 分割成  promise.then 和 promise.catch就报错
// 另外的写法如上，直接给then传两个回调