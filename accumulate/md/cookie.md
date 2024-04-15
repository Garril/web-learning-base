# cookie

## cookie的设置，没设置上

（cookie里面的SameSite出问题同理）

### 跨站、站点域、公共后缀

可能是站点域的原因

#### 公共后缀

com、cn、com.cn、github.io等

#### 站点域

格式: xxx.公共后缀

域名和对应站点域:
www.a.com -> a.com
www.sub.a.com -> a.com
www.github.io -> www.github.io
sub.github.io -> sub.github.io

#### 跨站

注意：跨站和跨域不一样。

跨站的意思：两个域，站点域不一样

比如请求了 www.a.com，他设置了cookie
set-cookie:xxx; domain=yyy
domain的yyy可以是sub.a.com、a.b.c.a.com、.a.com
但不能是.b.com，domain需要和请求的域，需要有点关系，就是同站点域。

具体可以搜 Cookie--作用域

### Session会话

浏览器访问服务器就是会话的开始，会话结束的时间呢？
不是关掉网页，而是 根据不同网站给每个用户的会话设置时间和唯一的ID（sessionID）

因为这是服务器自己定义的东西，所以一般会保存在数据库中（默认存储在内存中，但可以持久化）

为什么有了用户名还要搞SessionId？
比如：我们访问A站
1、登录（输入账号密码）、A站确认身份后，
2、服务器创建一个Session ID 和会话结束的时间（Max-age）等。
3、A站服务器设置Cookie，并且把Session ID加入到Cookie里，再把会话结束时间对应设置为这个Cookie的有效期。
4、浏览器拿到Cookie后，自动进行保存，这个时候浏览器其实只有保存SessionID。

这个SessionID被人拿了也用处不大，因为他不能根据SessionID去获取用户名和密码。而服务器在发送Cookie之前，也会把这个含有SessionID的Cookie进行签名。

浏览器保存Cookie后，每个请求都会带上Cookie，而Cookie中有SessionID。
直到Cookie过期失效，浏览器就会自动删除这个Cookie。会话结束，用户需要重新登录。

#### 示例代码

验证SessionID，express-session（配合express不是koa）

