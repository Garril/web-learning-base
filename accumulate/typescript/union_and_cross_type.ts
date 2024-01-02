/* 交叉和联合类型 */
type U =
  {
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
  c: 3,
};
/*  u.c; 报错*/

type I = {
  a: number;
  b: number;
} & {
  a: number;
  c: number;
};
/* 
  const i: I = {
    a: 1,
  }; 报错
  必须声明abc，才不会报错
*/

/*  上面的并集和交集，不是指的属性字段
  交集：两边类别的属性，都要有
  并集：
*/
