//  ========   过程抽象  ==========
// 让只执行一次的需求，覆盖到不同的事件处理，
// 将这个需求剥离出来，这个过程就是过程抽象

/* 
  下面代码出现问题：
    当你狂点完成，打勾，会报错。
    Uncaught DOMException: Failed to execute 'removeChild' on 'Node': The node to be removed is not a child of this node.
  可以看出每次点击，触发click事件，就会在2s后把节点remove掉
  多次点击多次remove，就会发现找不到节点

  const list = document.querySelector('ul');
  const buttons = list.querySelectorAll('button');
  buttons.forEach((button) => {
    button.addEventListener('click', (evt) => {
      const target = evt.target;
      target.parentNode.className = 'completed';
      setTimeout(() => {
        list.removeChild(target.parentNode);
      }, 2000);
    });
  });

  -------------------------------------------------
  DOM提供给我们的解决思路：addEventListener加一个参数：
  { once: true } -- 只执行一次

  const list = document.querySelector('ul');
  const buttons = list.querySelectorAll('button');
  buttons.forEach((button) => {
    button.addEventListener('click', (evt) => {
      const target = evt.target;
      target.parentNode.className = 'completed';
      setTimeout(() => {
        list.removeChild(target.parentNode);
      }, 2000);
    }, {once : true} );
  });
  -------------------------------------------------
  但是如果不是 addEventListener，而是 发送网络请求，我们要只执行一次
  我们封装一个叫做 once 的高阶函数
  如下：
*/
function once(fn) {
  return function(...args) {
    /* 
      click执行的为return的函数
      return的函数在第一次执行中把fn置为null
      后续if，过不去
    */
    if(fn) {
      const ret = fn.apply(this, args);
      fn = null;
      return ret;
    }
  }
}

const list = document.querySelector('ul');
const buttons = list.querySelectorAll('button');
buttons.forEach((button) => {
  button.addEventListener('click', once((evt) => {
    const target = evt.target;
    target.parentNode.className = 'completed';
    setTimeout(() => {
      list.removeChild(target.parentNode);
    }, 2000);
  }));
});

const foo = once(() => {
  console.log('bar');
});
// 3次调用，输出一次
foo();
foo();
foo();