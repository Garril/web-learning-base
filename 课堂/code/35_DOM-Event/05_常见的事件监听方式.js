function divClick() {
  console.log("div元素被点击2")
}

const divEl = document.querySelector(".box")
// DOM0  -- 监听： 具有覆盖性
divEl.onclick = function() {
  console.log("div元素被点击3")
}
divEl.onclick = function() {
  console.log("div元素被点击3333") // 只有这里输出了，上面不输出
  // 且DOM0这种方法（获取元素设置onclick）本质和在html标签里面通过onclick设置监听一样
}


// DOM2，---这里就不具有覆盖性，所有点击函数都会执行
divEl.addEventListener("click", () => {
  console.log("div元素被点击4")
})
divEl.addEventListener("click", () => {
  console.log("div元素被点击5")
})
divEl.addEventListener("click", () => {
  console.log("div元素被点击6")
})
