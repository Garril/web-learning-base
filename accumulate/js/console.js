// 对象数组
console.table([
  { age: 12, name: "Tom" },
  { age: 18, name: "Kuris" },
  { age: 22, name: "garril" },
]);



// 分组
console.group('Package');
console.log("first");
console.log("second");
console.log("third");
console.groupEnd('Package');



// 打印对象
console.dir(document.body);
console.log(document.body);
//比如:function foo() { .. }  foo.a = 123，打印foo要看到a属性


// 计时
console.time('loop');
const start = Date.now();
while (Date.now() - start < 2000) { }
console.timeEnd('loop');


// 计数
for (let i = 0; i < 10; i++) {
  console.count('count');
}
console.countReset('count')



// 堆栈 -- 知道谁调用了fn
function fn() {
  console.trace();
}
function userFn() {
  fn();
}
userFn();



// 断言
function sum(a, b) {
  return a + b;
}
console.assert(sum(1, 2) === 3);



// 警告 console.warn --- 框架/组件库
// 错误 console.error
// console.clear();  -- 清空消息


// 样式
const style = `font-size:2em;color:skyblue;`;
console.log('%cTestString', style);