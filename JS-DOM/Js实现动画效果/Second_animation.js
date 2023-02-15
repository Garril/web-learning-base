function addLoadEvent(func) {
    var onload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function() {
            onload();
            func();
        }
    }
}

function positionMessage() {
    if (!document.getElementById) { return false; }
    if (!document.getElementById("box")) {
        return false;
    }
    var elem = document.getElementById("box");
    elem.style.position = "absolute";
    elem.style.left = "50px";
    elem.style.top = "100px";
    moveMessage("box", 300, 200, 10);

    var elem2 = document.getElementById('message');
    elem2.style.position = 'absolute';
    elem2.style.left = '400px'
    elem2.style.top = '300px';
    moveMessage("message", 100, 100, 10);
}

function moveMessage(elem_id, final_x, final_y, interval) {
    if (!document.getElementById) { return false; }
    if (!document.getElementById(elem_id)) { return false; }
    var elem = document.getElementById(elem_id);
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
    var repeat = "moveMessage('" + elem_id + "'," + final_x + "," + final_y + "," + interval + ")";
    movement = setTimeout(repeat, interval);
}
addLoadEvent(positionMessage);