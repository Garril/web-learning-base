import { add, sub } from "./utils/math";
import { time, price } from './utils/format'

import nhltImage from './img/nhlt.jpg'
// ts里面直接引用图片，也会报错

import axios from 'axios'
import lodash from 'lodash'
/* 一开始会出现 lodash 找不到，报错的情况
  原因js找不到对应声明，具体解释看下面：
  
  ts的类型查找： 一般的类型都是我们自己写的，但是我们也有用到其他一些类型
  比如 const imgEl = document.getElementById("image") as HTMLImageElement;
  这个 HTMLImageElement 怎么来的？
  这里涉及到 ts对类型的管理和查找规则

  ts在3个地方查找我们的类型声明
    1. 内置类型声明 -- 语言自身，比如有es5、es6、document等
    2. 外部定义类型声明 -- axios和lodash等第三方库，有些自己帮忙定义好了，有些没有
        为什么axios可以，而lodash报错？
        对应于node_modules里面有 axios有.d.ts文件，lodash无
    3. 自己定义类型声明
      看code.d.ts文件，lodash就自己定义
  
  ts有两种文件 .ts和 .d.ts
  .ts最终都会输出 .js文件，是写代码的地方
  .d.ts 是用来做类型声明的，用来类型检测，告知ts,我们有哪些类型

*/

console.log(add(20, 30));
console.log(sub(20, 30));

console.log(time.format("11111111"))
console.log(price.format(123))

console.log(lodash.join(["abc", "cba"]))

// axios.get("http://123.207.32.32:8000/home/multidata").then(res => {
//   console.log(res)
// })

// document.getElementById

console.log(whyName)
console.log(whyAge)
console.log(whyHeight)

whyFoo()

const p = new Person("why", 18)
console.log(p)


$.ajax({
  
})

