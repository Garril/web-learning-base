/* 
  思路如下：
    首先，我们写了一个makeArea函数，传入的shape:any（一开始是any）
    retunr shape.getArea()表示返回图形面积，
    我们再去下面定义了两个类
    一个是Rectangle矩形，一个Circle圆形，（这里没有继承）
    他们都实现了自己的getArea方法，之后，new这两个类，再传入makeArea
    就可以拿到他们的面积。

    
    但是后来，我们发现，这种情况下，我们makeArea函数传入任何类型都不会报错
    比如我们直接传数字123，或者字符串“123”都可以
    所以我们抽象出了一个类
    class Shape {
      getArea()
    }
    然后让 Rectangle 和 Circle 继承自他


    但是呢？ undefined传入makeArea，他也可以
    而且，如果这时候，有一个人他直接，makeArea(new Shape())
    他也没实现getArea方法，那怎么办？


    所以要抽象
*/


function makeArea(shape: Shape) {
  return shape.getArea()
}

abstract class Shape {
  // 抽象类的子类，必须实现抽象类的抽象方法
  // 且抽象类，无法实例化
  // 上面两点，就直接排除了 直接 new Shape和undefined传入makeArea的可能
  abstract getArea(): number
}


class Rectangle extends Shape {
  private width: number
  private height: number

  constructor(width: number, height: number) {
    super()
    this.width = width
    this.height = height
  }

  getArea() {
    return this.width * this.height
  }
}

class Circle extends Shape {
  private r: number

  constructor(r: number) {
    super()
    this.r = r
  }

  getArea() {
    return this.r * this.r * 3.14
  }
}

const rectangle = new Rectangle(20, 30)
const circle = new Circle(10)

console.log(makeArea(rectangle))
console.log(makeArea(circle))
// makeArea(new Shape())

// makeArea(123)
// makeArea("123")
// console.log(makeArea(undefined)) --- 编译的时候报错了（把Shape变抽象类之后）


export {}