// 要求 sourceObj 必须为 targetObj 的子集
// 简单合并
function merge(sourceObj, targetObj) {
  return { ...sourceObj, ...targetObj }; // 后覆盖前
}
// JS中不污染的合并
function merge2(sourceObj, targetObj) {
  // 保留sourceObj和targetObj都有的属性，且值为sourceObj的
  const result = {...sourceObj};
  for(let key in targetObj) {
    const itemVal = sourceObj[key];
    itemVal && ( result[key] = itemVal );
  }
  return result;
}
// 现在为上面函数写类型
interface ISourceObj {
  x?: string;
  y?: string;
}
interface ITargetObj {
  x: string;
  y: string;
}
type IMerge = (sourceObj: ISourceObj, targetObj: ITargetObj)
=> ITargetObj;
// 类型繁琐，不容易维护，target增加key，source要联动修改

// 改进：（抓住定义时，不明确的特性）
interface IMerge2 {
  // 做merge必须传object，key为string，value：any
  <T extends Record<string, any>>(sourceObj: Partial<T>, targetObj: T): T;
  // targetObj是T，返回也是T
  // Partial<T>：我们希望拥有一个类型C，这个类型C 传入任意一个类型A后，可以得到A的子集B
}
// Partial的理解：（如下实现---ts内置了）
type IPartial<T extends Record<string, any>> = {
  [P in keyof T]?: T[P];
}
// keyof 相当于取值对象中的所有key组成的字符串字面量
type IKeys = keyof { a: string; b: number }; // => type IKeys = "a" | "b"

export {}