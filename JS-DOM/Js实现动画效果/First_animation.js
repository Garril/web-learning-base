function positionMessage() {
    if (!document.getElementById) { return false; }
    if (!document.getElementById("box")) {
        return false;
    }
    var elem = document.getElementById("box");
    elem.style.position = "absolute";
    elem.style.top = "100px";
    elem.style.left = "50px";
    movement = setTimeout("moveMessage()", 2000); // 全局变量
}

function moveMessage() {
    if (!document.getElementById) { return false; }
    if (!document.getElementById("box")) { return false; }
    var elem = document.getElementById("box");
    var xpos = parseInt(elem.style.left);
    var ypos = parseInt(elem.style.top);
    if (xpos == 300 && ypos == 200) {
        return true;
    }
    if (xpos < 300) { xpos++; }
    if (xpos > 300) { xpos--; }
    if (ypos < 200) { ypos++; }
    if (ypos > 200) { ypos--; }
    elem.style.left = xpos + 'px';
    elem.style.top = ypos + 'px';
    movement = setTimeout("moveMessage()", 10); //注意： 不加 var，全局变量
    // 每 10 毫秒执行一次 moveMessage 函数
}

function addLoadEvent(func) {
    oldonload = window.onload;
    if (typeof oldonload != 'function') {
        window.onload = func;
    } else {
        window.onload = function() {
            func();
            oldonload();
        }
    }
}
addLoadEvent(positionMessage);
// 如果加上 addLoadEvent(moveMessage);。那么相当于 setTimeout 没有用了
// 网页一打开就开始移动，而不是像 setTimeout 设置的一样为 2s 后开始