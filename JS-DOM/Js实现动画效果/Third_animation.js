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

    // 此处的解释： 需要用clearTimeout将多余的，积累在setTimeout队列里的事件（鼠标移动过快）清除
    // 为什么是elem.movement，要作为一个属性出现，因为如果用全局变量movement，没有了var声明
    // 在创建之前，if找不到movement，报错。 但是 又不能用局部变量，因为clearTimeout函数无法工作
    //  所以选择了属性 可以自己创造属性 与某一特定变量相关连
    //  此后，每次超链接onmouseover触发moveElement函数，
    //  创建的movement是各自函数内 局部变量elem的属性，而不是全局变量 movement
    // 不会出现多个函数同时在调用  同一个全局变量  的情况
    if (elem.movement) {
        /* alert(elem.movement); 
        指向第一个超链接，你会发现，alert出来的是执行的次数 100次后 从第一张转到第二张图  
        此if语句作用： 如果某个元素的 moveElement 函数开始执行时已经有了一个movement属性
        就应该用clearTimeout函数来对他复位
        */
        clearTimeout(elem.movement);
    }
    var xpos = parseInt(elem.style.left);
    var ypos = parseInt(elem.style.top);
    if (xpos == final_x && ypos == final_y) {
        return true;
    }
    if (xpos < final_x) {
        xpos++;
    }
    if (xpos > final_x) {
        xpos--;
    }
    if (ypos < final_y) {
        ypos++;
    }
    if (ypos > final_y) {
        ypos--;
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
    preview.style.left = '0px';
    preview.style.top = '0px';
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