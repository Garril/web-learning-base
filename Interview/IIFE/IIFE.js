var num = 10;
var obj = { num: 20 };
obj.fn = (function (num){
  // delete num; --- 无法删除
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


web浏览器下：
    obj.fn = (function (num){  ---- num为函数参数num初始：20
    this.num ---- 全局var的num为 ：60
    num++  ---- 参数num++ ：21
  fn(5) --- 默认函数调用
    this.num: 全局var的num为 60+5 = 65
    num++  ---- 参数num++ ：22
  obj.fn(10) --- 隐式调用
    this.num: obj对象的num为20，+10变为 30
    num++  ---- 参数num++ ：23
  console.log(num, obj.num)  --- 65 30

而在node下，差别就是全局var num一直是10，没有被改变过
可以理解为： this.num是IIFE函数作用域下的num

在web下，把var num = 10，变成let定义，结果和node环境下跑一样
*/ 