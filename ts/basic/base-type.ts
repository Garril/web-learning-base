/* 
  全局安装 ts
    npm install -g  typescript
  生成 tsconfig.json 配置文件
    tsc --init

  通过tsc命令，可将typescript代码转换成js，再node运行
  ---> 太麻烦,引入ts-node

  全局安装ts-node
    npm i -g ts-node
*/
// 类型 number、boolean、string、enum，如下：
const _name: string = "garril";

enum Color {
  RED,
  PINK,
  BLUE,
}
const red: Color = Color.RED;
console.log(red); // 0

const color: Color[] = [Color.RED, Color.PINK, Color.BLUE];
console.log(color); //[0, 1, 2]
//编译之后的js如下：
var _color = [0 /* RED */, 1 /* PINK */, 2 /* BLUE */];
// 可以看到我们的枚举并没有被编译成js代码 只是把color这个数组变量编译出来了


/* 
  enum Color {
    RED = 2,
    PINK,
    BLUE,
  }
  const pink: Color = Color.PINK;
  console.log(pink); // 3
*/

// 类型 undefined、null如下：
/* 
  默认情况下 null 和 undefined 是所有类型的子类型。 
  也就是说你可以把 null 和 undefined 赋值给其他类型
  但是
    如果你在tsconfig.json指定了"strictNullChecks":true ，即开启严格模式后
    null 和 undefined 只能给它们自己的类型赋值( undefined 可以给 void 赋值 )

    非strictNullChecks下：
        let str: string = 'garril';
        str = null; // 编译正确
        str = undefined; // 编译正确  

    strictNullChecks下：
        let x: number;
        x = 1; // 编译正确
        x = undefined;    // 编译错误
        x = null;    // 编译错误    
        let c:void = undefined // 编译正确
        let d:void = null // 编译错误    
*/
let a: undefined = undefined;
let b: null = null;


// any、void、never、unknown类型
// any会跳过类型检查器对值的检查，任何值都可以赋值给any类型
let value: any = 1;
value = "garril"; // 编译正确
value = []; // 编译正确
value = {};// 编译正确
// void一般只用在函数上，告诉别人这个函数没有返回值
function sayHello(): void {}
// never 类型表示的是那些永不存在的值的类型
/* 
  值会永不存在的两种情况:
    1 如果一个函数执行时抛出了异常，那么这个函数永远不存在返回值（因为抛出异常会直接中断程序运行，
      这使得程序运行不到返回值那一步，即具有不可达的终点，也就永不存在返回了）
    2 函数中执行无限循环的代码（死循环），使得程序永远无法运行到函数返回值那一步，永不存在返回。
*/
// 异常
function error(msg: string): never { // 编译正确
  throw new Error(msg); 
}

// 死循环
function loopForever(): never { // 编译正确
  while (true) {};
}
// unknown与any一样，所有类型都可以分配给unknown:
let value2: unknown = 1;
value2 = "garril"; // 编译正确
value2 = false; // 编译正确
/* 
  unknown与any的最大区别是:
    任何类型的值可以赋值给any，同时any类型的值也可以赋值给任何类型。
    unknown 任何类型的值都可以赋值给它，但它只能赋值给unknown和any
*/