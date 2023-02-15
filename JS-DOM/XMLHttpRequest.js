    // 创建  XMLHttpRequest  对象
    // 一般浏览器： 
    var request = new XMLHttpRequest();

    // 为了兼容各个版本的 IE  构造 getHTTPObject 函数
    // 此函数的用法： var request = getHTTPObject();
    function getHTTPObject() {
        if (typeof XMLHttpRequest == "undefined") {
            XMLHttpRequest = function() {
                try {
                    return new ActiveXObject("Msxml2.XMLHTTP.6.0");
                } catch (e) {}
                try {
                    return new ActiveXObject("Msxml2.XMLHTTO.3.0");
                } catch (e) {}
                try {
                    return new ActiveXObject("Msxml2.XMLHTTP");
                } catch (e) {}
                return false;
            }
        }
        return new XMLHttpRequest();
    }
    //----------------------------------------------------------//