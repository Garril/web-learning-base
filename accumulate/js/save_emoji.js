const str = '👿👿👿';
console.log(str.length); // 6
console.log(str[0]); // '�'
console.log(str.slice(1, 3)); // ' ��'

/* 
  a-> 97、b-> 98，文字和emoji表情也有对应
  js采用utf-16编码，一个字符对应的内存空间为16为2进制，2字节
  2**16 = 65535，16进制表示为四位： 0000~ffff
  若存不下，就分为两个16位，32位去保存

  每个16位都叫做码元Code Unit，一个文字/数字叫做码点Code Point
  一个码点可能对应n个码元（n=1/n=2）

  str.length 表示获取码元的数量，而不是码点的数量。
  因为一个小恶魔，占两个码元，所以为 2*3 = 6；而不是3

  注意，有特殊情况：
  把str中的小恶魔变为爱心，❤️
  这个字符很奇怪，也是占两个码元，
  但是它的第一个码元是10084，第二个是65039，
  两个都没超过65535，
  在循环判断的时候就把它当作两个码点了，
  这种只能特殊处理了。
*/
String.prototype.pointLength = function () {
  let len = 0;
  for (let i = 0; i < this.length;) {
    const codePoint = this.codePointAt(i); // 在i位置的码点占多少个码元
    i += (codePoint > 0xffff ? 2 : 1); // 2**16/65535/0xffff
    len++;
  }
  return len;
}
const str1 = '👿1👿';
const str2 = '123';
console.log(str1.pointLength()); // 3
console.log(str2.pointLength()); // 3

// 获取index位置的字符
String.prototype.pointAt = function (index) {
  let curIndex = 0;
  for (let i = 0; i < this.length;) {
    const codePoint = this.codePointAt(i); // 在i位置的码点占多少个码元
    if (curIndex === index) {
      return String.fromCodePoint(codePoint);
    }
    i += (codePoint > 0xffff ? 2 : 1); // 2**16/65535/0xffff
    curIndex++;
  }
}
console.log(str1.pointAt(2)); //👿
console.log(str2.pointAt(2)); // 3

// slice
String.prototype.sliceByPoint = function (start = 0, end = this.pointLength()) {
  let res = '';
  for (let i = start; i < end; i++) {
    res += this.pointAt(i);
  }
  return res;
}
console.log(str1.sliceByPoint(0, 1)); //👿
console.log(str2.sliceByPoint(1, 2)); // 2



