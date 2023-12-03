/* 
我们经常会遇到这样的需求，在循环中使用异步请求，而 ES6 的 async/await 是我们让异步编程更简单的利剑 。

总结了 5 种在循环中使用 async/await 的方法：
  打勾的方法 ✔：表示在循环中每个异步请求是按照次序来执行的，我们简称为 “串行”
  打叉的方法 ❌ ：表示只借助循环执行所有异步请求，不保证次序，我们简称为 “并行”
*/
// 三、reduce ✔
function testPromise(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`Processing ${time}`);
      resolve(time);
    }, time);
  });
}

let result = [3000, 2000, 1000, 4000].reduce((accumulatorPromise, nextID) => {
  return accumulatorPromise.then((time) => {
    console.log("time: ",time);
    return testPromise(nextID);
  });
}, Promise.resolve());

result.then((e) => {
  console.log("All Promises Resolved !!✨");
});
//我们可以使用 reduce 函数来遍历数组并按顺序 resolve promise。
/* 
  time:  undefined
  Processing 3000
  time:  3000
  Processing 2000
  time:  2000
  Processing 1000
  time:  1000
  Processing 4000
  All Promises Resolved !!✨
*/
