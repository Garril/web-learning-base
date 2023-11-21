# `url`

<hr/>

## `url`格式和类型

```http
POST /api/user/login HTTP/1.1
Host: baidu.com
Content-Type: application/x-www-form-urlencoded

loginId=garril&loginPwd=123456
```

### `Content-Type`

代表请求体的格式

```css
image/png
image/gif
text/plain
text/css
application/javascript
application/json

不同类别会触发浏览器响应式的不同行为
比如：application/octet-stream二进制数据
会触发浏览器的下载行为。
或者Content-Type随意，但是加上'Content-Disposition'为'attachment;filename=mytest.txt';
```

`eg:json`

```json
{
    "loginId":'garril',
    "loginPwd":'123456'
}
```

### `multipart/form-data; boundary=aaa`

另一种格式（常用于文件上传）

`multipart/form-data; boundary=xxx`

`xxx`表示分隔符

```http
POST /api/user/login HTTP/1.1
Host: baidu.com
Content-Type: multipart/form-data; boundary=aaa

--aaa
Content-Disposition: form-data; name="loginId"

garril
--aaa
Content-Disposition: form-data; name="loginPwd"

123456
--aaa
Content-Disposition: form-data; name="mypic"

文件的二进制
--aaa--
```

比如你要传一个文件，用的字符串，body部分要为图片，图片应该为2进制数，你想用1010...去表示，如下：

```css
Content-Type: application/x-www-form-urlencoded

avatar=1000111.....
```

可这是字符的1010，不是数字的1010

```js
'1'.codePointAt(0)  // 49
'1'.codePointAt(0).toString(2)  // 110001
```

那么就写不了，除非转化为 `base64`

而`multipart/form-data`类型为什么可以，因为他的name，也就是字段对应的值，可以是文件的二进制。



### `base64`

我们可以用`base64`，把图像二进制变为可以打印的字符（如果图片上传格式为`Content-Type: application/x-www-form-urlencoded`，百分之百，`body`部分为`base64`）

如果类型为`application/json`，对象里面的数据也要`base64`

转出来的`base64`会大于原先的二进制数，所以一般也是不得以而为之。



## 什么时候会发`http`请求

1、输入 `url` 地址

2、 点击页面a，跳 a 的 `href`

a标签的相对和绝对路径

```css
对于：http://www.baidu.com/a/1.html

//www.baidu.com/a/1.html
和
/a/1.html
都是绝对路径（协议、域名等，没传就默认当前网站的）

./2.html相对路径

eg：
访问： https://www.baidu.com/、https://www.baidu.com/news、
https://www.baidu.com/news/detail
都会请求 http://www.baidu.com/js/app.js文件
如果相对：
<script src="./js/app.js" /> 不行。
```

3、按了提交的按钮 

### `form`

```html
<button type="submit">...</button>
会获取到button所在 form标签，拿到他action属性地址，同时拿到method属性值，然后把表单数据组织到请求体中，发送请求，同时抛弃当前页面。


表单默认Content-Type: application/x-www-form-urlencoded
<form action="https://....." methods="POST">
	<!-- 内部元素为payload负荷，即：请求体-->	
    <label for="userId">姓名</label>
    <input type="text" name="loginId" id="userId" />
    
    <label for="userPwd">密码</label>
    <input type="password" name="loginPwd" id="userPwd" />
    <button type="submit">提交</button>
</form>


表单内置的一些东西比如回车的监听，挺好用。可以通过阻止默认事件，去阻止他发送请求，但是仍然利用他的事件监听。
<script>
	const form = document.getElementBy....;
    form.onsubmit = (e) => {
        e.preventDefault();
        console.log(e);
	}
</script>
```

补充：如果输入部分为一个`textarea`标签，按下回车变成换行了，而不是被绑定的提交（我们把`onsubmit`默认事件给取消了），如果需要，得自行处理。

```js
textArea.onkeydown = (e) => {
    if(e.key === 'Enter' && !e.shiftKey && !e.ctrlKey && !e.altKey) {
		e.preventDefault();
        form.dispatchEvent(new Event('submit'));
    }
}
```





### `post` 和 `get`

