/* 
  消除异步的传染性（见仁见智。。。。）
  Eliminate asynchronous infection

  核心点：远程请求需要时间，直接抛出错误，函数结束（同步跑）
  =》 拿到请求结果的时候，函数早就运行结束，我们把结果缓存一下
  重新跑函数，这时函数可以直接拿缓存数据，运行，结束。
*/
function getRequset() {
  return fetch("https://baidu.com");
}
function work1() {
  console.log("work1");
  return getRequset();
}
function work2() {
  console.log("work2");
  // .....
  return work1();
}

function main() {
  const data = work2();
  console.log(data);
}
run(main);

function run(func) {
  func();
}
/* 上面为案例代码 ，我们可以知道异步的传递性，如何在run中处理main函数，消除异步 */
function run2(func) {
  let cache = [];
  let i = 0;
  const _originFetch = window.fetch;
  window.fetch = (...args) => {
    if (cache[i]) {
      if (cache[i].status === "fulfilled") {
        return cache[i].data;
      } else if (cache[i].status === "rejected") {
        throw cache[i].err;
      }
    }
    const result = {
      status: "pending",
      data: null,
      err: null,
    };
    cache[i++] = result;
    // 发送请求
    const promise = _originFetch(...args)
      .then((resp) => resp.json())
      .then(
        (res) => {
          result.status = "fulfilled";
          result.data = res;
        },
        (err) => {
          result.status = "rejected";
          result.err = err;
        }
      );
    // 报错
    throw promise
  };
  try {
    func();
  } catch (err) {
    // 什么时候重新执行
    if (err instanceof Promise) {
      const reRun = () => {
        i = 0;
        func();
      }
      err.then(reRun, reRun)
    }
  }
}
run2(main);
