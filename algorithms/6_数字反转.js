/* 
给出一个 32 位的有符号!!!整数!!!，你需要将这个整数中每位上的数字进行反转。

示例 1:
  输入: 123
  输出: 321

示例 2:
  输入: -123
  输出: -321

示例 3:
  输入: 120
  输出: 21

*/
function reverse (num) {
  let res = 0;
  while(num !== 0) {
    res = res * 10 +  num % 10;
    num = (num / 10) | 0;
  }
  return (res | 0) == res ? res : 0;
  // return res; 
  // --- 题目要求整数
  // 如果是浮点类型的数，单纯的res，return原值，没有做处理
  // 但是这里处理后，浮点类型均返回0作为结果
}

function reverse1(num) {
  let sign = true;
  if((num | 0) !== num) {
    num = 0;
  };
  if(num < 0) {
    sign = false;
    num = (-num);
  }
  let str = String(num);
  let res = Number(str.split('').reverse().join(''))
  return sign? res : (-res);
}

console.log(reverse(1203));
console.log(reverse(120));
console.log(reverse(-346));
console.log(reverse(1));
console.log(reverse(-2));
console.log(reverse(0));
console.log(reverse(0.2));
console.log(reverse(1.2));
console.log(reverse(-1.2));

console.log("================================")

console.log(reverse1(1203));
console.log(reverse1(120));
console.log(reverse1(-346));
console.log(reverse1(1));
console.log(reverse1(-2));
console.log(reverse1(0));
console.log(reverse1(0.2));
console.log(reverse1(1.2));
console.log(reverse1(-1.2));