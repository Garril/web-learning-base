var initImageEditor = function (cWidget) {
  var $ele = cWidget.element;
  $ele.find('.imgEditor-box').cropper({
    'autoCrop': true,
    'cWidget': cWidget
  });
};