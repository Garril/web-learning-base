/* 
  HMR -- Hot Module Replacement --- 模块热替换
  1、配置项
*/
module.exports = {
  devServer: {
    hot: true
  },
  watch: true
};
// watch: true 表示webpack会持续的去监听文件的变化，持续的构建
/* 
  2、更换命令为：npx webpack serve
    而不是之前的 npx webpack
  
  链接：HMR 原理全解析
      https://mp.weixin.qq.com/s/cbYMpuc4hnV9NA4VfqJLvg

*/