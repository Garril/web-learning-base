/* 
  作用：自动帮我们生成一个html文件
      ---- 可以在下面配置设置html的属性
      ---- 不需要手动引入大量的css/js
    1、安装
      npm i -D html-webpack-plugin
    2、声明output
      文件路径如下：
        --src
          --index.js
        --webpack.config.js
    3、执行npx webpack
*/

// webpack.config.js文件：
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: './src/index',
  output: {
    filename: "[name].js",
    path: path.join(__dirname,"./dist"),
  },
  plugins: [new HtmlWebpackPlugin()]
};
/* 
  相比于手工维护HTML内容，这种自动生成的方式的优缺点？
    https://webpack.js.org/plugins/html-webpack-plugin/
*/