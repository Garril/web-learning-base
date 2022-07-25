const promise = new Promise((resolve, reject) => {
  // reject("111111")
  resolve('aaa');
})

promise.then(res => {
  console.log("res1: ",res);
  // return new Promise( (resolve,reject) => {
  //   reject("bbb");
  // })
}).then(res => {
  console.log("res2: ",res);
  throw new Error("then error message")
}).catch(err => {
  console.log("err:", err);
})
/* 
res1:  aaa
res2:  undefined
err: Error: then error message
    at D:\Front end\JS高级课件\课堂\code\25_Promise的使用\test3.js:13:9
*/