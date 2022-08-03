console.log(window.location)

// 当前的完整的url地址
console.log(location.href)

// 协议protocol
console.log(location.protocol) // http:

// 几个方法
// location.assign("http://www.baidu.com")  自动跳转地址
// location.href = "http://www.baidu.com"   和上面一样

// location.replace("http://www.baidu.com")  和上面两个效果一样，不过这个不能回退
// location.reload(false)  浏览器重新加载，true强制，false则是从缓存里面找

/**
 * location对象的属性：
 * 以 http:127.0.0.1:5000/xxxx/index.html#aaaa 为例子
 * host： ip+port   比如： 127.0.0.1:5000 
 * hostname: ip     比如：127.0.0.1
 * hash: 后面的path 比如：#aaaa
 * href: 全    比如： http:127.0.0.1:5000/xxxx/index.html#aaaa
 * origin:  http://127.0.0.1:5000
 * protocol: http:
 * port: 5000
 * pathname: 不包括hash、protocol 和 host 的 href，比如： /xxxx/index.html
 * search： 最后面的 ?name=xxx&age=18(这里没有)
 */