/**
 * =======================================================================
 * 
 * cookie: 服务器发过来，浏览器自己设置了，js不需要操作，下次请求会自动带过去
 * 作用： 某些网站，为了辨别用户身份而存储在用户本地终端
 * 用户登录后，服务器发个回应，带set-cookie，浏览器自动设置了，下一次发请求，会带上
 * 服务器拿到后，进行判断，如果登录成功，进行服务操作，登陆失败，返回提示用户
 * 现在用的越来越少了
 * 
 * cookie 分 内存cookie 和 硬盘cookie
 * 浏览器关闭，内存cookie消失
 * 硬盘cookie，看过期时间，过期自动删除，或者自己手动清理（有设置过期时间，就是硬盘cookie）
 * 过期时间的设置：
 * 1、 expires, 设置的是Date.toUTCString(),有设置格式，一般不用
 * 2、 max-age，设置过期的秒钟，一年：60*60*24*365，用的多
 * 
 * cookie的作用域：
 * 就是接受到cookie后，之后在哪些网站发请求会自动带上刚刚拿到的cookie
 * Domain： 
 * 1、如果没有设置Domain，默认为origin，不包括子域名，你从 www.getinfo.com 拿到cookie
 *    就必须是只有在 www.getinfo.com下，如：www.getinfo.com/demo 才会自动携带
 * 2、如果设置了Domain为 “getinfo.com” 那么 www.getinfo.com , dev.getinfo.com等，都会携带cookie
 * 
 * Path：
 * 如果设置了path，只有设置里面的才会携带。默认为/，表示无论什么path都带
 * 
 * 
 * cookie的缺点：
 * 1、会自动携带到每次http请求中（默认）
 * 2、明文传输
 * 3、大小限制（4kb。一般够用）
 * 4、cookie验证登录（登录验证用cookie，除了浏览器会自动设置cookie，其他ios，安卓，小程序等都需要手动）
 * 
 * 
 * 
 * =======================================================================
 * BOM： 连接JS脚本与浏览器窗口的桥梁
 * 主要包括的对象模型如下：
 * 1、window： 包括全局的属性、方法、控制浏览器窗口相关的属性、方法
 * 2、location：浏览器连接到的对象的位置（URL） --- URL在JS中的一种实现方式（对象中有URL各种信息）
 *   （URL的hash也就是锚点#，本质上就是改变window.location的href属性）
 * 3、history：操作浏览器的历史
 * 4、document：当前窗口操作文档的对象 --- DOM
 * 
 * window是Window类，而Window类继承自EventTarget（addEventListener，removeEventListener都是这里来），
 * div/document.addEventListener也是继承自EventTarget
 * 
 * window对象本身（不算上继承自EventTarget的方法）就有：
 * 1、属性：localStorage、console、location、history、screenX、scrollX等
 * 2、方法：alert、close、scrollTo、open等
 * 3、事件：focus、blur（元素失去焦点时响应）、load、hashchange等
 */
fns = [5,2,3,]
for(let i = 0,fn; fn = fns[i++];) {
  console.log(fn)
}
console.log("==============")
// console.log(fns[3])
// let a;
// console.log(a = fns[2])
// console.log(a = fns[3])

if(a=fns[2]) {
  console.log("first")
}
if(a=fns[3]) {
  console.log("second")
} else {
  console.log("third")
}