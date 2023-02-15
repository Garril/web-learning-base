// element 元素   value 加入的class属性值
function addClass(element, value) {
    if (!element.className) {
        element.className = value;
    } else {
        var newClassName = element.className;
        newClassName += " ";
        newClassName += value;
        element.className = newClassName;
    }
}
// else 中为什么不能直接  element.className += " value";
// --->  “  ”中的内容指的是，空格符和字符串value，
//       而不是空格符和变量value