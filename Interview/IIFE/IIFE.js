var num = 10;
var obj = { num: 20 };
obj.fn = (function (num){
  this.num = num * 3;
  num++;
  return function (n) {
    this.num += n;
    num++;
    console.log(num)
  }
})(obj.num);
var fn = obj.fn;
fn(5)
obj.fn(10)
console.log(num, obj.num)
/*
node:
  22
  23
  10 30
web:
  22
  23
  65 30
区别在于：window下，IIFE的num参数为全局变量num
而在node下，num就是他自己的函数参数，不会改变全局变量num
*/    