function displayAbbreviations() {
    // 改进---检测兼容性
    if (!document.getElementsByTagName) { return false; }
    if (!document.createElement) { return false; }
    if (!document.createTextNode) { return false; }
    // 先获取所有的 abbr 元素，之后可以遍历
    var abbreviations = document.getElementsByTagName("abbr");
    if (abbreviations.length < 1) {
        return false; // 如果文档中不存在 abbr 元素，那么结束
    }
    // 创建一个新数组来保存 abbr 中的 title属性值 和 文本内容
    var defs = new Array();
    for (var i = 0; i < abbreviations.length; i++) {
        // 为了IE~，IE出错原因：不把 abbr 当作元素，统计 abbr 子节点时老返回 0
        if (abbreviations[i].childNodes.length < 1) { continue; }
        // definition  用于保存 title 值
        var definition = abbreviations[i].getAttribute("title");
        // key 用于保存 abbr 中的 文本
        var key = abbreviations[i].lastChild.nodeValue;
        defs[key] = definition;
    }
    // 创建 dl 列表并赋予 dlist
    var dlist = document.createElement("dl");
    /* for(A in array)  比如：array 数组有 4 个数，则循环 4 次
        每一次的循环， A 将会被赋值为 当前数组的下标。
        比如 array[Monday]=1, array[Tuesday]=2, array[Thirsday]=3,array[Forthday]=4
        那 A 会依次被赋值为  Monday ，Tuesday， Thirsday， Forthday。
    */
    for (key in defs) {
        //  dt 
        var dtitle = document.createElement("dt");
        var dtitle_text = document.createTextNode(key);
        dtitle.appendChild(dtitle_text);
        //  dd
        var definition = defs[key];
        var ddesc = document.createElement("dd");
        var ddesc_text = document.createTextNode(definition);
        ddesc.appendChild(ddesc_text);
        // 每次循环中，将 dt 和 dd 加入 dl
        dlist.appendChild(dtitle);
        dlist.appendChild(ddesc);
    } //  dl 列表创建完成

    if (dlist.childNodes.length < 1) { return false; }
    // 违背了结构化程序设计原则（多个出口），但是是解决IE兼容的最简单的办法

    //  p 标签，加个标题 显得不突兀
    var header = document.createElement("h2");
    var header_text = document.createTextNode("Abbreviations");
    header.appendChild(header_text);

    /*     引用 body 标签的两种方法
        1. document.getElementsByTagName("body")[0]
        2. document.body */
    document.body.appendChild(header);
    document.body.appendChild(dlist);
    // 将header 和 dlist 加入 html
}

function addLoadEvent(func) {
    var onload = window.onload;
    if (typeof onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function() {
            func();
            onload();
        }
    }
}
addLoadEvent(displayAbbreviations);