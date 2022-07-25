console.log("main.js代码开始运行")

require("./foo")
// 代码只会运行一次
// （node源码）原理：js文件对应一个module的实例，实例中有一属性为loaded，
// 如果被加载过，则为true
require("./foo")
require("./foo")

console.log("main.js代码后续运行")
