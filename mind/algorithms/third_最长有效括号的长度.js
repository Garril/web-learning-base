/* 
  寻找最长有效括号的长度：
    给定一个只包含 ‘(’ 和 ‘)’ 的字符串，找出最长的包含有效括号的子串的长度。
    ---【栈】【动态规划】【左右括号计数】
  输入: “()(())”
  输出: 4

  具体做法是我们始终保持栈底元素为当前已经遍历过的元素中「最后一个没有被匹配的右括号的下标」，
  这样的做法主要是考虑了边界条件的处理，栈里其他元素维护左括号的下标：
    1.对于遇到的每个‘(’ ，我们将它的下标放入栈中
    2.对于遇到的每个‘)’ ，我们先弹出栈顶元素表示匹配了当前右括号：
        如果栈为空，说明当前的右括号为没有被匹配的右括号，
        我们将其下标放入栈中来更新我们之前提到的「最后一个没有被匹配的右括号的下标」
        
        如果栈不为空，
        当前右括号的下标减去栈顶元素即为「以该右括号为结尾的最长有效括号的长度」

  时间复杂度：O(n)
  空间复杂度：O(n)
*/
// 法一： 栈
function getMaxLen(str) {
  let arr = [];
  let maxLen = 0;
  arr.push(-1);
  function deal(str) {
    // str格式处理
    if(str.length <= 0 || typeof(str) != "string") return 0;
    // for
    for(let i = 0; i < str.length; i++) {
      if(str[i] == '(') {
        arr.push(i);
      } else {
        const left = arr.pop();
        if(arr.length > 0) {
          maxLen = Math.max(maxLen, i - arr[arr.length-1]);
        } else {
          arr.push(i);
        }
      }
    }
    return maxLen;
  }
  return deal(str)
}
let len = getMaxLen("()(())");
let len1 = getMaxLen("(()");
let len2 = getMaxLen(")()())");
console.log(len);
console.log(len1);
console.log(len2);