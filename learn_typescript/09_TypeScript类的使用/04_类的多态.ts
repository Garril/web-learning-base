class Animal {
  action() {
    console.log("animal action")
  }
}

class Dog extends Animal {
  action() {
    console.log("dog running!!!")
  }
}

class Fish extends Animal {
  action() {
    console.log("fish swimming")
  }
}

class Person extends Animal {

}

// animal: dog/fish
// 多态的目的是为了写出更加具备通用性的代码
function makeActions(animals: Animal[]) { 
  // animals：Animal[]等价于 animals:(Dog|Fish)[] 但是为了通用性，比如加了个Person，不用动函数代码
  animals.forEach(animal => {
    // 执行的是自己的方法，而不是Animal总体的方法，这就是多态
    animal.action()
  })
}

makeActions([new Dog(), new Fish(), new Person()])
/**
 * 实质为：
 * 父类引用（类型）指向子类对象，比如：
 * const animal1: Animal = new Dog() -- 这里的animal1，是一个Dog对象
 * animal1.action() 执行的 Dog的action
 */


 export {}