# 图片上传

<hr/>

## 流程描述

边缘端（手机）进行图片的拍照/图片上传（这里用的微信小程序）

pc端服务器上的微服务收到图片，进行图像处理，然后输出（这里做个网页模拟微服务的调用）

## 坑点

因为没有绑定了域名的服务器，没法把服务器部署到服务器上，本地跑，所以有很多的限制：

### 微信小程序

#### url

微信小程序的图片上传，需要用到`wx.uploadFile`，然而：

传入的参数`url`需要到微信小程序后台去提前设置，

需要满足 非本地`localhost、127.0.0.1`、`Https`、是域名且备案。

所以本地上跑的小程序，是不可能发送图片给本地跑的服务器的，

不管你用`nginx`做中间服务器，进行请求的转发，还是用`ngrok`做内网穿透（报错：服务器，域名未经过ICP备案）

最后，利用仅有的资源，选择利用阿里云的oss。

阿里云Oss提供内网和外网访问，且满足https和域名。



尽管最后利用这个方法实现了小程序的图片上传到`oss`，但是还是小麻烦，

因为我的小程序，上传的时候，需要那些`oss`上传要求的`host、ossAccessKeyId、signature、policy、key等，`

其中部分数据 ---- STS相关`policy、signature`就需要我们自己去开一个服务器，发送个请求

通过上传`RAM`用户的` accessKeyId, accessKeySecret`,然后去获取，这东西还有过期时间。

> 补充STS知识：
>
> ​	STS（Security Token Service），通过为IAM用户、RAM用户及第三方用户提供临时访问授权来帮助用户更好地管理云资源的访问权限。
>
> ​	借助STS，可以实现在不泄露云账号AK/SK的情况下，授权他人以临时身份访问阿里云上的资源就需要我们自己

（还有就是`git`提交代码，记得把配置文件内的私密部分 `ignore`掉）



#### npm

当你`npm install` 去拉`ali-oss`还是其他组件库包，即便你进行`npm构建`了

他还是会报错 `const OSS = require('ali-oss');`找不到`ali-oss`包路径 

一开始以为是放到`Page`外面了，就放到其他比如`onLoad`等生命周期函数去试，均无效。

之后为了导入`weui`组件库，在其官方文档的代码下，发现同样的问题。

官方文档要求wxss文件加：`@import 'weui-wxss/dist/style/weui.wxss'; `，报错找不到

解决方法：`@import 'weui-miniprogram/weui-wxss/dist/style/weui.wxss'; `

加上之前用过微信小程序`live-player、live-pusher组件`才了同样的坑，我猜测：

有些文档官方都不对。。。。。。。

解决方法是：不`require`了，直接用`wx.uploadFile`配合`wx.chooseMedia`实现就行。



### springcloud

#### 消息通知

一开始的设想十分美好，我可以利用`oss`服务器，微信小程序可以把图片上传到`oss`上了

阿里云的oss服务器还有一个叫消息通知`MNS`的，就可以通知我的服务器，让他拿最新的图片去处理了。

这个消息通知`MNS`，可以配置队列和事件通知规则

让你的微信小程序上传到oss后，oss来通知你，最后你进行处理，保存到oss上，再通知用户。

然而，这里面需要配置 接收终端，要求`Https或者我们设置的队列`

我们使用`ngrok`做内网穿透，把公网ip填上去，发现不行，

首先我们每次内网穿透，默认公网ip是变化的，就算是固定的，你在配置接收终端的时候，他也不会生效

所以这条路子走不了
