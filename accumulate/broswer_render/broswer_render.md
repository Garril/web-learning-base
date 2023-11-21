# `Broswer_render`

浏览器渲染原理
从浏览器输入到页面呈现：1、网络 2、渲染
网络进程 开一个线程去拿 `html`。生成一个渲染任务给消息队列，之后任务执行时，渲染主线程去渲染页面。

## 渲染的流水线

`HTML `字符串 -> 解析 `HTML` -> 样式计算 -> 布局
-> 分层 -> 绘制 -> 分块 -> 光栅化 -> 画 -> 像素信息

### 1、解析` HTML - Parse HTML`

生成 `DOM` 树 和 `CSSOM(CSS Object Model)` 树

#### `CSS`

每个 `css `文件对应一个 `CSStyleSheet`，最后生成一个 `StyleSheetList`（综合的，包含浏览器` css 样式、css 内部样式、css 外部样式`）对应的，每个选择器就是一个 `cssRules` 对象 => 成了对象，js 才能去获取去操作。

`document.styleSheets` 可以获取到数组 `StyleSheetList`

加规则：`document.styleSheets[0].addRule('div','border:2px solid red !important');`

在解析 HTML 时。遇到 `css` 代码怎么办？
=》 浏览器会启动一个预解析器“率先”下载和解析` CSS`

三个线程：
渲染主线程 =》 解析 `HTML` =》` CSSOM` => 解析 `HTML` =》 `DOM` =》 ....

预解析线程 =》 快速浏览 =》 解析 =》 ...

网络线程 =》 下载` CSS` =》 ...

顺序：
预解析线程先快速浏览（主线程也在跑，遇到 link 直接跳过，不需要暂停），找到 `CSS`，让网络线程去下载，预解析线程进行解析（这里只是做一些转换的工作，没有生成` CSSOM`）将结果丢给主线程，主线程去生成` CSSOM`。

解析过程遇到外部 `JS` 文件，处理也和上面一样，由预解析器去处理请求下载。

下载和解析是在其他线程完成的，所以` CSS` 不会阻塞主线程的进行。

#### `JS`

但是如果遇到的是` JS（Script 标签）`，不一样的是，主线程会停止。先等待预解析线程和网络线程将` js` 请求且传到渲染主线程，主线程启动 `V8 `去运行 `JS`，运行后再解析 `HTML`。（怕` js` 有改动当前 `dom`，所以需要暂停 --- `dom` 是一边解析一边生成的）

### 2、样式计算

生成了 `DOM` 树和 `CSSOM `树，但是需要知道 DOM 树的节点最终样式如何，所以需要计算样式`（red=>rgb，em=>rpx,...）`，根据 `CSSOM `将最终样式`（Computed Style）`附加到` DOM `树 上。
`methods: getComputedStyle`

可拓展：
层叠、继承、视觉格式化模型（盒模型、包含块...）

### 3、布局

计算样式后，需要进行布局，将节点的几何信息：
位置信息（相对包含块的位置进行设置）、尺寸信息
（`auto、100%`这样的，在布局后才知道）设置下来。

布局后，获取到的是 `Layout` 树，和` DOM `树不太一样（布局树需要可以找到所有节点的几何信息）
比如 `display:none`。`DOM `树有，布局树没有。
比如`::before`。`DOM `树没有，布局树有。
比如：

```html
<div>
  <p>a</p>
  b
  <p>c</p>
</div>
```

