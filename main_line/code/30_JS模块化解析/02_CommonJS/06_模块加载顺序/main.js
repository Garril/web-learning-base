console.log("main")

require("./aaa")
require("./bbb")

// node 采用深度优先算法

// node同步的方式不适合浏览器端
// common.js 异步加载的实现：browserify.js