/* 
  SQL Injection（sql-注入最常见）
  还有CLI
  OS command
  Server-Side Forgery（SSRF），服务端伪造请求
    严格来说 SSRF不是injection，但是原理类似
  ==========================================================================
  都是，在请求的body中，把恶意内容，以string的形式添加到实际内容后

  删除：
    比如： 
      body: JSON.stringify({
        username:"any;DROP TABLE table;",
      })
    或者：
      body: JSON.stringify({
        options: `' && rm -rf xxx`
      })
  读取 + 修改：
      比如：
        修改服务器的negix配置，流量转发到第三方，
        第三方扛不住流量，服务挂掉
  ==========================================================================

  SSRF demo
    公司内网访问权限，如果没有对callback进行过滤
    攻击者就会构造一些内网的连接，进行内网操作。
    public async webhook(ctx) {
      // callback 可能是内网 url
      ctx.body = await fetch(ctx.query.callback);
    }
*/