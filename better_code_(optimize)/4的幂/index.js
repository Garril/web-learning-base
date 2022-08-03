// 版本1
// function isPowerOfFour(num) {
//   num = parseInt(num);

//   while(num > 1) {
//     if(num % 4) return false;
//     num /= 4;
//   }
//   return num === 1;
// }

// ===============================
// 版本2
// function isPowerOfFour(num) {
//   num = parseInt(num);

//   while(num > 1) {
//     if(num & 0b11) return false;
//     num >>>= 2;
//   }
//   return num === 1;
// }

// ===============================
// 版本3 -- 正则
// function isPowerOfFour(num) {
//   num = parseInt(num).toString(2); 
//   return /^1(?:00)*$/.test(num);
// }

// ===============================
// 版本4 -- O(1)复杂度
function isPowerOfFour(num){
  num = parseInt(num);
  return num > 0 &&
    (num & (num - 1)) === 0 &&
    (num & 0xAAAAAAAAAAAAA) === 0;
}

console.log(isPowerOfFour(21389)); // false
console.log(isPowerOfFour(4400)); // false
console.log(isPowerOfFour(16)); // true --- 1 0000
console.log(isPowerOfFour(8)); // false --- 1000
console.log(isPowerOfFour(4)); // true ---  0100
console.log(isPowerOfFour(1)); // true ---  0001
/* 
  4的幂，除了1，化为2进制，后两位一定为00
    10 -- 1010
    12 -- 1100
  解析版本4中的 (num & (num - 1))，假设num为：x.....1(后面跟k个0)
    则式子化为：
      x.....1(后面跟k个0) & x......0(后面跟k个1)
      最后得到结果 x......0(后面跟k个0) 
      ---- 我们的num，所有的二进制位上，有一个位的1，没了
      我们求的是4的幂，可以被2除完，
      所以都是： 10...0，一个1带n个0这个样子，只有一个1
      故：(num & (num - 1))一定等于0
  但是，为什么要加 (num & 0xAAAAAAAAAAAAA)？
    因为你看 8 - 1000，前两个条件只能满足，num是2的幂
    4的幂还得有一个条件，0的个数一定是偶数 ---> 1在奇数位
    0xAAAAAAAAAAAAA ----> 1010 1010 1010......1010
*/
