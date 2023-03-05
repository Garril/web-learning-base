/* 洋葱模型 -- 模拟实现 */
// 定义
const middleware = [];
function use(arr) {
  arr.forEach((mw) => {
    middleware.push(mw);
  });
}
let fn = function (ctx) {
  function dispatch(index) {
    let curMw = middleware[index];
    if (!curMw) return;
    return curMw(ctx, dispatch.bind(null, index + 1));
  }
  return dispatch(0);
};
// 调用
let mw1 = async function (ctx, next) {
  console.log("next前, 第一个中间件");
  await next();
  console.log("next后, 第一个中间件");
};
let mw2 = async function (ctx, next) {
  console.log("next前, 第二个中间件");
  await next();
  console.log("next前, 第二个中间件");
};
let mw3 = async function (ctx, next) {
  console.log("第三个中间件，无next");
};
use([mw1, mw2, mw3]);
fn();
