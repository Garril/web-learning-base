// 参数为: 元素的id，left，top，移动的速度
//  注意，移动的元素需要在css或者js中将定位更改，
//  而top，left等属性。必须在JS中更改或者赋予
function moveElement(elem_id, final_x, final_y, interval) {
    if (!document.getElementById) { return false; }
    if (!document.getElementById(elem_id)) { return false; }
    var elem = document.getElementById(elem_id);
    if (elem.movement) { clearTimeout(elem.movement); }
    if (!elem.style.left) { elem.style.left = "0px"; }
    if (!elem.style.left) { elem.style.top = "0px"; }
    var xpos = parseInt(elem.style.left);
    var ypos = parseInt(elem.style.top);
    var dist;
    if (xpos == final_x && ypos == final_y) {
        return true;
    }
    if (xpos < final_x) {
        dist = Math.cell((final_x - xpos) / 10);
        xpos += dist;
    }
    if (xpos > final_x) {
        dist = Math.cell((xpos - final_x) / 10);
        xpos -= dist;
    }
    if (ypos < final_y) {
        dist = Math.cell((ypos - final_y) / 10);
        ypos += dist;
    }
    if (ypos > final_y) {
        dist = Math.cell((final_y - ypos) / 10);
        ypos -= dist;
    }
    elem.style.left = xpos + 'px';
    elem.style.top = ypos + 'px';
    var repeat = "moveElement('" + elem_id + "'," + final_x + "," + final_y + "," + interval + ")";
    movement = setTimeout(repeat, interval);
}