/*
    require(X)
1. X为Node核心模块，直接返回核心模块，停止查找
  比如path
2. X为本地路径，有后缀直接按照文件名找
  没有后缀就先找文件X，再依次找X.js、X.json、X.node文件
  都没有找到，就将X作为一个目录，查找目录下的index.js、index.json、index.node文件
3. X非核心模块，非路径
  依据module.paths（可打印），从上到下（文件逐渐往上层）找node_modules中是否有
  比如axios
*/