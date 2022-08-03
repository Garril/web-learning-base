const promise = new Promise((resolve, reject) => {
  resolve("hahaha")
})

promise.then(res => {
  console.log("res0: ",res);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(111111);
    }, 3000)
  }).then(res => {
    console.log("res1: ",res);
  });

  // 这里的return理解：
  // 最外层包裹了一层的 WrapPromise，然后resolve传入的是 (调用了then的newPromise)
  // newPromise在3s后resolve，调用了then，输出res 1111111，然后，默认返回了一个 LastPromise
  // 使得 实践上就是返回 WrapPromise( (resolve,reject) => { LastPromise })，Wrap状态由Last决定
  // 而这个 LastPromise 由于newPromise没有返回值，默认调用的是resolve(undefined),
  // 又因为 LastPromise 没有调用then/catch, 所以他resolve(undefined)，
  // 最外层的WrapPromise也调用了then(undefined);
}).then(res => {
  console.log("res2: ", res);
},err => {
  console.log(err);
})