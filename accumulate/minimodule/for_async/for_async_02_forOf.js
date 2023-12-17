/* 
我们经常会遇到这样的需求，在循环中使用异步请求，而 ES6 的 async/await 是我们让异步编程更简单的利剑 。

总结了 5 种在循环中使用 async/await 的方法：
  打勾的方法 ✔：表示在循环中每个异步请求是按照次序来执行的，我们简称为 “串行”
  打叉的方法 ❌ ：表示只借助循环执行所有异步请求，不保证次序，我们简称为 “并行”
*/

// 二：for...of... ✔
// 事实上 for...of 却符合我们串行的要求。
async function printFiles() {
  let fileNames = ["picard", "kirk", "geordy", "ryker", "worf"];
  for (const file of fileNames) {
    const contents = await fs.readFile(file, "utf8");
    console.log(contents);
  }
}

function someAPICall(param) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Resolved " + param);
    }, param);
  });
}

async function someFunction(items) {
  for (const i of items) {
    const res = await someAPICall(i);
    console.log("--->", res);
  }
}
someFunction(["3000", "5000", "1000", "4000"]);
/* 
---> Resolved 3000
---> Resolved 5000
---> Resolved 1000
---> Resolved 4000
*/