function leftpad(str, len, ch) {
  str = "" + str;
  const padLen = len - str.length;
  if(padLen <= 0) {
    return str;
  }
  return (""+ch).repeat(padLen) + str; // repeat--二次幂,更优解
  // 具体代码看图repeat.jpg
  /* 更优： 
    比如 leftpad('12',5,'0')，如果是_1leftpad.js，while要3次
    如果是_2leftpad.js，他的while中（从左到右，从上到下看）
          5 ---二进制--- 101  --- result = 0；string = 00；
    右移  2 ---二进制--- 10   --- result = 0； string = 0000;
    右移  1 ---二进制--- 1    --- result = 00000;
  
    时间复杂度 O（log2 n）
  */
}

console.log(leftpad('asdb',10,'g')); // ggggggasdb

console.log(leftpad('12',5,'0')); // 00012

let num = 4;
console.log(num >>= 1); // 2 --- 右移，指：数 相对 小数点 右移，除以2
console.log(num); // 2
console.log(num <<= 1); // 4