// 函数的重载: 函数的名称相同, 但是参数不同的几个函数, 就是函数的重载

// 他把 函数类型的声明 和 函数的实现 给分开了
function add(num1: number, num2: number): number; // ts重载，没函数体
function add(num1: string, num2: string): string;

function add(num1: any, num2: any): any { // 具体函数的实现，全是any
  // 或者把 any 变成  'number' | 'string'
  // 必须加判断，为什么？ 这里 ts 类型判断是把 'number' | 'string' 作为整体的
  if (typeof num1 === 'string' && typeof num2 === 'string') {
    return num1.length + num2.length
  }
  return num1 + num2
}

const result = add(20, 30)
const result2 = add("abc", "cba")
console.log(result)
console.log(result2)

// 在函数的重载中, 实现函数是不能直接被调用的
// add({name: "why"}, {age: 18})

export {}
