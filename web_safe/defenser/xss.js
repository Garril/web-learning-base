/* 
  永远不要信任用户提交的内容
    不要将用户提交的内容直接转换成DOM
  
  前端框架 React、Vue。默认防御 XSS攻击
  还有google-closure-library提供api防御

  服务端（node）：
    DOMPurify完成字符串的转义，避免xss攻击
    


*/