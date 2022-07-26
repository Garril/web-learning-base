/* 先放大 后缩小 */
function transform(num) {
  // return Math.floor(num * Math.pow(10,2)) / Math.pow(10,2);
  const t = 10**2;
  return Math.floor(num * t) / t;
}

let num = 10.545;
let num1 = 10.547;
let num2 = 10.541;
let num3 = 0.23;
let num4 = 0.2;
let num5 = 0.235;
let num6 = 0.238;
console.log(transform(num));
console.log(transform(num1));
console.log(transform(num2));
console.log(transform(num3));
console.log(transform(num4));
console.log(transform(num5));
console.log(transform(num6));
/* 
  10.54
  10.54
  10.54
  0.23 
  0.2  
  0.23 
  0.23 
*/