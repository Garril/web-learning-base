/* 检查浏览器是否支持特定属性 */
/*    用法：
if(!elementSupportsAttribute('input','placeholder')){
    //生成占位符提示信息的脚本
} */
function elementSupportsAttribute(elementName, attribute) {
    if (!document.createElement) {
        return false;
    }
    var temp = document.createElement(elementName);
    return (attribute in temp);
}
/* eg： 不支持input 的 placeholder
    < input type = "text" id = "first_name" placeholder = "Your First Name" / >
    if(!Modernizr.input.placeholder){
        var input = document.getElementById('first_name');
        input.onfocus = function(){
            var text = this.placeholder||this.getAttribute('placeholder');
            if(this.value == text){
                //重制输入框的值，以隐藏临时的占位符文本
                this.value ='';
            }
        }
        input.onblur = function(){
            if(this.value ==''){
                //把输入框的值设置为占位符文本
                this.value = this.placeholder ||this.getAttribute('placeholder');
            }
        }
        //在onblur处理函数运行时添加占位符文本
        input.onblur();
    }      
*/