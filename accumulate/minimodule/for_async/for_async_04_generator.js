/* 
我们经常会遇到这样的需求，在循环中使用异步请求，而 ES6 的 async/await 是我们让异步编程更简单的利剑 。

总结了 5 种在循环中使用 async/await 的方法：
  打勾的方法 ✔：表示在循环中每个异步请求是按照次序来执行的，我们简称为 “串行”
  打叉的方法 ❌ ：表示只借助循环执行所有异步请求，不保证次序，我们简称为 “并行”
*/

// 四：generator ✔
// 其实用 async generator 也是可以的
async function* readFiles(files) {
  for (const file of files) {
    yield await readFile(file);
  }
}
async function* generateSequence(items) {
  for (const i of items) {
    await new Promise((resolve) => {
      console.log("inner: ", i);
      setTimeout(resolve, i);
    });
    console.log("there__1: ", i);
    yield i;
    console.log("there__2: ", i);
  }
}

(async () => {
  let generator = generateSequence(["3000", "6000", "1000", "4000"]);
  for await (let value of generator) {
    // 这里才开始执行
    console.log(value);
  }
})();
/* 
  inner:  3000
  there__1:  3000
  3000
  there__2:  3000
  inner:  6000
  there__1:  6000
  6000
  there__2:  6000
  inner:  1000
  there__1:  1000
  1000
  there__2:  1000
  inner:  4000
  there__1:  4000
  4000
  there__2:  4000
*/
