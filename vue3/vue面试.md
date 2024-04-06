### MVVM MVC

```css
MVVM和MVC，MVC随着业务需求越来越大，去实现数据绑定的时候，会越来越复杂，
你需要一个东西能帮你从data到视图的中间操作，就出现了MVVM,


怎么设计MVVM，数据存放在哪里
哪些数据放MV哪些放M：视图数据和逻辑数据

视图数据，页面展示的，我需要动态改变的（MV）
逻辑数据，中间转换的，过程中需要的，但是不一定要呈现在页面上的（M）
（是一个个人理解的两者的区别，但是不是演变的过程）
model是指的什么？他有的数据不放在model为什么？
1979，MVC出的时候，没有后端，没有前端
1990年，出了MVP，2005年MVVM出现
（并不只是业务需求不够了所以变了）

https://blog.csdn.net/nawuyao/article/details/50386409
```

### 组件通信

### ![image-20220909162921334](http://forupload.oss-cn-guangzhou.aliyuncs.com/img/image-20220909162921334.png)

```css
父子组件
	props / $emit / $parent / ref / $attrs
兄弟组件
	$parent / $root / eventbus / vuex
跨层级关系
	eventbus / vuex / provide + inject
```

![image-20220909162839094](http://forupload.oss-cn-guangzhou.aliyuncs.com/img/image-20220909162839094.png)

### ref

![image-20220916102505542](http://forupload.oss-cn-guangzhou.aliyuncs.com/img/image-20220916102505542.png)

```css
ref 有三种用法：
　　1、ref 加在普通的元素上，用this.$refs.name 获取到的是dom元素
　　2、ref 加在子组件上，用this.$refs.name 获取到的是组件实例，可以使用组件的所有方法。
　　3、如何利用 v-for 和 ref 获取一组数组或者dom 节点
注意：
　　1、ref 需要在dom渲染完成后才会有，在使用的时候确保dom已经渲染完成。
	 比如在生命周期 mounted(){} 钩子中调用，或者在 this.$nextTick(()=>{}) 中调用。
　　2、如果ref 是循环出来的，有多个重名，那么ref的值会是一个数组 ，
	 此时要拿到单个的ref 只需要循环就可以了。
```

### v-if 和 v-for

优先级是高？vue2和vue3有什么差别？

![image-20220916114303884](http://forupload.oss-cn-guangzhou.aliyuncs.com/img/image-20220916114303884.png)

![image-20220909163321882](http://forupload.oss-cn-guangzhou.aliyuncs.com/img/image-20220909163321882.png)

### 生命周期

```js
// 补充内容看 面试1
```

![image-20220909163344256](http://forupload.oss-cn-guangzhou.aliyuncs.com/img/image-20220909163344256.png)

![image-20220909163543563](http://forupload.oss-cn-guangzhou.aliyuncs.com/img/image-20220909163543563.png)

```css
initLifecycle：生命相关的属性和方法，我的parent、root、children这些属性的初始化
initEvents：自定义事件的监听
initRender：挂载一些渲染函数，提前做好准备，后续执行的时候，有这些方法可以调用
initInjections：注入组件传进来的一些数据
initState：初始化好自己的状态
（所以大家才会在created里面十分方便的使用自己定义的data）
```

```css
vue2     ---------------------------------- vue3

beforeCreate                            ->   setup()
Created                                 ->   setup()
beforeMount                             ->   onBeforeMount
mounted                                 ->   onMounted
beforeUpdate                            ->   onBeforeUpdate
updated                                 ->   onUpdated
beforeDestroyed                         ->   onBeforeUnmount
destroyed                               ->   onUnmounted
activated                               ->   onActivated
deactivated                             ->   onDeactivated
```

### v-model双绑

看面试1.markdown

### Vue中如何拓展一个组件

![image-20220909164900289](http://forupload.oss-cn-guangzhou.aliyuncs.com/img/image-20220909164900289.png)

### 为什么不推荐子组件改父组件数据

单向数据流

![image-20220909165838850](http://forupload.oss-cn-guangzhou.aliyuncs.com/img/image-20220909165838850.png)

### v-dom

vdom
存在的两个原因：跨平台（dom-tree怎么转换就是自己框架的事情了）、不用全量更新，只需要更新一小部分，数据发生改变的时候不需要把整个页面都re-render
怎么生成vdom？vdom-tree中某个节点发生改变后，怎么去做diff
vdom内部的一些静态节点怎么去pass掉，static节点怎么去跳过，不去对比
node需要设置哪些属性去实现diff算法

![image-20220907154939572](http://forupload.oss-cn-guangzhou.aliyuncs.com/img/image-20220907154939572.png)

### 项目权限

路由权限（页面权限） 和 按钮权限

路由权限

前后端权限管理，优缺点 在于可维护性上，前端 `this.$router.addRoutes(asyncRoutes)`实现后，每次加新角色，新页面，都得重新打包部署，不然更新不了，虽然实现简单
后端实现就没有这个问题，通过专门的角色和权限管理页面，配置页面和按钮权限信息
到数据库

按钮权限

按钮权限的控制通常会实现一个指令，例如：`v-permission`,将按钮要求角色通过值

传给`v-permission`指令，在指令的`mounted`钩子中可以判断当前用户角色和按钮是否存在交集

有则保留按钮，无则移除

![image-20220907154858187](http://forupload.oss-cn-guangzhou.aliyuncs.com/img/image-20220907154858187.png)

![image-20220907154903460](http://forupload.oss-cn-guangzhou.aliyuncs.com/img/image-20220907154903460.png)

### 响应式

![image-20220907154919962](http://forupload.oss-cn-guangzhou.aliyuncs.com/img/image-20220907154919962.png)

![image-20220907154927954](http://forupload.oss-cn-guangzhou.aliyuncs.com/img/image-20220907154927954.png)

### diff

![image-20220907154958232](http://forupload.oss-cn-guangzhou.aliyuncs.com/img/image-20220907154958232.png)

```css
vue3——diff算法补充说明：
	vue3 diff算法在初始化的时候会给每个虚拟节点添加一个patchFlags，patchFlags就是优化的标识。
	只会比较patchFlags发生变化的vnode,进行更新视图，
	对于没有变化的元素做静态标记，在渲染的时候直接复用。

vue2双端diff
	https://juejin.cn/post/7078187020832473125

React、Vue2.x、Vue3.x
	https://juejin.cn/post/6844904145879564296
```

### vue3新特性

![image-20220907160104097](http://forupload.oss-cn-guangzhou.aliyuncs.com/img/image-20220907160104097.png)

![image-20220907160113463](http://forupload.oss-cn-guangzhou.aliyuncs.com/img/image-20220907160113463.png)

### 动态路由

![image-20220907161758629](http://forupload.oss-cn-guangzhou.aliyuncs.com/img/image-20220907161758629.png)

### 实现vue-router

![image-20220907161826083](http://forupload.oss-cn-guangzhou.aliyuncs.com/img/image-20220907161826083.png)

![image-20220907161838665](http://forupload.oss-cn-guangzhou.aliyuncs.com/img/image-20220907161838665.png)

![image-20220907161846132](http://forupload.oss-cn-guangzhou.aliyuncs.com/img/image-20220907161846132.png)

### key的作用

![image-20220907204821558](http://forupload.oss-cn-guangzhou.aliyuncs.com/img/image-20220907204821558.png)

### transition（补充）

![image-20220907204923787](http://forupload.oss-cn-guangzhou.aliyuncs.com/img/image-20220907204923787.png)

```css
https: //juejin.cn/post/6919404953203277832;;
```

![image-20220907204937719](http://forupload.oss-cn-guangzhou.aliyuncs.com/img/image-20220907204937719.png)

### nextTick

![image-20220907204840413](http://forupload.oss-cn-guangzhou.aliyuncs.com/img/image-20220907204840413.png)

![image-20220908010845315](http://forupload.oss-cn-guangzhou.aliyuncs.com/img/image-20220908010845315.png)

### watch 和 computed

![image-20220908180328160](http://forupload.oss-cn-guangzhou.aliyuncs.com/img/image-20220908180328160.png)

watch的执行，会在组件更新之前先进入队列，即：watch的执行，优先于组件更新

### 父子组件的创建和挂载

![image-20220910010418304](http://forupload.oss-cn-guangzhou.aliyuncs.com/img/image-20220910010418304.png)

### 怎么缓存当前组件？缓存后怎么更新？

![image-20220910014136295](http://forupload.oss-cn-guangzhou.aliyuncs.com/img/image-20220910014136295.png)

### 如何从0到1构建一个Vue项目

```js
// 看看vue3的构建流程
```

![image-20220910120513833](http://forupload.oss-cn-guangzhou.aliyuncs.com/img/image-20220910120513833.png)

### vue的最佳实践

![image-20220910121206393](http://forupload.oss-cn-guangzhou.aliyuncs.com/img/image-20220910121206393.png)

### 对vuex的理解

![image-20220910152126866](http://forupload.oss-cn-guangzhou.aliyuncs.com/img/image-20220910152126866.png)

### 从template到render

![image-20220910155109671](http://forupload.oss-cn-guangzhou.aliyuncs.com/img/image-20220910155109671.png)

### 挂载过程发生了什么？

![image-20220910205023770](http://forupload.oss-cn-guangzhou.aliyuncs.com/img/image-20220910205023770.png)

### vue3.0设计目标是什么？做了什么优化？

![image-20220912000501053](http://forupload.oss-cn-guangzhou.aliyuncs.com/img/image-20220912000501053.png)

### Vue性能优化方法

![image-20220912004019676](http://forupload.oss-cn-guangzhou.aliyuncs.com/img/image-20220912004019676.png)

### Vue2和Vue3根节点的差别

![image-20220912010717498](http://forupload.oss-cn-guangzhou.aliyuncs.com/img/image-20220912010717498.png)

### Vuex中的module

![image-20220912025409936](http://forupload.oss-cn-guangzhou.aliyuncs.com/img/image-20220912025409936.png)

### 怎么样实现路由懒加载？

![image-20220912142230354](http://forupload.oss-cn-guangzhou.aliyuncs.com/img/image-20220912142230354.png)

### ref和reactive的异同

![image-20220912165636113](http://forupload.oss-cn-guangzhou.aliyuncs.com/img/image-20220912165636113.png)

### `watch`和`watchEffect`的异同

![image-20220913004819457](http://forupload.oss-cn-guangzhou.aliyuncs.com/img/image-20220913004819457.png)

### SPA和SSR的区别

![image-20220913011710758](http://forupload.oss-cn-guangzhou.aliyuncs.com/img/image-20220913011710758.png)

### vue-loader是什么？有什么作用？

![image-20220913141242349](http://forupload.oss-cn-guangzhou.aliyuncs.com/img/image-20220913141242349.png)

### 自定义指令

![image-20220913164835338](http://forupload.oss-cn-guangzhou.aliyuncs.com/img/image-20220913164835338.png)

### $attrs 和 $listeners

![image-20220913225043493](http://forupload.oss-cn-guangzhou.aliyuncs.com/img/image-20220913225043493.png)

### v-once使用场景

![image-20220917103216348](http://forupload.oss-cn-guangzhou.aliyuncs.com/img/image-20220917103216348.png)

### vue中递归组件

![image-20220917105524822](http://forupload.oss-cn-guangzhou.aliyuncs.com/img/image-20220917105524822.png)

### 异步组件

![image-20220917120343404](http://forupload.oss-cn-guangzhou.aliyuncs.com/img/image-20220917120343404.png)

```css
defineAsyncComponent接收参数为：source，
即：接收加载器或者组件定义，返回一个全新组件（高阶组件）
根据当前加载状态的不同，去做不同的渲染结果
其中最重要的是source对象的loader方法（代表什么方式加载组件配置）
```

### 处理vue中错误

![image-20220917171650369](http://forupload.oss-cn-guangzhou.aliyuncs.com/img/image-20220917171650369.png)

### 从0写一个vuex

![image-20220917205458753](http://forupload.oss-cn-guangzhou.aliyuncs.com/img/image-20220917205458753.png)

### vuex中actions和mutations区别

![image-20220918173119369](http://forupload.oss-cn-guangzhou.aliyuncs.com/img/image-20220918173119369.png)

### 渲染大量数据怎么优化

![image-20220918174754107](http://forupload.oss-cn-guangzhou.aliyuncs.com/img/image-20220918174754107.png)

### 如何监听vuex数据变化

![image-20220918203203776](http://forupload.oss-cn-guangzhou.aliyuncs.com/img/image-20220918203203776.png)

### router-link和router-view

![image-20220918212537104](http://forupload.oss-cn-guangzhou.aliyuncs.com/img/image-20220918212537104.png)

### vue3的性能提升体现在哪

![image-20220919010229631](http://forupload.oss-cn-guangzhou.aliyuncs.com/img/image-20220919010229631.png)

### Vue3为什么要用proxy代替defineProperty

![image-20220919013115415](http://forupload.oss-cn-guangzhou.aliyuncs.com/img/image-20220919013115415.png)

```css
在vue3 中
    1、Vue3是通过Object.define.proxy 对对象进行代理，从而实现数据劫持。
	2、使用Proxy 的好处是它可以完美的监听到任何方式的数据改变，
		唯一的缺点是兼容性的问题，因为 Proxy 是 ES6 的语法

Vue3.0 摒弃了 Object.defineProperty，改为基于 Proxy 的观察者机制探索。

首先说一下 Object.defineProperty 的缺点：
	1、Object.defineProperty 无法监控到数组下标的变化，
	导致直接通过数组的下标给数组设置值，不能实施响应。
	this.$set()解决  （有Vue类import了，可以使用Vue.set，用法一样，组件内还是this.$set）

	2、Object.defineProperty 只能劫持对象的属性，
	因此我们需要对每个对象的每个属性进行遍历。
	Vue2.X 里，是通过递归 + 遍历 data 对象来实现对数据的监控的，
	如果属性值也是对象那么需要深度遍历，显然如果能劫持一个完整的对象才是更好的选择。

而要取代它的 Proxy 有以下两个优点:
	1、可以劫持整个对象，并返回一个新对象。
	2、有多种劫持操作(13 种)

补充：
    Proxy 用于创建一个对象的代理，从而实现基本操作的拦截和自定义
	（如属性查找、赋值、枚举、函数调用等）。

	Proxy 是 ES6 新增的一个属性，翻译过来的意思就是代理，
	用在这里表示由它来“代理”某些操作。
	Proxy 让我们能够以简洁易懂的方式控制外部对象的访问，
	其功能非常类似于设计模式中的代理模式。

proxy的优点：
    defineProperty只能监听某个属性，不能对全对象进行监听；
    可以省去for in 、闭包等内容来提升效率（直接绑定整个对象即可）；
    可以监听数组，不用再去单独的对数组做特异性操作，
    vue3可以检测到数组内部数据的变化。

https://blog.csdn.net/weixin_42545469/article/details/119203249
```

### History和Hash模式有什么区别

![image-20220919020221254](http://forupload.oss-cn-guangzhou.aliyuncs.com/img/image-20220919020221254.png)

```js
/*
补充：
问题1：
	为啥路由会存在params参数和query参数 两种方式 
	这两个有啥优缺点么 什么时候用 为啥要有两个传递的方法呀 
答：
	这其实是想区路径参数和查询参数。前者形如：/abc/:param，后者形如：/abc?param=xxx
	一般使用的时候：跳页面查询用query，页面内可以用params
	query方式你可以通过url获取参数，params只能通过路由，切换标签页的时候query就能派上用场了

问题2：
	hash不是监听hashchange嘛？
答：
	新版中已经修改
	
情景：
	history路由虽然拦截了默认行为，但是浏览器知道跳转，会进行回收，
	hash模式是早期的兼容低版本浏览器的hack方式，浏览器并不知道页面跳转。
	案例：最近写Vue3的项目发现页面反复跳转越来越卡，然后发现内存泄露，开始以为是路由模式问题，
	改成history好很多，强制回收了一部分，但是还是内存泄露，
	然后提了issu给了路由作者，路由作者发现是vue3的问题，然后转给了vue。v-if也存在内存泄露
*/
```

### 什么场景下会用到嵌套路由

![image-20220919022718550](http://forupload.oss-cn-guangzhou.aliyuncs.com/img/image-20220919022718550.png)

### 页面刷新后vuex的state数据丢失怎，怎么处理？

![image-20220919025352985](http://forupload.oss-cn-guangzhou.aliyuncs.com/img/image-20220919025352985.png)

### vuex的缺点

![image-20220919155540883](http://forupload.oss-cn-guangzhou.aliyuncs.com/img/image-20220919155540883.png)

### Composition API和Options API

![image-20220919164449685](http://forupload.oss-cn-guangzhou.aliyuncs.com/img/image-20220919164449685.png)

### vue2和vue3的区别

```css
https://blog.csdn.net/weixin_53667605/article/details/126949636#:~:text=Vue2,%E4%B8%8Evue3%20%E6%9C%80%E5%A4%A7%E7%9A%84%E5%8C%BA%E5%88%AB%E6%98%AFvue2%E4%BD%BF%E7%94%A8%E9%80%89%E9%A1%B9%E7%B1%BB%E5%9E%8Bapi%EF%BC%8C%E5%AF%B9%E6%AF%94vue3%E5%90%88%E6%88%90%E5%9E%8Bapi%E3%80%82
```

### 为什么Vue3不使用时间切片

```css
https: //juejin.cn/post/6844904134945030151;;
```

### vite和webpack的区别

```css
https: //juejin.cn/post/6893699833425559559;;
```

### updated方法什么时候触发

```

```

### 对等依赖报错

主项目通过

```js
const app = createApp(App);
app.use(plginName);
```

去安装插件

可能插件写法为:

```js
export default {
  install(Vue, options) {
    Vue.prototype.abc = function () {};
  },
};
```

这样没问题，插件没有导入vue，不需要直接依赖vue，我们的主项目才是依赖vue。
但是他会与vue的具体版本有产生关联，比如上面是vue2的写法，vue3的写法如下：

```js
export default {
  install(app) {
    app.globalProperties.abc = function () {};
  },
};
```

那么可能插件就只支持vue2/3。
插件作者在发布包时，会在package.json中加入
对等依赖（插件没有用到vue，但是用我插件时，需要是2.0版本的vue）：

```json
"peerDependencies": {
  "vue": "2.0"
}
```

当主项目vue和vue插件的对等依赖，版本不一致，冲突了，就会报错。

基本都是去升级插件，让他支持当前主项目vue版本，如果没有就换插件。
除非他插件是支持vue3的，只是配置的时候，把对等依赖配置为了2.0

```js
export default {
  install(app) {
    Vue.abc = function () {};
  },
};
```

这种情况，可以：
npm i --legacy-peer-deps
不报错安装。
