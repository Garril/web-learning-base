const spanEl = document.querySelector(".span")

spanEl.addEventListener("click", (event) => {
  console.log("span元素被点击:", event)
  console.log("事件的类型:", event.type)
  // event.target表示当前被点击的元素， currentTarget表示当前处理点击事件的元素
  console.log("事件的元素:", event.target, event.currentTarget)
  console.log("事件发生的位置:", event.offsetX, event.offsetY)
})

const divEl = document.querySelector(".container")
divEl.addEventListener("click", (event) => {
  console.log("div元素被点击:", event.target, event.currentTarget)
})

// 常见的方法
// preventDefault
const aEl = document.querySelector("a")
aEl.addEventListener("click", (event) => {
  event.preventDefault() // 阻止默认的a跳转
})

// stopPropagation
// 见06_事件冒泡和事件捕获.js

/**
几个常见的事件的方法
preventDefault()    取消事件默认行为，如阻止点击提交按钮时对表单的提交
stopImmediatePropagation()   取消事件冒泡同时阻止当前节点上的事件处理程序被调用，影响当前的事件***
（补充理解，看06）

stopPropagation()   取消事件冒泡，不影响事件***

cancelBubbe()     取消事件冒泡

returnValue()      取消事件默认行为
*/