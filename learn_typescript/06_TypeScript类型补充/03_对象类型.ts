
// Point: x/y -> 对象类型
// {x: number, y: number}
function printPoint(point: {x: number, y: number}) {
  // 要求传入对象类型，且有x和y，且类型都为number
  console.log(point.x);
  console.log(point.y)
}

printPoint({x: 123, y: 321})

export {}