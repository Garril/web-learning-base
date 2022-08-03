interface ISwim {
  swimming: () => void
}

interface IEat {
  eating: () => void
}

// 类实现接口
class Animal {
  
}

// 继承: 只能实现单继承
// 实现: 实现接口, 类可以实现多个接口
class Fish extends Animal implements ISwim, IEat {
  swimming() {
    console.log("Fish Swmming")
  }

  eating() {
    console.log("Fish Eating")
  }
}


class Person implements ISwim {
  swimming() {
    console.log("Person Swimming")
  }
}


// 编写一些公共的API: 面向接口编程
/*
  比如这里，我们如果传入 swimable:Fish
  那么，只有Fish类才能传入，然后调用swimming方法
  但是如果swimable为接口类型，所有实现了接口的对象，
  都允许被传入 */
function swimAction(swimable: ISwim) {
  swimable.swimming()
}

// 1.所有实现了接口的类对应的对象, 都是可以传入
swimAction(new Fish())
swimAction(new Person())


swimAction({swimming: function() {}})



export {}