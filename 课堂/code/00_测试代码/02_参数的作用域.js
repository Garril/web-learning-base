
var x = 0
// 问题的关键就是foo第二个参数，y函数，其中的x=3，到底改的是哪个x（答案：改的第一参数x）
// 当函数的参数有默认值时, 会形成一个新的作用域, 这个作用域用于保存参数的值
function foo(x, y = function() { x = 3; console.log(x) }) {
  console.log(x) // undefined: 输出的是参数x，这里也说明，先是往上层找变量x，没有再看变量提升
  var x = 2
  console.log(x) // 2
  y()  // 3
  console.log(x) // 2
}

foo()
console.log(x) // 0

/**
 * 理解：
 * 要知道这道题，有3个作用域：
 *   1、全局作用域
 *        x = 0
 *   2、函数的参数作用域（只有在函数参数进行默认赋值操作时，才会形成）
 *        x = undefined
 *        y = function() { x = 3; console.log(x) }
 *   3、函数作用域
 *        x = 2
 * 其中 全局是最外层，然后是参数作用域，参数作用域包裹函数作用域
 * 函数作用域在最里层。
 * foo的第二参数y函数，去修改x的值，优先修改 参数作用域的x
 * 而foo函数内部，函数作用域，自己内部先找x，找不到，再往上层进行查找
 * 
 * 补充： 如果第13行为： foo(100)
 * 则结果只是第6行输出的undefined变成100
 * 如果第7行，变量的定义改成const或者let，就会报错 
 * 如果y函数内没有进行x的变量声明，且第一参数不叫做x，就会跑到全局去查找x
 * 
 * 
 * 
 * https://262.ecma-international.org/6.0/#sec-functiondeclarationinstantiation
 * 9.2.12
 *  If the function’s formal parameters do not include any default value initializers 
 *  then the body declarations are instantiated in the same Environment Record as the parameters.
 *  If default value parameter initializers exist, 
 *  a second Environment Record is created for the body declarations.
 *  Formal parameters and functions are initialized as part of FunctionDeclarationInstantiation.
 *  All other bindings are initialized during evaluation of the function body.
 */


