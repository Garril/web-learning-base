const divEl = document.querySelector("#box")
const spanEl = document.querySelector(".content")

// 常见的属性
console.log(divEl.nodeName, spanEl.nodeName) // DIV  SPAN
console.log(divEl.nodeType, spanEl.nodeType) // 1  1
console.log(divEl.nodeValue, spanEl.nodeValue) // null null

// childNodes
const spanChildNodes = spanEl.childNodes
const textNode = spanChildNodes[0]
console.log(textNode.nodeValue) // span元素


// 常见的方法
const strongEl = document.createElement("strong")
strongEl.textContent = "我是strong元素"
divEl.appendChild(strongEl)

// 注意事项: document对象 -- 不清楚要加到哪里，所以不能直接用appendChild
document.body.appendChild(strongEl)
