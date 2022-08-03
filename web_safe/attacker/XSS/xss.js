/* 
  Cross-Site Scripting(XSS)
    攻击者注入恶意脚本，比如script，用户访问页面的时候，恶意脚本就会被执行
    用户可能隐私泄露，可能被当作挖坑的机器
  ！核心！XSS利用的东西：
    开发者盲目的信任了用户提交的内容（比如直接就把string转换为了dom）
      API： document.write
            element.innerHTML = anything;
            SSR(user_data) // 伪代码
  XSS特点：
    1、难以从UI感知，因为是暗地里执行脚本
    2、窃取用户信息 cookie/token
    3、因为他可以执行js ---> 绘制UI（例如弹窗），诱骗用户点击、填写表单


  ==========================================================================
  情景描述：
    submit函数直接保存用户传入的 string 到 database
    render函数直接从 database 中获取到 string，直接
    xxx.body = `<div> ${string} </div>`; 
    两个地方，都可以过滤，但是都没有过滤！
  这个时候：
    攻击者提交了个script作为content字段，提交到了服务器端：
      fetch("/submit",{
        body: JSON.stringify({
          id: "1",
          content: `<script> alert("xss"); </script>`
        });
      });
  之后服务器端渲染这段内容的时候，就会在html中插入了一个字段
  ctx.body = `
      <div>
        <script> alert("xss"); </script>
      </div>`;

  ==========================================================================
  XSS分类：
    1、Stored XSS（存储型，上面的情景就是）
      恶意脚本被存在数据库中
      访问页面->读数据===被攻击
      危害最大，对全部用户可见
    2、Reflected XSS
      不涉及数据库，从URL上攻击
      比如：host/path/?param=<script>alert('123')</script>
      服务端会从用户请求中，获取到param字段
      并且把这个字段直接生成html片段（这里的script就把他当作写了极端恶意的标签）
    3、Dom-based XSS
      完全不需要服务器的参与
      恶意攻击的发起，执行，全在浏览器端
      2中的URL不变，但是执行环境是在浏览器中
        const content = new URL(location.href).searchParams.get("param");
        const div = document.createElement("div");
        div.innerHTML = content;
        document.body.append(div);
    2和3很像，区别在于注入脚本的地方不同
    4、Mutation-based XSS
      利用浏览器渲染DOM的特性（独特优化）
      不同浏览器，会有区别（按浏览器进行区别攻击）
      <noscript><p title="</noscript><img src = x onerror=alert(1)>">
      上面代码，被认为是：平平无奇的title属性。但是这段html拿到浏览器渲染后：
      <div>
        <noscript><p title="</noscript>
        <img src="x" onerror="alert(1)">
        "">"
      </div>
      可以看到，img被渲染为一个标签，且src是错误的，会进而触发onerror事件
      恶意脚本就可以写到这里面了，完成了XSS攻击

  ==========================================================================
*/