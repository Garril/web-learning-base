/* 
  命令行：
    npm i -g pnpm    --- 安装pnpm
    pnpm create vite   --- 初始化
    pnpm install      --- 安装依赖
    npm run dev       --- 启动

  vite：理解为开发时的node dev serve，把浏览器的请求进行承接，
        进行编译，然后将结果以浏览器可以识别的语法响应回去。
  无需打包项目源代码 ---没有以前bundle的开销
  天然的按需加载 ---一个文件就是一个请求
  可以利用文件级的浏览器缓存 ---现在模块的粒度到了文件的级别，当一个文件变更，不会导
                      致整个bundle失效，只是这一个请求失效，更细腻度的进行浏览器缓存。
  
  Vite 基于Esbuild的编译性能优化
    Esbuild --- 基于Golang开发的前端工具：
      能力如下：              对标
        1、打包器 Bundler  ---webpack
        2、编译器 Transformer ---babel
        3、压缩器 Minifier  ---terser

  Vite内置的功能，等价于：
    webpack、webpack-dev-server、css-loader、style-loader、
    less-loader、sass-loader、postcss-loader、file-loader、
    MiniCssExtractPlugin、HTMLWebpackPlugin。。。。。。
  demo如下：
*/
// webpack.config.ts
export default {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env','@babel/preset-typescript'],
            }
          }
        ]
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              // 开启 CSS Modules
              module: true
            }
          },
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              // 开启 CSS Modules
              module: true
            }
          },
          'postcss-loader',
        ]
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HTMLWebpackPlugin()
  ]
}

// 等价于 vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()]
})