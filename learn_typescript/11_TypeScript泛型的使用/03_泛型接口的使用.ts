// 泛型的默认使用
interface IPerson<T1 = string, T2 = number> {
  name: T1
  age: T2
}

const p: IPerson = { 
  /* 这样做的时候， 没有类型推导
    所以：
    要么 const p: IPerson<string,number> = { ....}
    要么上面给默认值
  */
  name: "why",
  age: 18
}

// 泛型接口 & 多泛型
interface IX<T,U> {
  key: T;
  val: U;
}
// 泛型类
class IMan<T> {
  instance: T;
}
// 泛型别名
type ITypeArr<T> = Array<T>;

// 函数定义 + 泛型（约束）
type IGetRepeatStringArr = <T extends string>(target: T) => T[];
// 定义的类型的泛型
type IGetRepeatArr<T = number> = (target: T) => T[];
const getRepeatArr: IGetRepeatArr = target => new Array(100).fill(target);
getRepeatArr(123);
const getRepeatArr1: IGetRepeatArr<string> = target => new Array(100).fill(target);
getRepeatArr1('123');

export {}