// 如何监听页面停止滚动事件？
// 法一：clearTimeout
document.onscroll = (e) => {
  clearTimeout(window.scrollEndTimer);
  window.scrollEndTimer = setTimeout(() => {
    console.log("页面滚动结束");
  }, 100);
};
// 法二： scroll end
document.onscrollend = (e) => {
  Toast("scroll end");
};
// or
document.addEventListener("scrollend", (e) => {
  // scroll end
});
// 法三：npm i -D scrollyfills
import { scrollend } from "scrollyfills";
document.addEventListener("scrollend", (e) => {
  console.log("页面滚动结束");
});
/**
 * 以scrollend为基础的实现，在下面的情况会被触发：
 *   1、用户的触摸/用户的按键 已被释放
 *   2、用户的指针已释放滚动条
 *   3、滚动到的片段已经完成
 *   4、滚动捕捉已完成
 *   5、scrollTo()已完成
 *   6、用户已滚动视觉视口
 */