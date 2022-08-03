interface IA { a: 1, a1: 2 }
interface IB { b: 1, b1: 2 }
// 类型保护
function log(arg: IA | IB) {
  // 下面的代码，ts报错

  // if(arg.a) {
  //   console.log(arg.a1);
  // } else {
  //   console.log(arg.b1);
  // }

  // 访问联合类型时，只能访问交集部分 a属性 不在交集上 
}

// 类型守卫
// 定义一个函数，函数返回值 是一个类型谓词，生效范围为子作用域
function getIsIA(arg: IA | IB): arg is IA {
  return !!(arg as IA).a; // 断言
}

function log2(arg: IA | IB) {
  if(getIsIA(arg)) { // 如果返回true，这个if作用域内，都使用IA
    console.log(arg.a1);
  } else {
    console.log(arg.b1);
  }
}
// 上述达到了效果，但是还是麻烦了点
// 一般只有在，两个类型，完全没有重合点的时候，写类型守卫

/* 
  可以用typeof xxx === 'string' 
  或者 yyy instanceof Object。
  这样会自动内部生成一个作用域

  看1_联合交叉类型.ts
  如果 book: IBookItem1 那么
  if(book.type === 'history') {
    ...book.range
  } else {
    ....book.theme
  }
  ---> 联合类型 + 类型保护 = 自动类型推断
*/
export {}