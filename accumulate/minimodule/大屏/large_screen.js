// 大屏计算
const handleScreenAuto = () => {
  const w = 1920; // 设计稿宽度
  const h = 960; // 设计稿高度
  // 视口宽度
  // window.innerWidth
  // document.documentElement.clientWidth
  // document.body.clientWidth

  const clientWidth = document.body.clientWidth;
  const clientHeight = document.body.clientHeight;

  const scaleW = clientWidth / w;
  const scaleH = clientHeight / h;

  let transformScale,
    isFoolScreen = true;
  // 是否全屏显示，不考虑比例，直接拉伸（全屏）
  if (isFoolScreen) {
    transformScale = `scale(${scaleW},${scaleH}) translate(-50%)`;
  } else {
    // 考虑比例，用scale变化，使得页面是整体缩放。
    // 考虑宽度过长，还是高度过长。若宽度过长，以高度为基准
    const scale =
      clientWidth / clientHeight < w / h ? clientWidth / w : clientHeight / h;
    transformScale = `scale(${scale}) translate(-50%)`;
  }
  document.getElementById('screen')?.style.transform = transformScale;
};

const debounce = (cb, delay = 100) => {
  let timer;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      cb && cb();
    }, delay);
  }
};
const dbScreenAuto = debounce(handleScreenAuto);

onMounted(() => {
  handleScreenAuto();
  window.onresize = () => dbScreenAuto();
});