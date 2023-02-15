function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof oldonload != 'function') {
        window.onload = func;
    } else {
        window.onload = function() {
            func();
            oldonload();
        }
    }
}

function moveElement(elem_id, final_x, final_y, interval) {
    if (!document.getElementById) { return false; }
    if (!document.getElementById(elem_id)) { return false; }
    var elem = document.getElementById(elem_id);
    if (elem.movement) {
        clearTimeout(elem.movement);
    }
    if (!elem.style.left) {
        elem.style.left = "0px";
    }
    if (!elem.style.top) {
        elem.style.top = "0px";
    }
    var xpos = parseInt(elem.style.left);
    var ypos = parseInt(elem.style.top);
    var dist = 0;
    if (xpos == final_x && ypos == final_y) {
        return true;
    }
    if (xpos < final_x) {
        dist = Math.ceil((final_x - xpos) / 10);
        xpos += dist;
    }
    if (xpos > final_x) {
        dist = Math.ceil((xpos - final_x) / 10);
        xpos -= dist;
    }
    if (ypos < final_y) {
        dist = Math.ceil((final_y - ypos) / 10);
        ypos += dist;
    }
    if (ypos > final_y) {
        dist = Math.ceil((ypos - final_y) / 10);
    }
    elem.style.left = xpos + 'px';
    elem.style.top = ypos + 'px';
    var repeat = "moveElement('" + elem_id + "'," + final_x + "," + final_y + "," + interval + ")";
    elem.movement = setTimeout(repeat, interval);
}

function prepareSlideshow() {
    if (!document.getElementById) { return false; }
    if (!document.getElementsByTagName) { return false; }
    if (!document.getElementById('linklist')) { return false; }
    if (!document.getElementById('preview')) { return false; }
    var preview = document.getElementById('preview');
    preview.style.position = 'absolute';
    var list = document.getElementById('linklist');
    var links = list.getElementsByTagName('a');
    links[0].onmouseover = function() {
        moveElement("preview", -100, 0, 10);
    }
    links[1].onmouseover = function() {
        moveElement("preview", -200, 0, 10);
    }
    links[2].onmouseover = function() {
        moveElement("preview", -300, 0, 10);
    }
}
addLoadEvent(prepareSlideshow);
/* 
    可以考虑直接将服务于 JS 的 html部分代码用 JS 在 prepareSlideshow 函数里生成
    
创建div元素
    var slideshow = document.createElement("div");
    slideshow.setAttribute("id", "slideshow");
创建img元素
    var preview = document.createElement("img");
    preview.setAttribute("src", "Third_picture.png");
    preview.setAttribute("alt", "building blocks of web design");
    preview.setAttribute("id", "preview");
将img放入div元素中
    slideshow.appendChild(preview);
跟在链接清单后
    var list = document.getElementById("linklist");
    insertAfter(slideshow, list);
给slideshow和preview设置好定位，也可在css中设置
    preview.style.position = 'absolute';

    构造insertAfter函数
    function insertAfter(newElement, targetElement) {
        var parent = targetElement.parentNode;
        if (parent.lastChild = targetElement) {
            parent.appendChild(newElement);
        } else {
            parent.insertBefore(newElement, targetElement.nextSibling);
        }
    } 
*/