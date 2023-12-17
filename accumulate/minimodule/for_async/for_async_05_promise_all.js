/* 
我们经常会遇到这样的需求，在循环中使用异步请求，而 ES6 的 async/await 是我们让异步编程更简单的利剑 。

总结了 5 种在循环中使用 async/await 的方法：
  打勾的方法 ✔：表示在循环中每个异步请求是按照次序来执行的，我们简称为 “串行”
  打叉的方法 ❌ ：表示只借助循环执行所有异步请求，不保证次序，我们简称为 “并行”
*/

// 五：Promise.all ❌
// 如果你不用考虑异步请求的执行顺序，你可以选择 Promise.all()，
// 即 Promise.all() 可以达到 并行 的目的。它也能保证你的请求都被执行过。
async function printFiles() {
  let fileNames = ["picard", "kirk", "geordy", "ryker", "worf"];
  await Promise.all(
    fileNames.map(async (file) => {
      const contents = await fs.readFile(file, "utf8");
      console.log(contents);
    })
  );
}

async function promiseAll(arr) {
  await Promise.all(
    arr.map(async (i) => {
      await sleep(i);
      console.log("--->", i);
    })
  );
}

function sleep(i) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, i);
  });
}

promiseAll(["3000", "8000", "1000", "4000"]);
/* 
  ---> 1000
  ---> 3000
  ---> 4000
  ---> 8000
*/