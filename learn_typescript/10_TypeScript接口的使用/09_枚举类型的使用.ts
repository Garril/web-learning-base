// type Direction = "left" | "Right" | "Top" | "Bottom"

enum Direction {
  /* 
    枚举 --- 穷举
    将所有可能的值，一个个的列举出来，定义在一个类型中
    可以定义一组常量 --- 数字/字符串
    下面的大写：是一种编程习惯
  */
  LEFT,
  RIGHT,
  TOP,
  BOTTOM
}


function turnDirection(direction: Direction) {
  switch (direction) {
    case Direction.LEFT:
      console.log("改变角色的方向向左")
      break;
    case Direction.RIGHT:
      console.log("改变角色的方向向右")
      break;
    case Direction.TOP:
      console.log("改变角色的方向向上")
      break;
    case Direction.BOTTOM:
      console.log("改变角色的方向向下")
      break;
    default:
      const foo: never = direction;
      break;
  }
}

turnDirection(Direction.LEFT)
turnDirection(Direction.RIGHT)
turnDirection(Direction.TOP)
turnDirection(Direction.BOTTOM)


export {}