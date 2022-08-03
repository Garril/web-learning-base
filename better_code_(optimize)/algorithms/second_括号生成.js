/* 
  自己生成括号。数字 n 代表生成括号的对数，
  请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。
  输入：
   n = 3
  输出：[
     “((()))”,
     “(()())”,
     “(())()”,
     “()(())”,
     “()()()”
    ] 
  ----【回溯】 + 【左右括号计数】
*/
n = 3;
let res = [];
function dfs(left,right,curStr) {
  if(left == 0 && right == 0) {
    res.push(curStr);
    return;
  }
  if(left > 0) {
    dfs(left-1,right,curStr + "("); // 表示(头的。。。
  }
  if(right > left) { // 顺序执行，第一层dfs不可能执行这个
     // 去保证：只有在right>left的时候才加右括号 ---- 左括号永远大于等于右括号
    dfs(left,right - 1,curStr + ")");
  }
}

dfs(n,n,"")
console.log(res)