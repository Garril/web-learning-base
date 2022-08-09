/* 
  Loader的作用？为什么需要css-loader、style-loader？
    loader做内容的转换。
  与旧时代在HTML文件中维护css相比，这种方式的优劣处？
  Less、Sass、Stylus这类CSS预编译框架，如何在webpack接入这些工具？
  
  文章
  CSS-loader：
    https://github.com/webpack-contrib/css-loader
  如何写loader：
    https://mp.weixin.qq.com/s/TPWcB4MfVrTgFtVxsShNFA
  style-loader：
    https://webpack.js.org/loaders/style-loader/
*/

/*
  ==============================================================
  less的使用，需要3个loader，他们有什么用？
  1、3个loader的作用
    less-loader：实现less到css的转换
    css-loader：将css包装成类似module.exports = "${css}"的内容，
      包装后的内容符合js语法
    style-loader：将css模块 包进require语句，并在运行时调用injectStyle等
      函数将内容注入到页面的style标签
  2、loader的链式调用 ----前面输出的后面输入
    在运行的时候，有一个loader-runner的库是处理loader的运行流程。
    简单来说：运行less文件时，会到一个webpack的make函数，先调用
    less-loader，将生成的css代码丢到css-loader去执行，
    css-loader执行后拿到一段字符串作为结果，扔到style-loader去执行
    最后拿到一段，包含injectStyle的函数（运行时将代码插入html的功能）
    看图，loader_link_transfer.png

  ==============================================================
  如何编写loader？
    https://mp.weixin.qq.com/s/TPWcB4MfVrTgFtVxsShNFA
  loader的输入是什么？要求的输出是什么？
  loader的链式调用是什么意思？如何串联多个loader？
  loader中如何处理异步场景？
  
  常用loader：
    JS
      -- babel-loader
      -- eslint-loader      
      -- ts-loader
      -- buble-loader
      -- vue-loader
      -- angular2-template-loader
    Css
      -- css-loader
      -- style-loader      
      -- less-loader
      -- sass-loader
      -- stylus-loader
      -- postcss-loader
    HTML
      -- html-loader
      -- pug-loader      
      -- posthtml-loader
    Assets
      -- file-loader
      -- val-loader      
      -- url-loader
      -- json5-loader
*/