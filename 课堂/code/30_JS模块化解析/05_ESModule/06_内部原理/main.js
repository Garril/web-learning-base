import { name, age } from './foo.js'

console.log(name, age)

setTimeout(() => {
  console.log(name, age)
}, 2000)


// commonjs本质，对象的赋值，通过require把你导出的对象，
// 赋值到另一个模块里面的某一个标识符（这里的赋值是赋的地址，指向同一对象）

// ES Module的原理
/*
分三个阶段，
1.构建：
根据地址找到js文件，下载到浏览器内，如果js有依赖其他模块，那就继续下载，
之后将其解析成模块记录Module Record的数据结构

2. 实例化
对模块记录进行实例化，并且分配内存空间，解析模块的导入和导出语句，把模块指向对应内存地址
（第二步的时候，给了你内存，但是代码还是没运行的，export { name,age }，这里name和age都是指向undefined
相当于他只会解析import和export
）
3. 运行
运行代码，计算值，并且将值填充到内存地址中

阶段一详细（图，看ppt）
<script src="main.js" type="module">
到html的script的时候，main.js先被获取，然后静态解析,parse成一个Module Record
Module Record里面RequestedModules会记载你import了什么模块，
然后去加载那些模块，你import的模块同样也会转成Module Record
那么，加载的模块会不会同时引入同一个模块，加载两次呢，不会，他有一个Module Map，统一记录了已经请求的模块（缓存）

阶段二详细
实例化：把之前js转化的对应的Module Record实例化，（实例化的时候会解析Module Record是否有导出/导入些什么属性）
注意：导出导入暂时都一样！
都会生成Module Environment Record对象，对象中有Bindings，记录了对应导出的/导入的属性/方法，且值均为undefined
但是这一阶段，
1. 内存空间已经帮你分配好了，
2. 所有的Module Environment Record对象中的 同名属性，指向的是内存中的同一块地址

阶段三详细（求值阶段）
执行代码，把值写入到内存中。
（import module不可以修改import的值，export module 可以修改export的值）

（ESModule静态分析：解析Module Record,实例化成Module Environment
  动态运行： 赋值）
*/