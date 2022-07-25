// npm install xxx依赖后，这个依赖其实是在ndoe_modules中的
// 你在终端中输入的有关webpack的操作，他会到操作系统环境变量去找
// 而不是说看你项目自己内部安装了多少版本的webpack
// 通过--version去验证
// 想要使用 node_modules中的 webpack，就可以利用npx

/**
 *  运行脚本配置 scripts 中，可以配置下：
 *  "why": "webpack --version"
 *  通过  npm run why 找到本地的webpack版本
 *  或者 直接 npx webpack --version
 */