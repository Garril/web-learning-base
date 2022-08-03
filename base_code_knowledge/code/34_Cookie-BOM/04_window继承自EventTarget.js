// const clickHandler = () => {
//   console.log("window发生了点击")
// }

// window.addEventListener("click", clickHandler)
// window.removeEventListener("click", clickHandler)

window.addEventListener("coderwhy", () => {
  console.log("监听到了coderwhy事件")
})

window.dispatchEvent(new Event("coderwhy")) // 传event类型，这里是自己派发事件
// 其他已经设定好的事件----查看： MDN 事件参考

