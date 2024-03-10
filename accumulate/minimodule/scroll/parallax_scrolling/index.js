const sections = document.querySelectorAll('section');
const circleEle = document.querySelector('.my-circle');


try {
  // 插件注册
  gsap.registerPlugin(ScrollTrigger);
  // 视差滚动
  sections.forEach(section => {
    gsap.fromTo(section, {
      backgroundPositionY: `-${window.innerHeight / 2}px`,
    }, {
      backgroundPositionY: `${window.innerHeight / 2}px`,
      // duration: 3, 动画时间,单位秒
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        scrub: true, // 与时间脱钩，和滚动关联
      }
    })
  })
  // 圆圈位移(随时间控制，不关联滚动)
  gsap.fromTo(circleEle, {
    x: 0,
    rotate: 0,
  }, {
    x: function (eleIndex, target) {
      return document.documentElement.clientWidth - target.offsetWidth
    },
    y: function (eleIndex, target) {
      return document.documentElement.clientHeight - target.offsetHeight
    },
    rotate: 360,
    duration: 3,
    ease: 'none'
  })
} catch (e) {
  console.log(e);
}