![image-20240413194659458](https://forupload.oss-cn-guangzhou.aliyuncs.com/imgs/image-20240413194659458.png)

但是才用Cookie+SessionID的方法，一时间用户量太大，服务器会面临存储大量sessionID，且多台服务器，还涉及到服务器sessionID同步问题。

于是让数据库存储SessionID，但是数据库崩溃了就会影响服务器获取SessionID

各种原因和需求的前提下，就出现了JWT

### JWT

第一次登陆，服务器会生成一个JWT。

服务器不需要保存JWT，只需要保存JWT签名的密文，然后把JWT发给浏览器

让浏览器以Cookie或者Storage的形式进行存储

假设用的Cookie，每次发送请求都会带上，用户就会自动登陆。

和session很类似，只是token是保存在用户端的，且可以解析出用户名密码超时时间，这样就不用保存了

#### token的安全性

`jwt： json web token`。由三部分组成：`header.payload.signature`

`header`部分声明需要使用什么算法生成签名。 `payload`部分是一些特定的数据，比如有效期。

```css
header: {"alg":"HS256", "type":"JWT"} => base64编码 => xxxxx.....xxxx
payload: {"age":"123", "name":"abc"} => base64编码 => yyyyy.....yyyy
```

上面`header 和 payload`两段编码，加上服务器保存的密码。这三者结合进行算法运算（`header`声明）

最终得到签名`signature`。拼接拿到完整的`JWT`，服务器生成后，发送给客户端。

#### 示例代码

![image-20240413221451820](https://forupload.oss-cn-guangzhou.aliyuncs.com/imgs/image-20240413221451820.png)

### 总结

session是诞生且保存在服务器那边的，由服务器主导所有，本地只存sessionid。验证信息存在服务端。

而cookie最早，既是验证机制，也是存储方式，验证信息存在本地，且可以由本地生成。是一种数据载体，把session / token 放到cookie中送到客户端那边。

cookie跟随http的每个请求发送出去（cookie作用域满足下）。

token是诞生于服务器，但是保存在浏览器上的，由客户端主导一切，可以放在Cookie或者storage中。

相比与session只存一个id，token本地存的信息更多，如header和payload，尤其是payload，可以确认用户信息。这样，**服务端只要保证唯一密钥不丢失**。每次都是临时通过header和payload配合密钥去生成signature验证用户身份的。

最重要的也就是signature，但是由于密钥只在服务端，如果本地token不泄露，其他人无法根据header和payload生成正确的signature，也无法通过修改payload去假冒其他用户或者篡改该用户的其他信息。

Session 是一种能力：是服务器见鬼说鬼话，见人说人话的能力
Token 是一个字符串凭证：和你的各种证件一样功能的凭证，JWT 恰好是其中一种格式
Cookie 是浏览器中的一个存储技术：历史很久了，不用这个也可以

以上连起来就是，你从自己的小钱包（Cookie） 里掏出了身份证（Token），递给了窗口（服务器）里面，从而达成了一种Session 能力

#### 注意：

jwt是无状态，他只是一个身份凭证。
如果你没有在服务端保存登录状态则无法控制jwt的有效性。
jwt一经签发，则只有到期才会失效。
在无状态登录模式下，也许你只能通过更改jwt的生成密匙才可以使以前的jwt失效。

服务端不存储Token。如果是客户端泄露的话，就看token 是如何存储的，上面说了Cookie 是一种存储技术。同样，token 也可以存储到Cookie，如果存储到Cookie里的token 会泄露，那么存储到Cookie 里的sessionId 同样会泄露。如果不使用Cookie 存储，浏览器还可以使用localStorage, sessionStorage. 客户端可以使用 TEE, KeyStore 等存储方案。

如果说想撤销 token, 可以加黑名单解决，从存储上来说，黑名单存储的数量，远远小于 session id存储的数量

关于token被暴露的问题，要有一个前提，用户有义务保证自己的密码安全，不告知他人；同样也有义务保证自己的设备安全，及时锁屏等。现在浏览器设置里面查看自动保存的密码，是需要输入开机密码的，我是建议浏览器在打开控制台功能时，也要输入密码。
当然也可以做一些加固措施，比如把token加密后，存储到localstorage里面，提高窃取成本。

tcp链接可以设置超时时间的。一段时间内没有数据交互，就可以主动关闭链接

认证信息的处理：

1.可以做加密，不暴露明文。2.时间戳+token+url做加盐处理，盐值自己定的，不好破解。3.验证ip等。4.https即使被截获也无法读取。

最后，再怎么样token也有被截取的可能，以上措施只是增加让截取成本而已。关键在于token最大的目的就是保持登陆状态，减少用户操作；保密性很强的内容还是要靠用户名密码来验证，比如支付，私密空间等，必须输入密码，不可能用token来验证

#### 问题：

一般来说token或者cookie中的信息就属于你的类似身份证的东西，是唯一的，其他人拿到了不就是可以冒充你了吗？

sessionid被劫持了就和cookie没区别，session的好处就是服务器可以管理会话，比如二次登陆让第一次的sessionid失效。没有所谓的安全性更高，就和QQ在网吧保存密码一样，虽然别人看不到你的密码，但是一样可以登陆进行操作。

别人拿到你的sessionID或者token就可以冒充你的，因为它们就是服务器根据你的账号密码颁发给你的，同时根据它们验证你的身份的。解决安全性问题有几个方法：第一，使用https防止会话劫持/临牌劫持。第二，定期颁发新的token给用户，让用户带上，这样增加别人拿到旧token的概率。第三，做异常监控，例如，这个人的ip不同，但是用的是同一个token，让token失效，让用户重新登录。

#### token过期续期

方案一：token过期后，跳登录页
缺点：突兀，体验不好

方案二：token重新发
缺点：一直不用登录

方案三：每次请求都刷新token
缺点：服务器计算压力大

方案四：token不过期，但是redis记录过期
缺点：token给客户端，让客户端本地去做身份处理，而这里又反过来要服务器维护用户身份

思路：登录注册，返回token，并且设置redis，key和value，搭配随机生成的uuid使用。比如：`uuid = "user-token:" + UUID.randomUUID();`
`redisTemplate.opsForValue().set(uuid, userID,30,TimeUnit.MINUTES);`
接受请求时（登录、注册除外），其余接口进行检测，若有token，且
redis可以根据token中的uuid，获取到用户id，就表示通过，否则401，没权限。
（这里可以在每次接受到请求时，重置redis的过期时间，上面例子为30分钟）

方案四好处是：可以在分布式的情况下，利用redis将token变为共享，以及可以用redis踢人下线，把token的控制权握在自己手中。
但是，主动踢人下线（将记录从redis中删除），需要能够，根据用户id获取token，这里的uuid不满足。

方案五：双token
登录后发两个token，token1和token2，token2的有效期是token1的两倍。一开始用token1，在token1过期后，使用token2，服务器再给他刷新token1和token2（token1过期但是token2没过期，默认为活跃用户）
但是如果token1和token2都过期了，说明是非活跃用户，跳登录页。
（而活跃判断就是：是否在token1的日期长度内，使用token2请求过一次）
缺点：在第二个token2刷新 获取新的两个token的时候，原先的token会有一段时间不可用。（就是token1是加密的，我们这边不知道他是不是过期，等到服务器发回馈再换token2去发，解决是搞定时器，自动用有效的token2去发请求刷新两个token）
