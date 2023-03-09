// 泛型
function getValue<T, U>(arg: [T, U]): [T, U] {
  return arg;
}
// 使用
const str = getValue(["garril", 18]);

/* 
  事先不知道它是哪种类型，所以不能随意的操作它的属性或方法：
  function getLength<T>(arg:T):T  {
    console.log(arg.length); // 报错，不能调用 length 属性
  }  
  要实现，可以泛型约束
*/
interface Lengthwise {
  length: number;
}

function getLength<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}

// 泛型接口
interface KeyValue<T, U> {
  key: T;
  value: U;
}

const person1: KeyValue<string, number> = {
  key: "garril",
  value: 18,
};
const person2: KeyValue<number, string> = {
  key: 20,
  value: "nothing",
};

// 泛型类
class Test<T> {
  value: T;
  add: (x: T, y: T) => T;
}

let myTest = new Test<number>();
myTest.value = 0;
myTest.add = function (x, y) {
  return x + y;
};

// 泛型类型别名
type Cart<T> = { list: T[] } | T[];
let c1: Cart<string> = { list: ["1"] };
let c2: Cart<number> = [1];

// 泛型参数的默认类型
function createArray<T = string>(length: number, value: T): Array<T> {
  let result: T[] = [];
  for (let i = 0; i < length; i++) {
    result[i] = value;
  }
  return result;
}

// 泛型工具类型
// typeof
//先定义变量，再定义类型
let p1 = {
  name: "garril",
  age: 18,
  gender: "male",
};
// 关键词除了做类型保护，还可以从实现推出类型
type People = typeof p1;
function getName(p: People): string {
  return p.name;
}
getName(p1);

// keyof
// 可以用来获取一个对象接口中的所有 key 值
interface _Person {
  name: string;
  age: number;
  gender: "male" | "female";
}

type PersonKey = keyof _Person; //type PersonKey = 'name'|'age'|'gender';

function getValueByKey(p: _Person, key: PersonKey) {
  return p[key];
}
let val = getValueByKey({ name: "Garril", age: 18, gender: "male" }, "name");
console.log(val); // Garril

// in
// 用来遍历枚举类型
type Keys = "a" | "b" | "c";
type Obj = {
  [p in Keys]: any;
}; // -> { a: any, b: any, c: any }

// infer
// 在条件类型语句中，可以用 infer 声明一个类型变量并且对它进行使用。
type _ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;
// infer R 就是声明一个变量来 承载 传入函数签名的返回值类型，
// 简单说就是用它取到函数返回值的类型方便之后使用。

// extends
// 定义的泛型不想过于灵活或者说想继承某些类等，可以通过 extends 关键字添加泛型约束
interface Lengthwise {
  length: number;
}
function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}
// 现在这个泛型函数被定义了约束，因此它不再是适用于任意类型
// loggingIdentity(3);  // Error, number doesn't have a .length property

// 索引访问操作符
interface Person {
  name: string;
  age: number;
}

type x = Person["name"]; // x is string