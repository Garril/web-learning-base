/**
 * 创建歌词元素 li
 */
function createLyricElements(lyricData, doms) {
  // 文档片段(小优化)
  var frag = document.createDocumentFragment();
  for (var i = 0; i < lyricData.length; i++) {
    var li = document.createElement('li');
    li.textContent = lyricData[i].words;
    frag.appendChild(li); // 改动了 dom 树
  }
  doms.ul.appendChild(frag);
}

/**
 * 计算出，在当前播放器播放到第几秒的情况下
 * lrcData数组中，应该高亮显示的歌词下标
 * 如果没有任何一句歌词需要显示，则得到-1
 */
function findIndex(lyricData, doms) {
  // 播放器当前时间 （秒）
  const curTime = doms.audio.currentTime;
  const resIndex = lyricData.findIndex((item, index) => {
    if (curTime < item['time']) {
      return true;
    }
  })
  if (resIndex == -1) {
    return lyricData.length - 1;
  } else {
    return resIndex - 1;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // 获取需要的 dom
  const doms = {
    audio: document.querySelector('audio'),
    ul: document.querySelector('.container ul'),
    container: document.querySelector('.container'),
    canvas: document.querySelector('#mycanvas')
  };
  const ctx = doms.canvas?.getContext('2d');
  // 获取解析后的歌词数据
  const lyricData = parseLrc();
  // 根据歌词数据创建li
  createLyricElements(lyricData, doms);
  // 容器高度
  const containerHeight = doms.container.clientHeight;
  // 每个 li 的高度
  const liHeight = doms.ul.children[0].clientHeight;
  // 最大偏移量(歌词到底不再往上滑的情况)
  const maxOffset = doms.ul.clientHeight - containerHeight;
  /**
 * 设置 ul 元素的偏移量
 */
  function setOffset() {
    const index = findIndex(lyricData, doms);
    // +liHeight/2 =》 歌词在当前li居中
    // - containHeight/2，当前歌词在ul中，居中
    let offset = liHeight * index + liHeight / 2 - containerHeight / 2;
    if (offset < 0) {
      offset = 0;
    }
    if (offset > maxOffset) {
      offset = maxOffset;
    }
    doms.ul.style.transform = `translateY(-${offset}px)`;
    // 去掉之前的 active 样式
    let li = doms.ul.querySelector('.active');
    li && li.classList.remove('active');
    li = doms.ul.children[index];
    li && li.classList.add('active');
  }
  // 记得别把setOffset()丢进去。
  doms.audio.addEventListener('timeupdate', setOffset);


  // canvas部分
  let isInit = false;
  let dataArray, analyser;
  doms.audio.onplay = () => {
    if (isInit) return;
    // 初始化
    isInit = true;

    const audioCtx = new AudioContext(); // 创建音频上下文
    const source = audioCtx.createMediaElementSource(doms.audio); // 1、创建音频源节点,以他的数据作为来源
    // 每次处理音频，比如音色、混响的过程都算一个节点，每次产生新节点，最后输出。
    // 2、创建分析器（分析音频数据里的各种波形）
    analyser = audioCtx.createAnalyser();
    // 分析器将源（时域图）=》通过频谱分析，转到 分析波形（频域图）
    analyser.fftSize = 512; // 需要是:2^n，越大越细致，默认2048
    // 数组保存分析后的数据，每一项表示一个无符号8位整数
    dataArray = new Uint8Array(analyser.frequencyBinCount);
    // 3、连接音频源和分析器
    source.connect(analyser);
    // 4、连接分析器到输出设备
    analyser.connect(audioCtx.destination);

    ctx.fillStyle = '#3f85ff';
    // 单边，无对称
    // function draw() {
    //   requestAnimationFrame(draw);
    //   const { width, height } = doms.canvas;
    //   ctx.clearRect(0, 0, width, height);
    //   // 把分析器节点当前分析出的数据，存数组中
    //   analyser.getByteFrequencyData(dataArray);
    //   // 长度切一半多是因为，后面的波段几乎没用到，人耳听不到
    //   const len = dataArray.length / 2.5;
    //   const barWidth = width / len;
    //   for (let i = 0; i < len; i++) {
    //     const itemData = dataArray[i];
    //     const barHeight = (itemData / 255) * height;
    //     const x = i * barWidth;
    //     const y = height - barHeight;
    //     // barWidth - 2 留空隙
    //     ctx.fillRect(x, y, barWidth - 2, barHeight);
    //   }
    // }
    function draw() {
      requestAnimationFrame(draw);
      const { width, height } = doms.canvas;
      ctx.clearRect(0, 0, width, height);
      // 把分析器节点当前分析出的数据，存数组中
      analyser.getByteFrequencyData(dataArray);
      // 长度切一半多是因为，后面的波段几乎没用到，人耳听不到
      const len = dataArray.length / 2.5;
      // 除以2，搞对称
      const barWidth = width / len / 2;
      for (let i = 0; i < len; i++) {
        const itemData = dataArray[i];
        const barHeight = (itemData / 255) * height;
        // 左边
        const x1 = width / 2 - (i + 1) * barWidth;
        // 右边
        const x2 = i * barWidth + width / 2;
        const y = height - barHeight;
        // barWidth - 2 留空隙
        ctx.fillRect(x1, y, barWidth - 2, barHeight);
        ctx.fillRect(x2, y, barWidth - 2, barHeight);
      }
    }
    draw();
  }
});

