interface NewPerson {
  // 只读属性用于限制只能在对象刚刚创建的时候修改其值
  readonly name: string;
  // 可选
  age?: number;
  /* 
    一个接口中除了包含必选和可选属性之外，还允许有其他的任意属性，
    这时我们可以使用 索引签名 的形式来满足上述要求。
    一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集

    prop字段必须是 string类型 or number类型。 值是any类型，也就是任意的
  */
  [prop: string]: any;
}

// 联合类型
// type Animal = Pig | Dog | Cat;
// type List = [string, boolean, number];

// 内置工具类型
// Required --- 将类型的所有属性变成必选
interface __Person {
  name?: string;
  age?: number;
  hobby?: string[];
}
const user: Required<__Person> = {
  name: "树哥",
  age: 18,
  hobby: ["code"],
};

// Partial --- 与 Required 相反，将所有属性转换为可选属性
// type User = Partial<__Person>

// Exclude
// Exclude<T, U> 的作用是将某个类型中属于另一个的类型移除掉,剩余的属性构成新的类型
type T0 = Exclude<"a" | "b" | "c", "a">; // "b" | "c"
type T1 = Exclude<"a" | "b" | "c", "a" | "b">; // "c"
type T2 = Exclude<string | number | (() => void), Function>; // string | number

// Extract
// 和 Exclude 相反，Extract<T,U> 从 T 中提取出 U。
type _T0 = Extract<"a" | "b" | "c", "a" | "f">; // "a"
type _T1 = Extract<string | number | (() => void), Function>; // () =>void

// Readonly
// 把数组或对象的所有属性值转换为只读的，这就意味着这些属性不能被重新赋值。

let p: Readonly<Person> = {
  name: "hello",
  age: 10,
};
// p.age = 11; // error  Cannot assign to 'age' because it is a read-only property.

// Record
// Record<K extends keyof any, T> 的作用是将 K 中所有的属性的值转化为 T 类型。
type Property = "key1" | "key2";
type Student = Record<Property, string>;

const stu: Student = {
  key1: "i am a student",
  key2: "garril",
};

// Pick
// 从某个类型中挑出一些属性出来
type Student2 = {
  name: string;
  age: number;
  gender: string;
};

type P1 = Pick<Student2, "name" | "age">; // { name: string; age: number; }

const student2: P1 = {
  name: "树哥",
  age: 18,
};

// Omit
// 与Pick相反，Omit<T,K> 从T中取出除去K的其他所有属性。
interface Student3 {
  name: string;
  age: number;
  gender: string;
}
type P2 = Omit<Student3, "age" | "gender">;
const student3: P2 = {
  name: "garril",
};


// NonNullable
// 去除类型中的 null 和 undefined
type HasUndefined = NonNullable<string | number | undefined>; // string | number
type HasUndefinedNull = NonNullable<string[] | null | undefined>; // string[]

// ReturnType
// 用来得到一个函数的返回值类型
type Func = (value: string) => string;
const test: ReturnType<Func> = "1";

// Parameters
// 用于获得函数的参数类型所组成的元组类型
type ArguType = Parameters<(a: number, b: string) => void>; // [number, string]

// InstanceType
// 返回构造函数类型T (这里T为：typeof C）的实例类型
class C {
  x = 0;
  y = 0;
}
type D = InstanceType<typeof C>;  // C