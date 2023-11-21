/* 
我们经常会遇到这样的需求，在循环中使用异步请求，而 ES6 的 async/await 是我们让异步编程更简单的利剑 。

总结了 5 种在循环中使用 async/await 的方法：
  打勾的方法 ✔：表示在循环中每个异步请求是按照次序来执行的，我们简称为 “串行”
  打叉的方法 ❌ ：表示只借助循环执行所有异步请求，不保证次序，我们简称为 “并行”
*/

// 一： forEach ❌ --- 本质上 forEach 就是一个 for 循环的包装。
Array.prototype.forEach = function (callback) {
  for (let index = 0; index < this.length; index++) {
    callback(this[index], index, this);
  }
};
// 在回调函数内部调用 await 需要这个回调函数本身也是 async 函数，
// 所以在【循环 + async/await】中的代码应这样写：
async function someFunction(items) {
  items.forEach(async (i) => {
    const res = await someAPICall(i);
    console.log("--->", res);
  });
}

function someAPICall(param) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Resolved " + param);
    }, param);
  });
}

someFunction(["3000", "5000", "1000", "4000"]);
/* 
---> Resolved 1000
---> Resolved 3000
---> Resolved 4000
---> Resolved 5000

forEach 并没有串行输出结果。
forEach 只是把所有请求执行了，谓之并行。
*/