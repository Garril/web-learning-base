/* 
  类型检查：
    动态类型：执行时，代码才去做类型的检验/匹配
    静态类型： 执行前必须先走一遍编译流程
  类型安全：
    强类型：num + string 不做隐式转换。
          且在语言层面就限制了函数的实参类型就必须与形参类型相同
    弱类型：做隐式转换
  （在 JS 中所有报出的类型错误，都是在代码层面然后在运行时通过逻辑判断手动抛出的）
*/



// 当前foo函数, 在被其他地方调用时, 没有做任何的参数校验
// 1> 没有对类型进行校验
// 2> 没有对是否传入参数进行校验
function foo(message) {
  if (message) {
    console.log(message.length);
  }
}

foo("Hello World");
foo("你好啊,李银河");

foo(123)

foo()

// 永远执行不到
console.log("渲染界面成千上万行的JavaScript代码需要执行, 去渲染界面")


// 定义变量
let bar = "abc";

bar = 123;

bar.length

