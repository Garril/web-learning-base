/* 
Cookie - sameSite 
  Browser  <--- Set-Cookie:...;SameSite=Strict  Server
  
SameSite用于限制跨站请求
（跨站区别于跨域，跨站只看域名，具体可看md--cookie.md）
  a、img、iframe、ajax请求的域和页面域不一致。
  那么SameSite就会发挥作用：决定是否带着本网站的cookie到目标网站去

SameSite的取值：
  None：不做任何限制，但是使用时，需要保证Cookie为Secure
    Set-Cookie:....;Secure;SameSite=None
  Lax: 默认值，阻止发送Cookie，但对超链接放行。
  Strict：阻止发送Cookie
*/
