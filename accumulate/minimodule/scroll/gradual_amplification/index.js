function createAnimation(scrollStart, scrollEnd, startValue, endValue) {
  return function (x) {
    if (x < scrollStart) {
      return startValue;
    }
    if (x > scrollEnd) {
      return endValue;
    }
    const progress = (x - scrollStart) / (scrollEnd - scrollStart);
    return startValue + (endValue - startValue) * progress;
  };
}

// const opacityAnimation = creatAnimation(100, 2000, 0, 1);
// opacityAnimation(500);
const animationMap = new Map();
const items = document.querySelectorAll('.list-item');
const playGround = document.querySelector('.playground');
const list = document.querySelector('.list');

function getDomAnimation(dom, scrollStart, scrollEnd) {
  scrollStart += dom.dataset.order * 100;
  const opacityAnimation = createAnimation(scrollStart, scrollEnd, 0, 1);
  const transformAnimation = createAnimation(scrollStart, scrollEnd, 0.5, 1);
  const { clientWidth, clientHeight, offsetTop, offsetLeft } = dom;
  const rect = list.getBoundingClientRect();

  const xAnimation = createAnimation(scrollStart, scrollEnd, rect.width / 2 - clientWidth / 2 - offsetLeft, 0);
  const yAnimation = createAnimation(scrollStart, scrollEnd, rect.height / 2 - clientHeight / 2 - offsetTop, 0);
  const opacity = function (x) {
    return opacityAnimation(x);
  }
  const transform = function (x) {
    return `translate(${xAnimation(x)}px,${yAnimation(x)}px) scale(${transformAnimation(x)})`;
  }
  return {
    opacity,
    transform
  }
}

// 设置（更新）动画映射
function updateMap() {
  const playGroundRect = playGround.getBoundingClientRect();;
  const scrollY = window.scrollY;
  const scrollStart = playGroundRect.top + scrollY;
  const scrollEnd = playGroundRect.bottom + scrollY - window.innerHeight;
  for (const item of items) {
    animationMap.set(item, getDomAnimation(item, scrollStart, scrollEnd));
  }
}

updateMap();
// 将map结构中的动画应用到元素上
function updateStyles() {
  const scrollY = window.scrollY;
  for (const [dom, animations] of animationMap) {
    for (const prop in animations) {
      const value = animations[prop](scrollY);
      dom.style[prop] = value;
    }
  }
}
updateStyles();
window.addEventListener('scroll', updateStyles);
