// 1.常见的属性
// console.log(window.screenX)
// console.log(window.screenY)

// window.addEventListener("scroll", () => {
//   console.log(window.scrollX, window.scrollY)
// })

// console.log(window.outerHeight) 整个浏览器窗口的高度
// console.log(window.innerHeight) 浏览器看得见的高度，f12遮住部分也算没有

// 2.常见的方法
// const scrollBtn = document.querySelector("#scroll")
// scrollBtn.onclick = function() {
//   // 1.scrollTo
//   // window.scrollTo({ top: 2000 })

//   // 2.close
//   // window.close()

//   // 3.open
//   打开网页，默认打开新窗口，第二参数_self表示当前窗口
//   window.open("http://www.baidu.com", "_self") 
// }

// 3.常见的事件
window.onload = function() {
  console.log("window窗口加载完毕~")
}

window.onfocus = function() {
  console.log("window窗口获取焦点~")
}

window.onblur = function() {
  console.log("window窗口失去焦点~")
}

const hashChangeBtn = document.querySelector("#hashchange")
hashChangeBtn.onclick = function() {
  location.hash = "aaaa" // 当前路径的末尾加上了 #aaaa（#aaaa在url叫Fregrament--片段，在浏览器叫hash）
  // 前端路由原理就是判断hash的改变，去routes中找到对应组件，渲染
  /**
   * <a href = '#/home'>click!</a>
      window.addEventListener( 'hashchange',()=>{ console.log("changed",location.hash) } )
      （URL的hash也就是锚点#，本质上就是改变window.location的href属性）
      我们可以通过直接赋值location.hash来改变href，但是页面不刷新
   */
}
window.onhashchange = function() {
  console.log("hash发生了改变")
}
