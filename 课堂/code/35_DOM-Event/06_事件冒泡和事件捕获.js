const spanEl = document.querySelector(".span")
const divEl = document.querySelector(".container")

spanEl.addEventListener("click", () => {
  console.log("事件冒泡:span元素被点击了")
})

divEl.addEventListener("click", () => {
  console.log("事件冒泡:div元素被点击了")
})

document.body.addEventListener("click", () => {
  console.log("事件冒泡:body元素被点击了")
})

// 再次监听
spanEl.addEventListener("click", (event) => {
  console.log("事件捕获:span元素被点击了")

  event.stopPropagation() // ！！！！ 阻止事件进一步传递（冒泡）
  // event.stopImmediatePropagation() 让click点击后，不会再去调用其他函数（addEventListener可以设置多个函数）

}, true) // 第三个参数，默认false表示事件冒泡，true表示事件捕获

divEl.addEventListener("click", () => {
  console.log("事件捕获:div元素被点击了")
}, true)

document.body.addEventListener("click", (event) => {
  console.log("事件捕获:body元素被点击了")
}, true)