![image-20231001162018876](https://forupload.oss-cn-guangzhou.aliyuncs.com/imgs/image-20231001162018876.png)

对于` DOM` 是最简单的树，结构上和` vue` 的` vtree `差不多
而 `Layout` 树 有个规则：内容必须在行盒中 且 行盒和块盒不能相邻。所以会有图上的匿名行盒。

`Layout `树是一个` C++`对象（`Floating Object`），如果一个元素是浮动的，那么他就会生成一个同类型的对象。
布局树对象可以获取部分信息，比如：`document.body.clientWidth/clientHeight/... `（用的 `document.body `的）

### 4、分层

做完布局后，没有直接渲染，而是进行分层` Layer`，做一个优化。
好比页面为一张贴纸，分为多个层（不会分太多），这样互不影响，可以进行局部替换重渲染，不需要全部进行重渲染。
F12 可以打开图层。

滚动条、堆叠上下文、`transform、opacity` 等样式都或多或少的影响分层的结果，也可以通过 `will-changed `属性更大程度去影响分层结果（性能优化用）。（滚动条他单独分了一层）

### 5、绘制

主线程给每个层，单独生成绘制的指令集（和 `canvas` 用的都是浏览器内核里的绘制功能）描述这一层怎么画出来。

### 1~5 小结

渲染主线程到这里就结束了，其余工作交给其他线程去做了。
渲染主线程 =》` parse`（生成 `DOM` 和 `CSSOM` 树）=》 style（样式计算，拿到整合了样式的 DOM 树，每个节点都有` Computed Style`）=》 `layout`（布局，生成布局树，含每个节点的几何信息）=》`Layer`（根据布局树分层）=》`Paint`（给分出来的每一层生成绘制指令）

### 其他线程

### 6、分块

分块：`Tiling`

渲染主线程完成`Paint`的指令过后（绘制完成后）主线程会把绘制信息交给 合成线程，剩余工作由合成线程完成。

分块会将每一层分为很多个小的区域。

（合成线程也在渲染进程中）

```css
合成线程 => Tiling => Tiles => ...
而Tiling时会启动多个分块器（启动多个线程，同时进行），提高分块的过程。
```

分块完成后，进入光栅化



### 7、光栅化

`raster`

合成线程把块信息给`GPU`进程，以极快的速度完成光栅化

`GPU`进程 启动多线程完成光栅化，优先处理靠近视口区域的块。

（用到`GPU`加速）

得到的是 一块块的位图（位置信息 ---- 二维数组）



### 8、画

`draw`

合成线程拿到每个层，每个块的位图后，生成一个个 [指引 (`quad`)]信息（在这里进行`transform`后信息的确定---矩阵变换 ==》 **因为`transform`变形发生在合成线程，与渲染主线程无关，所以它效率高**）

合成线程计算出每个位图在屏幕上的位置，交给`GPU`进程进行最终呈现（`GPU`进程交给硬件，合成线程在渲染进程，这个沙盒中，没法进行系统功能调用，所以这里使用`GPU`移接）。

### 1~8流程图

![image-20231102015313521](https://forupload.oss-cn-guangzhou.aliyuncs.com/imgs/image-20231102015313521.png)



## 面试题

### `reflow`

本质：重新计算`layout`树

触发：修改和几何尺寸信息相关的东西，需要重新计算布局树时，会引发`layout`

```css
渲染主线程 --- parse --- style --- layout --- layer --- paint -->
(合成线程)的 tiling --- raster --- draw
在 parse和style之间,传入width:300px;
会触发后面的流程的重运行
```

连续的多个改变导致布局树反复计算，浏览器会合并这些操作，当`JS`代码全部完成后再进行统一计算。所以改动属性造成的`reflow`是**异步完成**的。

因此，当`JS`获取布局属性时，就可能造成没办法获取到最新的布局信息。

浏览器也决定，获取属性会立即`reflow`(设置属性不会立即`reflow`)



### `repaint`

触发：和几何信息无关，修改颜色背景啥的可见样式

`reflow`一定引起`repaint`

```css
渲染主线程 --- parse --- style --- layout --- layer --- paint  -->
(合成线程)的 tiling --- raster --- draw
在 parse和style之间,传入color:red;
触发（style、paint、tiling、raster、draw）
```



### 为什么`transform`效率高

```css
渲染主线程 --- parse --- style --- layout --- layer --- paint  -->
(合成线程)的 tiling --- raster --- draw
在 parse和style之间,传入transform;

前面几乎可以全跳过，只影响最后的draw阶段，transform的变化几
乎不会影响主线程，反之，渲染主线程无论如何忙碌也不会影响transform的变化。
animation也是。
```

可以写一个`demo`测试

写一个按钮，绑定一个死循环点击事件

```js
function delay(duration) {
    const start = Date.now();
    while(Date.now() - start < duration) {}
}
btn.onclick = function() {
    delay(4000);
}
```

写两个`div`给他们写上不一样的`animation`

```css
@keyframes move1 {
    to {
        transform: translate(100px);
	}
}
@keyframes move2 {
    to {
        left: 100px;
	}
}
```

`left`是一定会引起`reflow`,而`transform`只影响合成线程的`draw`

会看到点击后，只有`transform`不卡。
