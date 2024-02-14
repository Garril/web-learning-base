/* 
  游离节点造成的内存泄露（官方bug，觉得没必要修）
  页面垃圾回收的时候，会保留（最后一个）聚焦过的文本框（手动blur失焦还是不会回收）
  如果一个页面表单，用户在文本框填写大量问题之后，上传
  发现填的时候，还是发布后刷新页面看到的内容，都是卡，可能就是这个问题。
  解决方案可以是：创建一个新的空富文本，聚焦他，隐藏他。。。。

  具体测试看--f12--performance--结合手动垃圾回收看内存曲线

  案例：创建10个文本框
  每次创建都是：创建--聚焦--隔100ms--消失
*/
function createInput() {
  return new Promise((resolve) => {
    const inp = document.createElement('input');
    document.body.appendChild(inp);
    inp.focus();
    setTimeout(() => {
      inp.remove();
      resolve();
    }, 500);
  });
}

function delay(duration = 1000) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  })
}
async function createInputs() {
  for (let i = 0; i < 10; i++) {
    await createInput();
    await delay(100);
  }
}