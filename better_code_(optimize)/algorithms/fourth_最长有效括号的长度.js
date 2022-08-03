/* 
  寻找最长有效括号的长度：
    给定一个只包含 ‘(’ 和 ‘)’ 的字符串，找出最长的包含有效括号的子串的长度。
    ---【栈】【动态规划】【左右括号计数】
  输入: “()(())”
  输出: 4

  dp[i]代表当前从i开始，自右向左能匹配到的最长有效括号。
  
  所以当s[i]为左括号时，dp[i]一定为0。
  当s[i]为右括号时，dp[i]应该找到与它相匹配的左括号，
  即判断 s[i-dp[i-1]-1] 是否为左括号。

  若 s[i-dp[i-1]-1] 是左括号，则 dp[i] = dp[i-1] + 2 + dp[i-dp[i-1]-2] ，
  2代表dp[i]和它对应的左括号，dp[i-1]代表dp[i]和对应左括号中间的有效括号长度，
  dp[i-dp[i-1]-2]代表左括号前的有效括号长度。
  
  时间复杂度：O(n)
  空间复杂度：O(n)
*/
// 法二： 动态规划 (不懂，暂时pass)
var action_plan = function(s) {
  var dp = new Array(s.length+1).fill(0);
  var maxLen = 0;
  for(let i=1; i<=s.length; i++){
      if(s[i-1] == ')' && s[i-dp[i-1]-2]=='('){
          dp[i] = dp[i-1] + 2 + dp[i-dp[i-1]-2];
          maxLen = Math.max(maxLen, dp[i]);
      }
  }
  return maxLen;
};
let len = action_plan("()(())");
let len1 = action_plan("(()");
let len2 = action_plan(")()())");
console.log(len);
console.log(len1);
console.log(len2);

// 法三：双指针
/* 
  时间复杂度：O(n)
  空间复杂度：O(1)
  自左向右遍历，记录左右括号个数。
    当 !!! 右括号个数比左括号个数多 !!! 时，重新开始计数。
    当左右括号个数相同时，视为有效括号，与maxLen进行比较
  自右向左遍历，记录左右括号个数。
    当 !!! 左括号个数比右括号个数多 !!! 时，重新开始计数。
    当左右括号个数相同时，视为有效括号，与maxLen进行比较
*/

var double_point = function(s){
  var left = 0, right = 0;
  var maxLen = 0;
  // 自左向右遍历  --- 可以解决()(())、)()())的情况
  for(let i = 0; i < s.length; i++){
      if(s[i] == '('){
          left++;
      }else{
          if(left > right){
              right++;
              if(left == right) maxLen = Math.max(maxLen, right*2);
          }else{
              left = right = 0;
          }
      }
  }
  left = right = 0;
  //自右向左遍历 --- 可以解决(()的情况
  for(let i = s.length-1; i >= 0; i--){
      if(s[i] == '('){
          if(right > left){
              left++;
              if(left == right)   maxLen = Math.max(maxLen, left*2);
          }else{
              left = right = 0;
          }
      }else{
          right++;
      }
  }

  return maxLen
}
let len3 = double_point("()(())");
let len4 = double_point("(()");
let len5 = double_point(")()())");
console.log(len3);
console.log(len4);
console.log(len5);