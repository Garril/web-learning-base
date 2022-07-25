{

}

// if语句的代码就是块级作用域
if (true) {
  var foo = "foo"
  let bar = "bar"
}
// console.log(foo)// ********* 成功调用 --- var
// console.log(bar)//  ********  报错 --- let

// ******* 这说明了if和switch那些花括号，其实也看成是正常的块级作用域，
//  需要和let，class，const等搭配出效果

// switch语句的代码也是块级作用域
// var color = "red"

// switch (color) {
//   case "red":
//     var foo = "foo"
//     let bar = "bar"
// }

// console.log(foo)
// console.log(bar)  // --- 报错

// for语句的代码也是块级作用域
// for (var i = 0; i < 10; i++) {
//   // console.log("Hello World" + i)
// }

// console.log(i)



// for (let i = 0; i < 10; i++) {
// }

// console.log(i)
