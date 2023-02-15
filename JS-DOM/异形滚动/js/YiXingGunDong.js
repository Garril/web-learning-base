$(function() {

    var posObject = {
            A: { "width": 257, "height": 143, "left": -134, "top": 164, "opacity": 0 },
            B: { "width": 513, "height": 285, "left": 0, "top": 93, "opacity": 1 },
            C: { "width": 800, "height": 445, "left": 200, "top": 0, "opacity": 1 },
            D: { "width": 513, "height": 285, "left": 687, "top": 93, "opacity": 1 },
            E: { "width": 257, "height": 143, "left": 1060, "top": 164, "opacity": 0 },
        }
        //特效最主要就是移动posArrary数组的位置，从而切换图片
    var posArrary = [
        posObject.C,
        posObject.D,
        posObject.E,
        posObject.E,
        posObject.E,
        posObject.E,
        posObject.E,
        posObject.E,
        posObject.A,
        posObject.B,
    ];
    var zindexArrary = [3, 2, 1, 1, 1, 1, 1, 1, 1, 2];
    var maskArrary = [0, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4];

    //设置初始值
    setEveryLiByArr();

    //设置一个锁，防止用户快速点击，造成动画排队
    var god = false;

    //设置图片信号数
    var idx = 0;

    //右按钮事件
    $(".right_btn").click(function() {
        //alert(11);
        //防止动画排队
        if ($("ul li").is(":animated") && !god) {
            return;
        }
        posArrary.unshift(posArrary.pop());
        //		unshift() 方法可向数组的开头添加一个或更多元素，并返回新的长度。
        //		push() 方法可以给数组末尾添加一个或多个数组项。
        //		pop() 方法可以从数组的末尾删除一个数组项，并返回删除的数组项
        //		shift() 方法和 pop() 方法刚好相反，它可以删除数组的第一项，并返回删除的数组项
        zindexArrary.unshift(zindexArrary.pop());
        maskArrary.unshift(maskArrary.pop());
        setEveryLiByArr();
        idx++;
        //图片到最后一张返回第一张
        if (idx > 10) {
            idx = 0;
        }
        //小圆点跟随图片移动
        $("ol li").eq(idx).addClass("cur").siblings().removeClass("cur");
    });
    //左按钮事件
    $(".left_btn").click(function() {
        //alert(11);
        if ($("ul li").is(":animated") && !god) {
            return;
        }
        posArrary.push(posArrary.shift());
        zindexArrary.push(zindexArrary.shift());
        maskArrary.push(maskArrary.shift());

        setEveryLiByArr();
        idx--;
        if (idx < 0) {
            idx = 10;
        }
        $("ol li").eq(idx).addClass("cur").siblings().removeClass("cur");
    });

    //点击小圆点跳转图片
    $("ol li").click(function() {
        //alert(11);
        var _idx = $(this).index();
        //console.log(_idx);
        if (_idx > idx) {
            var count = _idx - idx;
            god = true;
            while (count--) {
                //模拟右按钮点击事件，跳转到点击圆点中的图片
                $(".right_btn").trigger("click");
            }
            god = false;
        } else {
            var count = idx - _idx;
            god = true;
            while (count--) {
                $(".left_btn").trigger("click");
            }
            god = false;
        }
    });

    //设置每一个li标签的三个数组数据
    function setEveryLiByArr() {
        var during = god ? 80 : 800;
        $("ul li").each(function(index) {
            //console.log($(this));
            $(this).css("z-index", zindexArrary[index]);
            $(this).animate(posArrary[index], during);
            $(this).find(".mask").animate({ "opacity": maskArrary[index] }, during);
        });
    }
})