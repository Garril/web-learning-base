function displayCitations() {
    if (!document.getElementsByTagName || !document.createElement || !document.createTextNode) { return false; }
    //  找到并且获取所有的 blockquote
    var quotes = document.getElementsByTagName("blockquote");
    for (var i = 0; i < quotes.length; i++) {
        //  判断 当前的 blockquote 中是否有 cite 属性
        if (!quotes[i].getAttribute("cite")) { continue; }
        //  判断有 ，获取 cite 属性值
        var url = quotes[i].getAttribute("cite");

        //  创建 链接, 设置 属性。
        var link = document.createElement("a");
        var link_text = document.createTextNode("source");
        link.appendChild(link_text);
        link.setAttribute("href", url);
        //  (可选)用 sup 元素包装，上标效果
        var superscript = document.createElement("sup");
        superscript.appendChild(link);

        //  获取  当前的 blockquote 中所有 子 “元素节点“ 的数组 
        var quoteChildren = quotes[i].getElementsByTagName("*");
        //  判断 长度是否小于1，而不是默认 quoteChildren 肯定返回一个元素节点
        if (quoteChildren.length < 1) { continue; }
        //  获取  当前 blockquote 的最后一个 元素节点
        var elem = quoteChildren[quoteChildren.length - 1];

        //  插入链接
        elem.appendChild(superscript);
    }
}

function addLoadEvent(func) {
    var onload = window.onload;
    if (typeof onload != "function") {
        window.onload = func;
    } else {
        window.onload = function() {
            func();
            onload();
        }
    }
}
addLoadEvent(displayCitations);