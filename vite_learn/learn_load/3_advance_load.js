/* 
  文档：
  Rollup：
    https://rollupjs.org/guide/en/
  Esbuild：
    https://esbuild.docschina.org/
  

  ！！！插件开发！！！
  为什么需要插件机制？
    在vite中：1是要抽离核心的逻辑，dev server，server端的能力，抽出来，
    把构建相关的能力封装为一个个的插件，达到一个解耦的效果，易于拓展，社区容易贡献。
  
  简单的插件生命周期hook，看图 vite_plugin_hook.png

  简单demo，看vite-project的myPlugin.js 和 vite.config.ts

  文档：
    vite插件开发文档
      https://cn.vitejs.dev/guide/api-plugin.html
    复杂度较低的插件 ---json加载插件
      https://github.com/vitejs/vite/blob/main/packages/vite/src/node/plugins/json.ts
    复杂度中等的插件 ---Esbuild接入插件
      https://github.com/vitejs/vite/blob/main/packages/vite/src/node/plugins/esbuild.ts
    复杂度较高的插件 ---官方React插件
      https://github.com/vitejs/vite/tree/main/packages/plugin-react
    

  =================================================================
  代码分割（拆包）
    以前的js一般都打包为一个bundle，浏览器就没办法利用并发请求的优势
    缓存的复用率低，但凡一个文件改动，整体都失效，重请求
    拆包后：
      只需要变动改动的小组件，更好的缓存复用的效果。页面加载速度up！
    
    vite的代码分割十分依赖于 Rollup 的打包功能
    文档 ---配置 Rollup 的代码分割：
      https://cn.vitejs.dev/config/build-options.html#build-rollupoptions
      https://rollupjs.org/guide/en/#outputmanualchunks


  =================================================================
  Js编译工具（Babel）
    与vite关系并不大，但是前端必备
    Babel原理，看图 babel原理.png

    文档：
      https://babeljs.io/docs/en/
      https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md

    同样效果的---语法安全降级
    vite的实现是：
      上层解决方案： @vitejs/plugin-legacy
      底层原理： 1、借助 Babel 进行语法自动降级
                2、提前注入Polyfill实现，如core-js、regenerator-runtime
    文档：
      https://babeljs.io/docs/en/babel-preset-env （@babel/preset-env文档）
      https://github.com/vitejs/vite/tree/main/packages/plugin-legacy  （vite官方降级插件文档）
      
  =================================================================
  服务端渲染 SSR
    用于提升首屏渲染和SEO搜索引擎优化
    看图ssr.png
  
*/