(function() {
  // 相当于将index.js--why 导入，拿到 moduleA
  // 模块化的雏形
  // 缺点，moduleA的命名也需要规范，不然又有一个叫moduleA
  if (moduleA.isFlag) {
    console.log("我的名字是" + moduleA.name)
  }
})()
// 以前js无模块化，利用函数的作用域，写自执行函数