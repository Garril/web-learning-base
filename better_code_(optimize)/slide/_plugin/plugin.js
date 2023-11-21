/* 
  完成了插件化，但是，目前看来结构写死在html里面的，
  后续添加html也还是得手动
  所以我们进行html的模板化 --- js的ui，数据驱动，根据数据生成html模板
*/
// 将控制元素，抽取成插件
// 插件和组件之间通过依赖注入的方式建立联系 
class Slider {
  constructor(id, cycle = 3000) { // 默认3s切换一次图片
    this.container = document.getElementById(id);
    this.items = this.container.querySelectorAll('.slider-list__item, .slider-list__item--selected');
    this.cycle = cycle;
  }
  // 新加部分 ------------ 注册插件处理 -----------
  registerPlugins(...plugins) {
    // 遍历：把slider实例对象自身，作为this传入函数，执行
    plugins.forEach(plugin => plugin(this));
  }
  // -------------------------------------------
  getSelectedItem() {
    const selected = this.container.querySelector('.slider-list__item--selected');
    return selected
  }
  getSelectedItemIndex() {
    return Array.from(this.items).indexOf(this.getSelectedItem());
  }

  slideTo(idx) {
    const selected = this.getSelectedItem();
    if (selected) {
      selected.className = 'slider-list__item';
    }
    const item = this.items[idx];
    if (item) {
      item.className = 'slider-list__item--selected';
    }
    // 还是派发 slide 事件
    const detail = { index: idx }
    const event = new CustomEvent('slide', { bubbles: true, detail })
    this.container.dispatchEvent(event)
  }
  slideNext() {
    const currentIdx = this.getSelectedItemIndex();
    const nextIdx = (currentIdx + 1) % this.items.length;
    this.slideTo(nextIdx);
  }
  slidePrevious() {
    const currentIdx = this.getSelectedItemIndex();
    const previousIdx = (this.items.length + currentIdx - 1) % this.items.length;
    this.slideTo(previousIdx);
  }
  start() {
    this.stop();
    this._timer = setInterval(() => this.slideNext(), this.cycle);
  }
  stop() {
    clearInterval(this._timer);
  }
  // 新加部分  -------- 简单的事件监听处理 ---------
  addEventListener(type, handler) {
    this.container.addEventListener(type, handler)
  }
  // -------------------------
}

// 底下小圆点插件化
function pluginController(slider) {
  const controller = slider.container.querySelector('.slide-list__control');
  if (controller) {
    const buttons = controller.querySelectorAll('.slide-list__control-buttons, .slide-list__control-buttons--selected');
    // mouseover
    controller.addEventListener('mouseover', evt => {
      const idx = Array.from(buttons).indexOf(evt.target);
      if (idx >= 0) {
        slider.slideTo(idx);
        slider.stop();
      }
    });
    // mouseout
    controller.addEventListener('mouseout', evt => {
      slider.start();
    });
    // slide --- 这个事件在Slider实例的slideTo函数发出
    slider.addEventListener('slide', evt => {
      const idx = evt.detail.index
      const selected = controller.querySelector('.slide-list__control-buttons--selected');
      if (selected) selected.className = 'slide-list__control-buttons';
      buttons[idx].className = 'slide-list__control-buttons--selected';
    });
  }
}
// 左箭头插件化
function pluginPrevious(slider) {
  const previous = slider.container.querySelector('.slide-list__previous');
  if (previous) {
    previous.addEventListener('click', evt => {
      slider.stop();
      slider.slidePrevious();
      slider.start();
      evt.preventDefault();
    });
  }
}
// 右箭头插件化
function pluginNext(slider) {
  const next = slider.container.querySelector('.slide-list__next');
  if (next) {
    next.addEventListener('click', evt => {
      slider.stop();
      slider.slideNext();
      slider.start();
      evt.preventDefault();
    });
  }
}
// 随便一张图片 插件
function pluginRandomGet(slider) {
  // console.log(randomGet) 
  // 输出： <button id="randomGet">随机图片</button>
  randomGet.addEventListener('click', () => {
    let idx = Math.floor(slider.items.length * Math.random());
    const curIndex = slider.getSelectedItemIndex();
    if (idx == curIndex) {
      idx = (idx + 1) % slider.items.length;
    }
    slider.stop();
    slider.slideTo(idx);
    slider.start();
  });
}

const slider = new Slider('my-slider');
slider.registerPlugins(pluginController, pluginPrevious, pluginNext, pluginRandomGet);
slider.start();