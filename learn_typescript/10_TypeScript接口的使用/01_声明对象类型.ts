// 通过类型(type)别名来声明对象类型
// type InfoType = {name: string, age: number}

// 另外一种方式声明对象类型: 接口interface
// 在其中可以定义可选类型
// 也可以定义只读属性
interface IInfoType { // (在接口的命名最前面，加个大写I --- 一种命名规则)
  readonly name: string; // readonly，不可在对象初始化外赋值
  age: number;
  friend?: {  // 可选
    name: string
  };
  // 对对象其他的属性key---是一个变量，这个key的属性不清楚
  [key:string]: any;
}
// 每个属性后的; 可不要

const info11: IInfoType = {
  name: "why",
  age: 18,
  friend: {
    name: "kobe"
  }
  // interface非可选的属性，info11必须定义
}

console.log(info11.friend?.name)
console.log(info11.name)
// info11.name = "123"
info11.age = 20



export {}