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
