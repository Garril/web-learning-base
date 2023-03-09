// 类型推断 -- 如果没有明确的指定类型，那么 TypeScript 会依照类型推论的规则推断出一个类型。
let x = 1;
// x = true; // 报错
/* 
  上面等价于
  let x: number = 1;
  x = true; // 报错  
*/

// 联合类型
let status1: string | number;
status1 = "to be or not to be";
status1 = 1;

// 类型别名 --- 给一个类型起个新名字
// 它只是起了一个新名字，并没有创建新类型。类型别名常用于联合类型
type count2 = number | number[];
function hello(value: count2) {}

// 交叉类型
// 交叉类型就是跟联合类型相反，用&操作符表示，交叉类型就是两个类型必须存在
interface IpersonA {
  name: string;
  age: number;
}
interface IpersonB {
  name: string;
  gender: string;
}
let person: IpersonA & IpersonB = {
  name: "garril",
  age: 18,
  gender: "male",
};
// 交叉类型取的多个类型的并集，但是如果key相同但是类型不同，则该key为never类型
/* 
  interface IpersonA {
      name: string
  }

  interface IpersonB {
      name: number
  }

  function testAndFn(params: IpersonA & IpersonB) {
      console.log(params)
  }
  testAndFn({name: "garril"}) 
  // error TS2322: Type 'string' is not assignable to type 'never'.
*/

// 类型守卫 -- 类型守卫是: 运行时检查，确保一个值在所要类型的范围内
// 4种方法实现保护：
// 1、in
interface InObj1 {
  a: number;
  x: string;
}
interface InObj2 {
  a: number;
  y: string;
}
function isIn(arg: InObj1 | InObj2) {
  // x 在 arg 打印 x
  if ("x" in arg) console.log("x");
  // y 在 arg 打印 y
  if ("y" in arg) console.log("y");
}
isIn({ a: 1, x: "xxx" });
isIn({ a: 1, y: "yyy" });

// 2、typeof
/* typeof 只支持：
      typeof 'x' === 'typeName' 和 typeof 'x' !== 'typeName'，
      x 必须是 'number', 'string', 'boolean', 'symbol'。  */
function isTypeof(val: string | number) {
  if (typeof val === "number") return "number";
  if (typeof val === "string") return "string";
  return "nothing";
}

// 3、instanceof
function creatDate(date: Date | string) {
  console.log(date);
  if (date instanceof Date) {
    date.getDate();
  } else {
    return new Date(date);
  }
}

// 4、自定义类型保护的类型谓词
function isNumber(num: any): num is number {
  // return typeof num === "number";
  return num;
}
function isString(str: any): str is string {
  return typeof str === "string";
}
