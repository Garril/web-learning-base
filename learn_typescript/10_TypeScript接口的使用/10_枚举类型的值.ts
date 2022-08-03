// type Direction = "left" | "Right" | "Top" | "Bottom"

enum Direction {
  // 如果像上一个文件，没有赋值，就只是单纯的名字
  // 那么会按顺序，自动赋值，从0开始，比如LEFT是0，RIGHT是1。。。。。
  // 改变LEFT为100，后续会变成101，102，103。。。
  LEFT = "LEFT",
  RIGHT = "RIGHT",
  TOP = "TOP",
  BOTTOM = "BOTTOM"
}

let name: string = "abc"
let d: Direction = Direction.BOTTOM

function turnDirection(direction: Direction) {
  console.log(direction)
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
