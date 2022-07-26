// 命令式：
let list = [1, 2, 3, 4];
let mapl = [];
for(let i = 0; i < list.length; i++) {
  mapl.push(list[i] * 2);
}
//声明式：
let list = [1, 2, 3, 4];
const double = x => x * 2;
list.map(double);
// ====================================
// 题目：一个按钮，两个状态，切换on和off
// 命令式
switcher.onclick = function(evt){
  if(evt.target.className === 'on'){
    evt.target.className = 'off';
  }else{
    evt.target.className = 'on';
  }
}
//声明式：
// 思路：同步操作化为函数，传入高阶函数
function toggle(...actions){
  return function(...args){
    let action = actions.shift();
    actions.push(action);
    return action.apply(this, args);
  }
}
switcher.onclick = toggle(
  evt => evt.target.className = 'off',
  evt => evt.target.className = 'on'
);
// 如果有一个新的状态，命令式就加if else
// 声明式如下：---- 加一行
switcher.onclick = toggle(
  evt => evt.target.className = 'warn',
  evt => evt.target.className = 'off',
  evt => evt.target.className = 'on'
);