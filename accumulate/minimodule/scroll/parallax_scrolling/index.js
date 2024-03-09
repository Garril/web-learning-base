const sections = document.querySelectorAll('section');

try {
  gsap.registerPlugin(ScrollTrigger);
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
} catch (e) {
  console.log(e);
}