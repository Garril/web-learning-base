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
