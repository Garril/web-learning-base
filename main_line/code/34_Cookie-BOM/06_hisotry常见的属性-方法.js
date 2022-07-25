const jumpBtn = document.querySelector("#jump")

jumpBtn.onclick = function() {
  // location.href = "./demo.html"
  // location.href 改变地址，其实是刷新了网页，加载了新网页
  // 前端路由不应该是这样，老加载新网页，去请求新资源

  // 跳转(不刷新网页，不会去请求新资源)
  // 第一个参数 state，第二个参数是title（不传，很多浏览器禁用）第三个：路径
  // 你会发现 href变了，但是页面没有进行刷新，这时我们就可以对href进行匹配，去加载对应的组件了，这就是前端路由的原理
  history.pushState({name: "coderwhy"}, "", "/detail")
  // 传入的 {name: "coderwhy"} 可以在 history.state拿到
  // 这里跳转后，还可以网页回退（虽然内容没变化），但是 replaceState就不能回退了

  // history.replaceState({name: "coderwhy"}, "", "/detail")

  /**
   * history对象：
   * 属性： length 会话中的记录条数。state 当前保留的状态数
   * 方法：
   * 1、 back() 等价于 history.go(-1) 返回上一页
   * 2、 forward() 等价于 history.go(1) 前进下一页  
   * 3、 go()  加载历史中的一页
   * 4、 pushState() 打开一个指定的地址
   * 5、 replaceState() 打开一个新地址，并且用的replace
   */
}
