define(["foo"], function(foo) { 
  // 对比bar.js和foo.js，define第一个参数可选，是要导入的模块
  console.log("--------")
  // require(["foo"], function(foo) {
  //   console.log("bar:", foo)
  // })

  console.log("bar:", foo)
})