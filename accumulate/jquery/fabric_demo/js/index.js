import { useCropper } from "../js/cropper.js";
useCropper($);

const $ele = $('.imgEdit'),
  $openEdit = $('#openEdit');
const $box = $ele.find('.imgEditor-box');

$ele.find('.imgEditor-box').cropper({}, {});
$box.hide();
$openEdit.click(function () {
  $box.toggle();
})