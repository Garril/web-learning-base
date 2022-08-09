/* 
  处理css
    1、安装loader
      npm install -D css-loader style-loader
      or
      npm install css-loader style-loader --save-dev
    2、添加 module 处理css文件
      文件路径如下：
        --src
          --index.js
          --index.css
        --webpack.config.js
      index.js文件内容：
        const styles = require('./index.css');
        import styles from './index.css'
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
    // css处理器
    rules:[{
      test: /\.css/i,
      use: [
        'style-loader',
        'css-loader'
      ],
    }],
  },
};
