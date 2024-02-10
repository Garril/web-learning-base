# css little tip

<hr/>

## unset、initial、inhert、revert

下面的默认值的是属性的默认，而不是浏览器代理 agent 给的默认样式
unset 样式有继承就继承，没有就默认样式
inital 使用默认样式
inherit 继承

### inital

所有属性都默认

```css
.default {
  all: inital;
}
```

### revert

使用浏览器默认样式，回归用户代理的样式

```css
.default {
  all: revert;
}
```

## box-decoration-break

该属性的默认值：slice。
使用场景：有一篇文字，很长，长到盒子包裹不足，会自动换行，有一部分需要标重点，可能是加个了边框什么的
但是如果刚刚好重点的内容在换行的边界，边框会断掉，效果可能有点怪。所以，设置为

```css
.xx {
  -webkit-box-decoration-break: clone;
}
```

可以解决问题。换行的边界，当作两个不同的、独立的边框，不会断开。



## 绘制顺序

### 概念引入

1、可替换元素（类似img、input、textarea、select这种，其他都非可替换元素）

特点：元素本身和内容是分开渲染的，比如图片元素本身和他的src内容，input和对应value

2、堆叠上下文/层叠上下文

同一个堆叠上下文内，所有元素都是一层一层一起刷的

### 案例

```html
<img>
<div>
    <img src="#">
    <span>text</span>
</div>
```

假设一开始，第一个img是背景图，高200px，宽100vw。div是内容区，img和span是人头像和姓名。

给div设置margin-top为负数，会发现头像和名字整体，往上走，跑到第一个img去。为什么？

按照概念：首先最外层的img和div的元素，都属于同一层堆叠上下文，把他们本身画出来，从上到下排好序。margin-top为负数，div盖住了部分的img

然后把它们的内容，刷出来，第一个是img的src图片信息，然后是div内的头像信息。

### 解决方法

因为是同一个堆叠上下文才会这样交叉覆盖，分开就行

官方：修改transform、z-index等，都会设置一个新的独立的层叠上下文。
