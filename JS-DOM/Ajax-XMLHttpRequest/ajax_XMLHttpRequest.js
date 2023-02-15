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

function getNewContent() {
    var request = new XMLHttpRequest;
    if (request) {
        request.open("GET", "example.txt", true);
        request.onreadystatechange = function() {
            if (request.readyState == 4) {
                alert("Response Received");
                var para = document.createElement("p");
                var txt = document.createTextNode(request.responseText);
                para.appendChild(txt);
                document.getElementById("new").appendChild(para);
            }
        };
        request.send(null);
    } else {
        alert("Sorry , your browser doesn\'t support XMLHttpRequest");
    }
    alert("Function Done");
    // 结果，先 alert : Function Done.然后才是 Response Received。
    // 说明了 ，脚本根本不会去等待 send 的响应，而是会继续执行。
}
addLoadEvent(getNewContent);