```css
1、浏览器在发送get请求的时候是不会附带请求体（body）的。现在的get一般丢query里。（为什么丢请求行，而不是请求头，弄个类似Content-Type的新的key？因为整体作为一个url可以做到异域分享，且请求行和请求头浏览器有限制大小，缺点看第4点。）
2、GET请求信息量有限，POST无限制
3、GET发请求时，只可以传递ASCII数据，POST无限制（看浏览器网站的时候，可能还是中文，好看罢了）
	encodeURLIComponent('中文解析为ASCII');
	decodeURIComponent('....');
4、大部分GET请求数据都附带在query参数，可通过分享地址完整的重现页面，但是同时暴露数据，若有敏感数据传递，不应该使用GET请求，至少不应该放到query中
5、POST不会被保存到浏览器的历史记录（可以复现请求，比如刷新）中
6、刷新页面时，若当前的页面是通过POST请求得到的，会提示用户是否重新提交，若GET，无。
```



# `Ajax`

`xml`例子

```xml
<loginId>garril</loginId>
<loginPwd>123456</loginPwd>
```

原生发请求两种：

`XMLHttpRequest` 和 `Fetch (h5)`

![image-20231030013600313](https://forupload.oss-cn-guangzhou.aliyuncs.com/imgs/image-20231030013600313.png)

除非要监听文件上传进度，否则基本都是 `Fetch`

## `axios` 和 `fetch`

```css
axios库的原生能力为xhr
umi-request库用的是fetch
```

### `fetch`

可能在拿到请求头还没有拿到请求体的时候，要做一些事情，可以用`fetch`

```js
async function loadData() {
	const res = await fetch("https://......",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        // body不支持直接写js对象
        body: `{
        	"clear": true
        }` // or JSON.stringify({ clear: true })
    });
    // fetch拿到的是一个promise，但是他不是等请求结果都有了，才返回，有了请求头，没有请求体的时候，就已经执行了。
    console.log(res.body); // 没要的数据
    const body = await res.text();
    // const body = await res.json();
    // const body = await res.blob();
    // const body = await res.arrayBuffer();
    // 等待响应体到来，且转为文本
}
loadData();
```

### `ajax`

繁琐的情况：

```js
// xxx为input元素
xxx.selectFile.onchange = e => {
    const file = e.target.files[0];
    setProgress(0); // ui操作进度方法
    // js 中所有io都选异步
    const reader = new FileReader();
    render.onload = event => {
        const dataURL = event.target.result;
        // 字符串本身描述了图片的所有信息，不需要发送网络请求获取图片
        // 在background: url() 还有 script标签的src="data url"都可以写data:url
       xxx.img.src = dataURL; 
    }
    reader.readAsDataURL(file);
    upload(file);
}

function upload(file) {
    const xhr = new XMLHttpRequest();
    const url = 'https://....:8000/upload/img';
    xhr.open('POST',url);
    xhr.setRequestHeader('Content-Type','multipart/form-data; boundary=aaa');
    const bfBuilder = new BufferBuilder();
    // 创建的类，append就拼接
    bfBuilder.appendString('--aaa\r\nContent-Disposition: form-data; name="avatar";filename="test.png"\r\nContent-Type:image/png\r\n\r\n');
    // 请求体前记得留两行
    const reader = new FileReader();
    reader.onload = (e) => {
        bfBuilder.appendBuffer(e.target.result);
        bfBuilder.appendString('\r\n--aaa--');
        // 得到完整的二进制数据
        const bf = bfBuilder.toBuffer();
        xhr.send(bf);
    }
    reader.readAsArrayBuffer(file);
}
```

浏览器出了`api`让上面的操作简单了

```js
function upload(file) {
    const xhr = new XMLHttpRequest();
    const url = 'https://....:8000/upload/img';
    xhr.open('POST',url);
    xhr.onload = () => {
		showPic();
    }
    xhr.upload.onprogress = (e) => {
        const per = Math.floor((e.loaded/e.total)*100);
        setProgress(per);
    }
    // 终止请求 xhr.abort();
    const formData = new FormData();
    // 自动设置file转二进制，和file的名字，请求头
    formData.append('avatar',file);
	xhr.send(formData);
}
```

### fetch流式读取

```js
const resp = await fetch('...',{});
// 等响应结果全部拿到，再进行渲染，有点卡
// const body = await resp.text()

// 要求一个个的一段段的渲染
const reader = resp.body.getReader();
const decoder = new TextDecoder(); // 文本解码器
while(1) {
    const { done, value } = await reader.read();
    if(done) { break; }
    console.log(value); // Unit8Array类型数据
    const txt = decoder.decode(value);
    console.log(txt);
}
```

