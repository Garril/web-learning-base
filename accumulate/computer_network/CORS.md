# `CORS`

<hr/>

## 源

协议+域名+端口

![image-20231101012921421](https://forupload.oss-cn-guangzhou.aliyuncs.com/imgs/image-20231101012921421.png)



## 出现场景

```css
1、a元素的跳转
2、css、js、图片等的加载
3、ajax（出现最多）
4、js api比如window.open、window.parent、iframe.contentWindow等
5、存储 WebStorage、IndexedDB
```



 ## `ajax`的跨域问题

```css
js中的XHR/fetch在浏览器上执行，浏览器是会 发出请求（简单和预检，两种请求发出去的请求不一样）
服务器响应后，校验CORS规则，没通过，就引发错误，跨域问题。
```

### `CORS`规则

服务器明确表示允许，校验通过。明确拒绝或者没有表示，校验不通过。详细做法可以看下面的校验规则。



### 请求的分类

#### 简单请求

```css
1、请求方法为必须为POST\GET\HEAD之一
2、头部字段满足CORS安全规范（浏览器自带就是规范，别自己加、修改、删除就行）
3、如果头部变了Content-Type，必须是下面之一：
	text/plain、 
	multipart/form-data、
	application/x-www-form-urlencoded
```

特殊例子：

```js
fetch('https://xxxx.com',{
    method: 'POST',
    body: JSON.stringify({ a:1, b:2 })
})
// 有些库看到你的body为Json，帮你改了headers为
// { 'content-type': 'application/json' }
// 实质上，在原生中这个属于简单请求
```

#### 预检请求（`Preflight`）

不属于简单请求的就是预检请求。





### 校验规则

#### 简单请求

```css
(http://my.com)浏览器 => 请求带Origin: http://my.com
发到 服务器
服务器读到，决定让他过 =》 响应头加字段
Access-Control-Allow-Origin: http://my.com
或者直接
Access-Control-Allow-Origin: * 
(用*  =》 单点登录有点问题，不建议)
```



#### 预检请求

浏览器一开始请求都不会让预检请求发出去。

浏览器会自己先发一个到服务器去问问。

![image-20231101015557577](https://forupload.oss-cn-guangzhou.aliyuncs.com/imgs/image-20231101015557577.png)

```css
Access-Control-Request-Headers => 修改了什么头部
```



服务器响应，统一让他过

发送真实请求（和简单请求一样）



### 补充细节 ：`cookie`

默认情况下，`ajax`的跨域请求并不会附带`cookie`，这样一来，某些需要权限的操作就无法进行。

可以简单配置实现

```js
// xhr
const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

// fetch api
fetch(url,{
    credentials: "include"
})
```

使得跨域的`ajax`请求成了附带身份凭证的请求。

当一个请求需要附带`cookie`是，无论他是简单请求还是预检请求，都会在请求头中添加`cookie字段`

而服务器响应时，需要明确告诉客户端，服务端允许这样的凭据。

告知方法：

```css
在响应头上添加：
Access-Control-Allow-Credentials: true
```

没有告知，就跨域失败。

对于附带身份凭证的请求，服务器不允许设置：

```css
Access-Control-Allow-Origin: * 
```



### 补充细节 ：跨域获取响应头

跨域访问时，`js`只能拿到最基本的响应头，比如：

```css
Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma。

有可能你设置了，浏览器响应也有数据，但是js去拿，undefined拿不到。
resp.headers.get('authorization');

如果要访问其他头，则需要服务器设置本响应头。
Access-Control-Expose-Headers头,让服务器把允许浏览器访问的头放入白名单，比如：
Access-Control-Expose-Headers: authorization,a,b
这样js就可以访问指定的响应头了。
```



## `jsonp`

### 用法

在很久之前，没有`CORS`方案，直接就是不通过，怎么处理。

方法：不使用`ajax`

```js
// 请求服务器 http://localhost:8080/jsonp，响应结果如下：
callback({"msg":"i am the message"});
// 在网页上看，这是一个js文件，而不是Fetch/XHR

// 客户端，在html-body中
<script src="http://localhost:8888/jsonp" />
// 把结果当作js去运行了，报错 callback not defined
```

尽管端口不一样，有跨域，但是成功了（原因：浏览器对标签的跨域限制比较轻）

在全局定义函数 `callback`即可拿到请求结果。

```js
// 封装一个函数
function request(url) {
    return new Promise((resolve) => {
        window.callback = function(resp) {
            script.remove();
            resolve(resp);
        };
        const script = document.createElement('script');
        // 发请求拿到js，自动执行
        script.src = url;
        document.body.appendChild(script);
    })
}
request('http://localhost:8888/jsonp').then(res=>{
    console.log(res);
})
```

但是可能同时多个请求，那么岂不是会覆盖你的`window.callback`

解决方法：

```js
// 请求地址为：
http://localhost:8080/jsonp?callback=myfn;
// 返回
myfn({ "msg": "i am the message" });
// 随机生成函数名
Math.random().toString(36).substring(2)
```

```js
function request(url) {
    return new Promise((resolve) => {
        const cbName = '__callback__' + Math.random().toString(36).substring(2) + '_' + Date.now();
        window[cbName] = function(resp) {
            delete window[cbName];
            script.remove();
            resolve(resp);
        };
        const script = document.createElement('script');
        // 发请求拿到js，自动执行
        script.src = url + '?callback=' + cbName;
        document.body.appendChild(script);
    })
}
request('http://localhost:8888/jsonp').then(res=>{
    console.log(res);
})
```

### 缺陷

仅能用`GET`请求，恶意攻击者可能利用`callback=恶意函数`实现`xss`攻击，容易被非法站点恶意调用。



## 代理

跨域是浏览器同源策略搞出来的，找个不是浏览器的解决就行了，比如自己写个代理服务器，用代理服务器请求外面的目标服务器，你再从自己的代理服务器拿数据（自己的代理服务器，就算要配置跨域也可以解决）。

（`axios`浏览器和`node`环境都可以用）



## 决策图

所以有代理服务器、`jsonp`、`CORS`，这三种怎么选？

最核心的点：**生产和开发保持一致**，一定看生产环境。

![image-20231102002004073](https://forupload.oss-cn-guangzhou.aliyuncs.com/imgs/image-20231102002004073.png)

### 具体场景

#### 场景一

![image-20231102002515447](https://forupload.oss-cn-guangzhou.aliyuncs.com/imgs/image-20231102002515447.png)

请求静态资源和发送请求获取响应的服务器不一样，非同源，一般都用`CORS`，生产环境定下来是`CORS`，开发环境也就要用`CORS`，代理也不好使。

![image-20231102003431194](https://forupload.oss-cn-guangzhou.aliyuncs.com/imgs/image-20231102003431194.png)

后端解决`CORS`

#### 场景二

![image-20231102004137201](https://forupload.oss-cn-guangzhou.aliyuncs.com/imgs/image-20231102004137201.png)

