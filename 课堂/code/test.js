var b = 10;
(function b() {
  b = 20; // 这一行，没啥效果--具名函数名，不能改，无效
  console.log('closure',b) // 输出b这个立即执行函数
})()
// 但是如果把b =20还有，第四行的b改成bb，那就没问题了,输出20
console.log("there",b) // 10