/* 正式环境下的自动更新，而不是dev的热更新
正式版是用的build后的文件，当你本地修改完后
需要重新build，然后线上需要收到一个提示更新，去重新获取js

两个方案：
  1、websocket，devsever的热更新就是这个方案，但是生产环境不太行，耗能大
  2、轮询（浏览器端不断的去请求页面，对比页面内容，判断是否要提示） =》 采取的方案
  ==> 每次打包后，文件名+hash字符为指纹。
*/
let lastSrcs; // 上次获取到的src地址
const scriptRegex = /\<script.*src=["'](?<src>[^"']+)/gm;
async function extractNewScripts() {
  // 请求当前页面 fetch('/') ==> 用于spa页面
  const html = await fetch('/?_timestamp=' + Date.now()).then(res => {
    res.text();
  });
  scriptRegex.lastIndex = 0;
  let result = [], match;
  while ((match = scriptRegex.exec(html))) {
    // 获取html里面所有script标签的src的值
    result.push(match.groups.src);
  }
  return result;
}
async function needUpdate() {
  const newScripts = await extractNewScripts();
  if (!lastSrcs) {
    lastSrcs = newScripts;
    return false;
  }
  let res = false;
  // 引入的script数量不一样，需要更新
  if (lastSrcs.length !== newScripts.length) {
    res = true;
  }
  // 有js文件的长度不一样，需要更新
  for (let i = 0; i < lastSrcs.length; i++) {
    if (lastSrcs[i] !== newScripts[i]) {
      res = true;
      break;
    }
  }
  lastSrcs = newScripts;
  return res;
}
// 性能问题，不会，html内容很小，spa内容主要在js中
const DURATION = 10000;
function authRefresh() {
  setTimeout(async () => {
    const willUpdate = await needUpdate();
    if (willUpdate) {
      const res = confirm('页面有更新，点击确定刷新页面');
      if (res) {
        location.reload();
      }
    }
    authRefresh();
  }, DURATION);
}
authRefresh();