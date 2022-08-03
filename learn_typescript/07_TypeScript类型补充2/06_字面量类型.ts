
// "Hello World" 这种字符串，也是可以作为类型的, 叫做字面量类型
const message: "Hello World" = "Hello World"
/** 
 * const定义一个变量，会自动这样
 * 比如 const message = "hhh", 
 * 相当于： const message:"hhh" = "hhh"
 * 
 * 而let定义的就是一个正常的string类型
 * let str = "233"
 * 相当于
 * let str:string = "233"
 * 
 * 
 * 不过可以通过： let num:123 = 123
 * 来使得num为一个 字面量类型
 * 
 * 
 * 但是！！！
 * 字面量类型的值，一定要和类型是一样的
 * 你是123类型，那么值也一定要是123
 * 如下：
 * */ 
// let num: 123 = 123
// num = 321  报错

// 在08文件夹的01，函数的类型.ts文件中，看到了函数用const定义
// 然后自己指定了·类型


// 字面量类型的意义, 就是必须结合联合类型
type Alignment = 'left' | 'right' | 'center'

let align: Alignment = 'left'
align = 'right'
align = 'center'

// align = 'hehehehe'
export {}