// ES5以及之前给参数默认值
/**
 * 缺点:
 *  1.写起来很麻烦, 并且代码的阅读性是比较差
 *  2.这种写法是有bug  ---- 对于 0 或者 "" 会被 || 认为 false
 */
function foo1(m, n) {
  m = m || "aaa"
  n = n || "bbb"

  console.log(m, n)
}

// 1.ES6可以给函数参数提供默认值
function foo2(m = "aaa", n = "bbb") {
  console.log(m, n)
}

foo1(0, "") // "aaa bbb"
foo2(0, "") // "0  "
// ********* 还是会以传入的值为准，没有传入才用默认的值
foo1(); // "aaa bbb"
foo2() // "aaa bbb"
console.log("=======================================");

// 2.对象参数和默认值以及解构
function printInfo({name, age} = {name: "why", age: 18}) {
  console.log(name, age)
}

printInfo({name: "kobe", age: 40}); // kobe 40
printInfo(); // why 18
console.log("=======================================");

// 另外一种写法
//*****  默认传进来了一个空对象，对空对象进行解构，
// **** 解构的属性有默认值
function printInfo1({name = "why", age = 18} = {}) {
  console.log(name, age)
}
printInfo({name: "kobe", age: 40});
printInfo1()
console.log("=======================================");

// 3.有默认值的形参最好放到最后
function bar(x, y, z = 30) {
  console.log(x, y, z)
}

bar(10, 20)
bar(undefined, 10, 20)
console.log("=======================================");

// 4.有默认值的函数的length属性
function baz(x, y, z, m, n = 30) {
  console.log(x, y, z, m, n)
}
// ***** 如果有设定了默认值，那么baz.length不会把设置了的属性算到长度中
console.log(baz.length)
