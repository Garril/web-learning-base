// 接收return
var moduleA = (function() {
  var name = "why"
  var age = 18
  var isFlag = true

  // 选择性暴露变量
  return {
    name: name,
    isFlag: isFlag
  }
})()
