function delayCall(func) {
  return new Promise(resolve => {
    setTimeout(() => {
      const result = func();
      resolve(result);
    }, 1000);
  });
}
// 实现delayCall（1s后执行func）的类型声明：
// 1、入参 -- 函数类型
// 2、出参 -- Promise -> 函数返回值 -> 问题在于函数的返回值
type IDelayCall = <T extends () => any>
(func: T) => ReturnType<T>;

// ReturnType的简单实现
type IReturnType<T extends (...args: any) => any> // T extends 函数类型的全集
= T extends
      (...args: any) => infer R ?    R : any
// extends 在等号右边，不再表示泛型限制，表示泛型推断（类型推断，其表达可类比三元表达式）
// 如 T=== 判断类型 ? 类型A ：类型B

// infer 出现在类型推荐中，表示定义类型变量，可以用于指代类型
// 如 该场景下，将函数的返回值类型作为变量，使用新泛型R表示
// 如果 T 符合函数的方式，return取值就是R的类型

export {}