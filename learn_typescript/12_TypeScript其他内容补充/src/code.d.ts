
// 声明模块，自己给lodash声明模块
declare module 'lodash' {
  export function join(arr: any[]): void
} 

// 声明变量/函数/类 
/* 你ts文件最后还是转为js，然后放到html文件中，
  那么，如果在index.html文件中的script标签上定义的变量
  理应在这些ts文件 是都可以用的，这里做个类型声明，就不会报错
*/
declare let whyName: string
declare let whyAge: number
declare let whyHeight: number
// 上面3个是html文件声明的变量

declare function whyFoo(): void

declare class Person {
  name: string
  age: number
  constructor(name: string, age: number)
}

// 声明文件 --- 给图片做声明
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.png'
declare module '*.svg'
declare module '*.gif'

// 声明命名空间 --- 运用的情况：比如我html通过script引入了jquery
// 我无法在ts中使用jquey的$
// 命名空间声明后，就可以直接使用，甚至不用导入
declare namespace $ {
  export function ajax(settings: any): any // 把ajax方法声明了一下，ts文件可以用了
}

