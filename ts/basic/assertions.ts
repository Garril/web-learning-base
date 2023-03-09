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