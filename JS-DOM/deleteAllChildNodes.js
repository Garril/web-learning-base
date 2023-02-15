function deleteAllChildNodes(element) {
    while (element.hasChildNodes) {
        element.removeChild(element.lastChild);
    }
}