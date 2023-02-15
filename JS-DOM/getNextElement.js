// 参数 node 为 某一元素的 下一个节点，即：xxx.nextSibling。
function getNextElement(node) {
    if (node.nodeType == 1) {
        return node;
    }
    if (node.nextSibling) {
        return getNextElement(node.nextSibling);
    }
    return null;
}