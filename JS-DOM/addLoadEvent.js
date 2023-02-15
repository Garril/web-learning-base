function addLoadEvent(func) {
    var onload = window.onload; //保存原先的window.onload;
    if (typeof window.onload != 'function') { //考虑 window.onload中未存有函数的情况
        window.onload = func;
    } else { //考虑window.onload中存有函数的情况
        window.onload = function() {
            onload();
            func();
        }
    }
}
// 以后想把函数添加到window.onload中
// 直接： addLoadEvent(函数); 即可