/* 泛型：为了函数的通用性 */

// 类型的参数化 --- 定义函数时，不决定参数的类型，
// 而是 让调用者以参数的形式，告知函数 这个参数的类型

// 在定义这个函数时, 我不决定这些参数的类型
// 而是让调用者以参数的形式告知,我这里的函数参数应该是什么类型
function sum<Type>(num: Type): Type {
  // sum<Type> 这个<Type>相当于声明了，后面参数的类型，也是参数
  return num
}

// 1.调用方式一: 明确的传入类型
sum<number>(20)
sum<{name: string}>({name: "why"})
sum<any[]>(["abc"])

// 2.调用方式二: 类型推导
sum(50)
sum("abc")

export {}

