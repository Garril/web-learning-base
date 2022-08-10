/* 
  结合vite整体架构.png的图进行理解
    关键技术：依赖预打包
    （Development阶段）为什么要进行预打包Pre-bundle？
      1、避免node_modules过多的文件请求 ---（因为他按需引入的特点，请求很多）
      2、将CommonJS格式转换为ESM格式 --- 部分node_modules里面的代码格式浏览器跑不了（比如CommonJs）
    实现原理：
      1、服务启动前扫描代码中用到的依赖
      2、用Esbuild对依赖代码进行预打包
      3、改写import语句，指定依赖为预构建产物路径
        eg： import React from "react";     被改写为
          import React from '/node_modules/.vite/react.js'

    关键技术：单文件的编译
      用 Esbuild 编译 TS/JSX (Esbuild他真的太快了！)
      局限性：
        1、不支持类型检查（这也就是为什么vite在生产环境构建的时候，要调用一次tsc）
        2、兼容性问题，只能把语法降到ES6，不支持降到ES5

    关键技术： 代码压缩
      Esbuild作为默认压缩工具，替代传统的Terser、Uglify.js等压缩工具
      （webpack生产环境打包时，经常卡在 92% ---压缩工具在工作）
    
    关键技术： 插件机制
      开发阶段 -> vite开发了 Plugin Container，模拟 Rollup 的插件机制
      生产环境 -> 直接使用 Rollup

    插件兼容性查询网站：
      https://vite-rollup-plugins.patak.dev/
*/