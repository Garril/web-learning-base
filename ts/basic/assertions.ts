// 类型断言 -- 手动指定一个值的类型
// 尖括号写法
let str: any = "to be or not to be";
let strLength: number = (<string>str).length;
// as 写法
let str2: any = "to be or not to be";
let strLength2: number = (str2 as string).length;

// 非空断言
/* 
  使用缀表达式操作符 ! 进行断言操作对象是非 null 和非 undefined 的类型，
  即x!的值不会为 null 或 undefined
*/
let user: string | null | undefined;
console.log(user!.toUpperCase()); // 编译正确
// console.log(user.toUpperCase()); // 错误

// 确定赋值断言
let value2: number;
// 我们定义了变量, 没有赋值就使用，则会报错
// console.log(value2); // Variable 'value' is used before being assigned.
/* 
  通过 let x!: number; 确定赋值断言，
  TypeScript 编译器就会知道该属性会被明确地赋值。
*/
let value3!:number
console.log(value3); // undefined 编译正确


class C {
  foo: number;
  bar = "hello";
  baz: boolean;
  constructor() {
    this.foo = 42;
  }
}
// 首先编辑器会报错： 属性“baz”没有初始化表达式，且未在构造函数中明确赋值。ts(2564)
// 属性 baz 冒号之前加上 ! ,这样就不会报错了
class C1 {
  foo: number;
  bar = "hello";
  baz!: boolean;
  constructor() {
    this.foo = 42;
  }
}
// 强制链式调用
// 这里 Error对象定义的stack是可选参数，如果这样写的话编译器会提示
// 出错 TS2532: Object is possibly 'undefined'.
// new Error().stack.split('\n');

// 我们确信这个字段100%出现，那么就可以添加！，强调这个字段一定存在
new Error().stack!.split('\n');