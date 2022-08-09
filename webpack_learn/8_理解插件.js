/* 
  插件：我只做最核心的部分，但是我开放了一系列的
        拓展方式，你可以在我的框架内改细节。
        不会说我的项目源码太大太复杂，你觉得学习成
        本太高，不想来开源贡献。
        （对扩展开放，对修改封闭。）
  webpack本身的很多功能，都是插件实现的。
  一般插件的使用： require导入，plugins中 new插件的实例

  理解插件：
    在写一个插件或者看插件源码的时候，需要关注： 
    1、时机，compier.hooks.compilation ----钩子什么时候触发
    2、参数，compilation等 ----钩子能拿到什么参数对象
    3、交互，dependencyFactories.set ----在钩子回调里面怎么去和webpack其他的上下文内容交互
  思考题：
    loader与插件有什么区同点？
    “钩子”有什么作用？如何监听钩子函数？
  参考：
    https://mp.weixin.qq.com/s/tXkGx6Ckt9ucT2o8tNM-8w
    https://mp.weixin.qq.com/s/SbJNbSVzSPSKBe2YStn2Zw
*/