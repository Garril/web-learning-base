/* 
  1、安装
    npm i -D webpack webpack-cli
  2、编辑配置文件
    module.exports = {
      entry: 'main.js',
      output: {
        filename: "bundle.js",
        path: path.join(__dirname,"./dist"),
      },
      module: {
        rules:[{
          test: /\.less&/i,
          use: ['style-loader','css-loader','less-loader']
        }]
      }
    }
  3、执行编译命令
    npx webpack

  核心流程--简化：
    1、入口处理，从配置的entry文件开始，启动编译流程
    2、依赖解析，从 entry文件起，根据 required 或者 import等语句找到依赖资源
    3、资源解析，根据 module配置，调用资源转移器，将png、css等非标准JS资源转译为JS内容
    （递归调用2、3，直到所有资源处理完毕 ----引用的文件中可能又有引用）
    4、资源合并打包，将转译后的资源内容打包为可以直接在浏览器运行的JS文件
    （插入连接时代码处理，代码混淆，压缩等操作都在这）
  
  因为配置类太多，以后分为两类：
    流程类 和 工具类

    在上面的 “核心流程--简化” 四个过程中用到的，都是流程类
    比如：
      1、输入：entry（入口）、context（从哪个文件去找资源）
      2、模块解析：resolve、externals
      3、模块转译：module
      4、后处理：optimization、mode、target

    如果是在主流程之外，提供更多工程化能力的配置项，就是配置类
  （看图 config.png）
*/
/* 
  学习webpack文章链接：
    https://github.com/Tecvan-fe/awesome-webpack-4plus
    https://webpack.wuhaolin.cn/
    https://survivejs.com/webpack/preface/
  新手：
    看基础点xmind.jpg
  大纲：
    https://gitmind.cn/app/doc/fac1c196e29b8f9052239f16cff7d4c7
*/