// 此函数的功能， table 表格的奇数行 变色，标题行和内容区：第二行和其他内容区的偶数行变色
function stripeTables() {
    if (!document.getElementsByTagName) { return false; }
    // 获取所有的 table
    var tables = document.getElementsByTagName("table");
    var odd, rows;
    for (var i = 0; i < tables.length; i++) {
        odd = true; //第一个 tr --> 第一行为奇数行
        rows = tables[i].getElementsByTagName("tr"); // rows 为当前 table 的 tr 数组
        for (var j = 0; j < rows.length; j++) {
            if (odd == true) { // 奇数行
                rows[j].style.backgroundColor = "#ffc"; // 可以配合 addClass函数设置成加class，分离行为和表现
                odd = false; // 下一次变成偶数行
            } else {
                odd = true;
            }
        }
    }
}
// 因为 td 和 th 都是包含在 tr（行） 中的，所以，如果想要 th 表格的标题行单独设置颜色
// 则： 第10行 循环变量初始值 j = 2 ，再单独在CSS文件给 第一个tr设置颜色