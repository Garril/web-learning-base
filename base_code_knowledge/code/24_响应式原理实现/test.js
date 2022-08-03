var num =100;
console.log(global.num);
console.log(global.hasOwnProperty('num'));
console.log('num' in global);
console.log("=============")

global.num = 66;
console.log(global.num);
console.log(global.hasOwnProperty('num'));
console.log('num' in global);

console.log("=============")

console.log(global.num1);
console.log(global.hasOwnProperty('num1'));
console.log('num1' in global);