/* 联合类型 并集 取真子集*/
type U =
  | {
      a: number;
      b: number;
    }
  | {
      a: number;
      c: number;
    };
const u: U = {
  a: 1,
  b: 2,
};
/*
  定义u的时候，a、b、c这三个属性，单独/任意搭配都没问题
  但是  u.c; 报错
  =》 因为你不确定他是不是 “真的有c”，他只是 “可以有c”
*/

/* 交叉类型 交集 and 和*/
type I = {
  a: number;
  b: number;
} & {
  a: number;
  c: number;
};
const i: I = {
  a: 1,
  b: 2,
  c: 3,
};
/* 
  const i: I = {
    a: 1,
  }; 报错
  必须声明a、b、c三个属性，声明齐了，才不会报错

  例子理解：
  type test1 = 'a' & string; // 'a'
  type test2 = 'a' & 'b'; // never
  两者取交集（拿公共的区域=》也就是字符串'a'）
*/

/* 运算逻辑 */
type test1 = 'a' | 'b' | (1 & string);
// 等同于
type test2 = ('a' & string) | ('b' & string) | (1 & string);
// 'a' | 'b' | never  ==>  'a' | 'b'
