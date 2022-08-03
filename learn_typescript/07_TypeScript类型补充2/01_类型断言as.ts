// <img id="why"/>

// 1.类型断言 as ---- 把我们更为宽泛的范围缩小为具体类型
// const el = document.getElementById("why");
const el = document.getElementById("why") as HTMLImageElement
el.src = "url地址"
/**
 * 如果不写最后的 as HTMLImageElement什么的，
 * 你用 el.classList没问题，但是el.src会报错，
 * 因为他不知道 el拿到的 是一个 img标签的dom节点----HTMLImageElemnt
 * 而是认为el就是一个 HTMLElement，直接.src就报错了
 */


// 2.另外案例: Person是Student的父类
class Person {

}

class Student extends Person {
  studying() {

  }
}

/**
 * 
 * 学生继承于人
 * sayHello要一个Person对象传入
 * 我们new了一个Student对象，他也是一个人，所以可以传入
 * 但是！！！
 * 直接通过 p.studing() 这样去调用 Student类实例对象的方法
 * 却做不到。
 * 因为p:Person而不是 p:Student
 * 这里就需要断言了
 * 
 * 上述也是断言用的最多的情况
 * 即：把我们更为宽泛的范围缩小为具体类型
 */
function sayHello(p: Person) {
  (p as Student).studying()
}

const stu = new Student()
sayHello(stu)


// 3.了解: as any/unknown
const message = "Hello World"
// const num: number = (message as unknown) as number


// 4.demo
type IObjArr = Array<{
  key: string;
  [objKey: string]: any;
}>
function keyBy<T extends IObjArr>(objArr: Array<T>) {
  // 未指定类型时，result类似为 {}
  const result = objArr.reduce((res, val, key) => {
    res[key] = val;
    return res;
  }, {});
  // 通过as断言result类型为正确类型
  return result as Record<string, T>;
}

export {}