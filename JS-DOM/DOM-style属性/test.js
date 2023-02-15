window.onload = function() {
        var a = document.getElementById("forget");
        a.style.fontSize = '50px';
        a.style.color = 'blue';
        alert(a.style.color);
        a.style.top = '100px'
        alert(a.style.top);
    }
    // 经过测试 ：
    //  css 无论是 从外部引入 还是写在 html 中
    //  DOM 的 style 属性都无法获取，alert出来的都是空的
    //  只有 写在 JS 中的 属性才能 alert 出来
    //  而且，对于同一个属性，如果css设置了color，JS中也设置了color
    //  网页将按照  JS中的来