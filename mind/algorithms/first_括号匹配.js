/* 
  有效字符串需满足：
   左括号必须用相同类型的右括号闭合。 左括号必须以正确的顺序闭合。 
  注意空字符串可被认为是有效字符串
  ---- 栈，map
*/
function isValid( s ) {
  if(s.length % 2) return false;
  const map = new Map();
  map.set('}','{');
  map.set(')','(');
  map.set(']','[');
  const stack = [];

  for(let i = 0; i<s.length; i++ ){
    curChar = s[i];
    for(let [key,value] of map ) {
      if(curChar == key) {
        if(stack.length != 0) {
          outChar = stack.pop();
          if(outChar != map.get(curChar)) return false;
        } else {
          return false;
        }
      } else if (curChar == value) {
        stack.push(curChar);
      }
    }
  }
  return stack.length == 0;
}
s = "(())_"
s1 = "()(){}[]"
console.log(isValid(s)) // false
console.log(isValid(s1)) // true