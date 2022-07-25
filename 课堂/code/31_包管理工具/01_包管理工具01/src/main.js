import axios from 'axios'
import Vue from 'vue'


axios.get("url").then(res => {

})

const app = new Vue({})


/**
 * 打包一个工具上传到npmjs.org,别人npm install 工具名，然后main.js应用安装
 * 这样你的工具被安装到对于的node_modules中，他会自动找到对于目录下的index.js
 * 但是如果你的工具代码不是写在index.js而是在main.js中的呢？
 * 那么就需要package.json 中，写入一个属性，"main",他的值就代表工具的入口
 * 比如main:"main.js" ，表示导出在main.js中
 * 还有private:true，可以防止误上传
 */

/*
3.2.1  X.Y.Z ,
X 主版本号，做了不可兼容的API修改
Y 次版本号，做了向下兼容的功能性新增（兼容之前版本，然后添加了新特性）
Z 修订号，没有新功能，修复了之前的bug（patch打补丁）
  ~：x和y不变，z最新
  ^：x保持不变，y和z最新
*/