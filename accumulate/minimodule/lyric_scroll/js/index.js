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
  };
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
});

