/* 
  补充： 
    Same-origin Policy 同源策略
      协议，域名，端口号，都相同
    Content Security Policy（CSP）
      定义那些源（域名）是安全的
      来自安全源的脚本可以执行，其他的抛出错误
      可以对 eval + inline script 直接报错
      （可以服务器响应头部设置以及浏览器meta设置）

  ========================================================

  CSRF的防御
    -----------------------------------------------
    Origin / Referer
      跨站伪造请求，请求来源异常，就拒绝掉
      服务器对 请求头部：Origin / Referer 进行校验，是自己的域名就放行。
      ----同源请求中，GET + HEAD 不发送，可能Referer被更广泛的利用
    -----------------------------------------------
    token
      除了 Origin + Referer 还有 什么可以让我们判断请求是否是合法来源？
      如果这个请求是来自合法页面，这个页面，肯定是之前从服务器拿的，
      那么就可以在第一次get的时候做个标记，也就是token
      形式如下：
        第一次browser，发送get，请求页面。 server返回页面 + token
        之后页面发送请求，就 API + token
        服务端进行 验证token + 数据 的操作，校验不通过，不返回结果。
      （这里token，和用户进行绑定，且需要有过期时间）
    -----------------------------------------------    
    iframe攻击（前面限制了 Origin,这里同源请求）
      攻击者构造一个页面，里面有button标签，button下又盖了个iframe，
      也就是我们的合法页面，那么用户点击button标签时，由于button标签
      设置了css属性 pointer-events: none;
      点击事件穿越到下方的iframe中，iframe中可能因为点击，发送http请求
      而因为iframe中的请求是同源的，那么对应的攻击，就完成了。
      demo:
        export default function App() {
          const onContentClick = () => console.log("click content");
          const onButtonClick = () => console.log("click button");
          return (
            <div className="container">
              <button onClick={onButtonClick}>click</button>
              <div className="content" onClick={onContentClick}>
                content
              </div>
            </div>
          );
        }
        button {
          pointer-events: none;
        }
      点击后一直输出的是 click content
      
      防御手段：
        在服务器设置，对所有页面设置 X-Frame-Options
        http响应头部：X-Frame-Options: DENY/SAMEORIGIN
    -----------------------------------------------    
    SameSite Cookie属性
      （我页面上的cookie，只能为我所用，其他页面发出请求，
      都不能带上我的cookie --- 根源上解决CSRF）
      情景：
        如果有一个页面，页面域名假设为A，此时所有domain属性为A的cookie，
        都归为第一方cookie，非A的cookie归为第三方cookie，
        当我们向域名A发出请求的时候，所有第一方cookie，都可以被成功带上
        第三方都不会被带给A对应的服务器。（浏览器默认行为）
        （SameSite Cookie限制的是Cookie的domain属性与当前页面域名是否匹配）
      如果我是一个第三方服务，我服务的提供依赖于cookie，怎么办？
        （内嵌一个x站播放器，识别不了用户登录态，发不了弹幕。）
        首先，默认下，第三方cookie不会被带上，我们的服务不会正常工作
        解决：
          服务器端进行 Set-Cookie: SameSite=None; Secure;
          不对SameSite做限制，但是cookie是Secure，确保安全。
      demo：
        有两个页面a.com和b.com，服务端domain：a.com
        a.com和b.com都发送request，服务器解析当前请求携带的cookie，返回
        结果都是 把a.com域名下的cookie解析，返回回来。但是有点不同：
          同源方cookie（a.com）：设置了两个值，key：lax和none，值：1和2
            none---不对cookie做任何限制，lax----浏览器默认行为
          但是在非同源（跨域请求）：可以看到，key和value剩下 none：2
          （这就是SameSite进行了限制---如果我设置的是none，意味着cookie可以被
          作为第三方cookie进行携带，但针对默认值lax，他不能被第三方cookie携带到服务器侧）
  
  ========================================================
  补充：
      SameSite 和 CORS的区别：
      SameSite
        针对Cookie的发送，
        对比的是cookie的domain属性和当前域名是否一致
        
      CORS
        是对资源读写/HTTP请求进行限制，
        对比的是资源域名和当前域名是否一致
*/
/* 
  上述那么多的防御CSRF方式，但是不可能一对一的去整。
    node：写中间件
*/