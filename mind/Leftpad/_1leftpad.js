// 将字符串str，补充到len的长度，补充字符用ch
// 原版
function leftpad(str,len,ch) {
  str = String(str);
  var i = -1;
  if(!ch && ch !== 0) ch = ' ';
  len = len - str.length;
  while(++i < len) {
    str = ch + str; // 首部补齐
  }
  return str;
}
let str = 'asdb';
let len = 10;
let ch = 'g'
console.log(leftpad(str,len,ch)); // ggggggasdb

console.log(leftpad('12',5,'0')); // 00012