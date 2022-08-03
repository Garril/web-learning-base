// 1.typeof的类型缩小
type IDType = number | string
function printID(id: IDType) {
  // 这个区域的id是IDType
  if (typeof id === 'string') {
    // 这个区域的id是 string
    console.log(id.toUpperCase())
  } else {
    // 这个区域的id是 number
    console.log(id)
  }
  // 各个区域对应的类型，才会给你对应的代码提示
  // 各个区域的类型都不一样，这就是typeof帮忙做的类型缩小
}

// 2.平等的类型缩小(=== == !== !=/switch)
type Direction = "left" | "right" | "top" | "bottom"
function printDirection(direction: Direction) {
  // 1.if判断，同typeof，类型缩小
  // if (direction === 'left') {
  //   console.log(direction)
  // } else if ()

  // 2.switch判断
  // switch (direction) {
  //   case 'left':
  //     console.log(direction)
  //     break;
  //   case ...
  // }
}

// 3.instanceof
function printTime(time: string | Date) {
  if (time instanceof Date) {
    console.log(time.toUTCString())
  } else {
    console.log(time)
  }
}

class Student {
  studying() {}
}

class Teacher {
  teaching() {}
}

function work(p: Student | Teacher) {
  if (p instanceof Student) { // 若 p 是 Student 的实例对象
    p.studying()
  } else {
    p.teaching()
  }
}

const stu = new Student()
work(stu)

// 4. in
type Fish = {
  swimming: () => void
}

type Dog = {
  running: () => void
}

function walk(animal: Fish | Dog) {
  // 这里依旧不能直接调用 animal.swimming(假设传入了一个Fish类型对象)
  if ('swimming' in animal) { // swimming属性有没有在字面量对象animal上
    // 简单理解为，判断属性，和js里面的差不多
    animal.swimming()
  } else {
    animal.running()
  }
}

const fish: Fish = { 
  // 注意，这里是类型定义，不是像第三种的class和实例，无法instanceof
  swimming() {
    console.log("swimming")
  }
}

walk(fish)

export {}