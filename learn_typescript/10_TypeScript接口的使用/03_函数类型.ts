// type CalcFn = (n1: number, n2: number) => number
// 可调用的接口
interface CalcFn {
  // calc: (n1:number, n2:number) => number
  (n1: number, n2: number): number
}

function calc(num1: number, num2: number, calcFn: CalcFn) {
  return calcFn(num1, num2)
}

const add: CalcFn = (num1, num2) => {
  return num1 + num2
}

calc(20, 30, add)

function add1(x: number, y: number): number {
  return x + y;
}
// 也有做法如下：
const mult: (x: number, y: number) => number = (x, y) => x * y;


export {}