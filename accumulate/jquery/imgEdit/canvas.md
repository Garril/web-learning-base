# canvas

<hr/>

## 图片不清晰

需要关注三个点

1、图片 的`naturalWidth、naturalHeight`原始尺寸

2、图片  的样式尺寸

3、缩放倍率（`window.devicePixelRatio   DPR`） 1就是1倍（会告诉你最终的缩放倍率）

保持：原始尺寸 = 样式尺寸 * 缩放倍率   就可以保持图片清晰度

canvas其实差不多，不过

```js
const cvs = document.getElementById('mycanvas');
const ctx = cvs.getContext('2d');
```

通过

```js
cvs.width = 400;
cvs.height = 400;
```

可以设置图片的原始尺寸。

style中就设置样式尺寸。



```js
// 若固定400*400，需要乘以DPR
cvs.width = 400 * DPR;
cvs.height = 400 * DPR;
// 半径，线宽什么的都要去乘一下
```

```js
function draw() {
    cvs.width = 400 * devicePixelRatio;
    cvs.height = 400 * devicePixelRatio;
    ctx.beginPath();
    const r = 80 * devicePixelRatio;
    ctx.arc(cvs.width/ 2,cvs.height/2,r,0,2*Math.PI);
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 10 * devicePixelRatio;
    ctx.stroke();
}
draw();
window.addEventListener('resize',draw);
// 优化
// 可以在画布宽高×dpi之后，直接缩放dpi倍，这样就不用在每次用坐标的时候×dpi了
```



## 测试

```js
const cvs = document.getElementById('mycanvas');
const ctx = cvs.getContext('2d');
function init() {
    const img = new Image();
    img.onload = () => {
        cvs.width = img.width;
        cvs.height = img.height;
        ctx.drawImage(img,0,0,img.width,img.height);
    }
    img.src = './xxx.png';
}
init();
```

