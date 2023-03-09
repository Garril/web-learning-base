
// 函数声明
function add(x: number, y: number): number {
  return x + y;
}
// 函数表达式
const add2 = function(x: number, y: number): number {
  return x + y;
}
// 接口定义函数
interface Add {
  (x: number, y: number): number;
}
// 可选参数
function add3(x: number, y?: number): number {
  return y ? x + y : x;
}
// 剩余参数
function add4(...numbers: number[]): number {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  return sum;
}
// 函数重载
/* 
函数重载真正执行的是同名函数最后定义的函数体 
在最后一个函数体定义之前全都属于函数类型定义 不能写具体的函数实现方法 只能定义类型
  function add(x: number, y: number): number;
  function add(x: string, y: string): string;
  function add(x: any, y: any): any {
    return x + y;
  } 
*/