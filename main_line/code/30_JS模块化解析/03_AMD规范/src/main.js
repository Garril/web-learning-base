require.config({
  baseUrl: '', // 默认为： ./src
  // 记得上面加了baseUrl，置为空
  paths: {
    foo: "./src/foo", // 会自动加.js后缀
    bar: "./src/bar" // paths这里只算 注册，真正加载执行，还要下面require
  }
})

// 下面表示：当拿到模块后就，回调函数，参数为模块导出的东西
require(["foo", "bar"], function(foo) {
  console.log("main:", foo)
})
