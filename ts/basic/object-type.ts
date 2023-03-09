// 对象类型: 函数、{}、数组、类
// Object \ bigObject
/* 
  我们不能把 number、string、boolean、symbol等 原始类型赋值给 object。
  在严格模式下，null 和 undefined 类型也不能赋给 object。
*/
  let object: object;
  // object = 1; // 报错
  // object = "a"; // 报错
  // object = true; // 报错
  // object = null; // 报错
  // object = undefined; // 报错
  object = {}; // 编译正确
/*
  大 Object 代表所有拥有 toString、hasOwnProperty 方法的类型 
  所以所有原始类型、非原始类型都可以赋给 Object(严格模式下 null 和 undefined 不可以)
*/
let bigObject: Object;
bigObject = 1; // 编译正确
bigObject = "a"; // 编译正确
bigObject = true; // 编译正确
// bigObject = null; // 报错
// bigObject = undefined; // 报错
bigObject = {}; // ok

// 类 Class
class Person {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  sayHi(): void {
    console.log(`Hi, ${this.name}`);
  }
}

// Array、tuple
// Array等效的两种写法
const arr: number[] = [1,2,3];
const arr2: Array<number> = [1,2,3];

const tuple: [number, string] = [1, "garril"];
// 元组类型只能表示一个已知元素数量和类型的数组，长度已指定，越界访问会提示错误。
// 例如，一个数组中可能有多种类型，数量和类型都不确定，那就直接any[]
