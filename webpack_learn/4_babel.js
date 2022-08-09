/* 
  一开始浏览器不支持es6特性
    1、安装
      npm i -D @babel/core @babel/preset-env babel-loader
    2、声明output
      文件路径如下：
        --src
          --index.js
        --webpack.config.js
      index.js文件内容：
        class Person {
          constructor() {
            this.name = "xxx"
          }
        }
        console.log((new Person()).name)
        const say = () => {}
    3、执行npx webpack
*/

// webpack.config.js文件：
const path = require("path");
module.exports = {
  entry: './src/index',
  output: {
    filename: "[name].js",
    path: path.join(__dirname,"./dist"),
  },
  module: {
    rules:[{
      test: /\.js$/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env']
            ]
          }
        },
      ]
    }],
  },
};
/* 
  babel具体有什么功能？
  babel与webpack分别解决了什么问题？为什么两者可以协作到一起？

  网站：
    babel-loader
      https://webpack.js.org/loaders/babel-loader/
    babel官网
      https://babeljs.io/
    @babel/preset-env   ---- babel的规则集，可以理解为提前打好包的一系列配置
      https://babeljs.io/docs/en/babel-preset-env
    @babel/preset-react   ---- 处理jsx
      https://babeljs.io/docs/en/babel-preset-react
    @babel/preset-typescript
      https://babeljs.io/docs/en/babel-preset-typescript
*/