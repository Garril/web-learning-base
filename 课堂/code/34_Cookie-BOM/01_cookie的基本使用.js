/**
 * F12中 Application的cookies中的HttpOnly，默认为true
 * 表示当前cookie只能通过 http/https 来进行操作
 * 
 * 控制台（假设当前服务器，设置了 httpOnly: false，没设置，下面操作报错 ）
 * document.cookie 拿不到cookie
 * 但是 document.cookie = "xxx=20" 会创建一个新cookie，Name：xxx，value：20
 * 所以 document.cookie = "" 是没办法删除 cookie的
 * 可以 document.cookie = "name=hhh;max-age=0" 这样删除（直接过期）
 * 
 */