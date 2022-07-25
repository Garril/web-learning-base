const divEl = document.querySelector("#box")


// 常见的属性
console.log(divEl.id) // box
console.log(divEl.tagName) // DIV
console.log(divEl.children) // 获取子节点
console.log(divEl.className) // abc why 字符串形式
console.log(divEl.classList) // abc why 数组形式
console.log(divEl.clientWidth) // 元素宽度
console.log(divEl.clientHeight) // 元素高度
// 元素偏移
console.log(divEl.offsetLeft)
console.log(divEl.offsetTop)

// 常见的方法
const value = divEl.getAttribute("age") // 获取 age 属性的值
console.log(value) // 18
divEl.setAttribute("height", 1.88)
