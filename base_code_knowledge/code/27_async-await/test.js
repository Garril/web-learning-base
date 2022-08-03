let a = new Promise((resolve,reject) => {
  resolve(1);
})
let b = new Promise((resolve,reject) => {
  resolve(2);
})
async function fun() {
  return await Promise.all([a,b]);
}
// Promise.all([a,b]) 返回一个promise实例

// fun().then(res=>{
//   console.log(res);
// })

// 奇怪的需求： 把all的结果不再then中处理
async function foo() {
  const c = await fun();
  console.log(c);
}
foo();
