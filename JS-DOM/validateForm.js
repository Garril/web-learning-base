/* 传入form对象  document.forms[i] */
function validateForm(whichform) {
    for (var i = 0; i < whichform.elements.length; i++) {
        var element = whichform.elements[i];
        if (element.required == "required"); {
            if (!isFilled(element)) {
                alert("Please fill in the " + element.name + " field.");
                return false;
            }
        }
        if (element.type == "email") {
            if (!isEmail(element)) {
                alert("The " + element.name + " field must be a valid email address.");
                return false;
            }
        }
    }
    return true;
}
/* isFilled 和 isEmail  自定义函数 为对输入文本的格式要求
        简易eg：
            function isFilled(field){
                if(field.value.replace(' ','').length ==0)return false; 删除空格
                var placeholder = field.placeholder||field.getAttribute('placeholder');
                return (field.value!= placeholder);
            }
            返回 true。说明用户有 输入内容
            function isEmail(field){
                return (field.value.indexOf("@") != -1 && field.value.indexOf(".") != -1 );
            }


    之后接：
        function prepareForms(){
            for(var i =0; i<document.forms.length; i++){
                var thisform = document.forms[i];
                resetFields(thisform);
                thisform.onsubmit = function(){
                    return validateForm(this);
                }
        }
    }

*/