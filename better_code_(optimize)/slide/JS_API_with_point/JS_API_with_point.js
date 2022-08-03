/* 完成后：思考，从JS_API,我们实现了结构设计、展现效果和 API（功能） 
但是：在这里加 控制流的时候，你会发现代码改动，还是很大的，地方还多。
如果我不要左右箭头功能了呢，你还得到处删代码
为此：重构轮播图组件 ---- 插件化
  解耦
    将控制元素抽取成插件
    插件与组件之间通过依赖注入方式建立联系
*/

// 增加了两个东西（控制流）:
// 一个是左右的控制滚动 和 底部的小圆点控制滚动
class Slider{
  constructor(id, cycle = 3000){
    this.container = document.getElementById(id);
    this.items = this.container.querySelectorAll('.slider-list__item, .slider-list__item--selected');
    
    // 相比JS_API增加部分
    this.cycle = cycle;
    const controller = this.container.querySelector('.slide-list__control');
    if(controller){
      const buttons = controller.querySelectorAll('.slide-list__control-buttons, .slide-list__control-buttons--selected');
      // 给小圆点容器添加 监听事件
      // 鼠标移入
      controller.addEventListener('mouseover', evt=>{
        const idx = Array.from(buttons).indexOf(evt.target);
        if(idx >= 0){
          this.slideTo(idx);
          // 记得鼠标停在 底部的小圆点上时，停掉动画
          this.stop();
        }
      });
      // 鼠标移出
      controller.addEventListener('mouseout', evt=>{
        this.start();
      });

      // 给轮播图容器添加 slide 监听事件
      this.container.addEventListener('slide', evt => {
        const idx = evt.detail.index; // 拿到当前图片 index
        // 修改 当前应该显示的 对应的小圆点
        const selected = controller.querySelector('.slide-list__control-buttons--selected');
        if(selected) selected.className = 'slide-list__control-buttons';
        buttons[idx].className = 'slide-list__control-buttons--selected';
      })
    }
    // 左边箭头
    const previous = this.container.querySelector('.slide-list__previous');
    if(previous){
      previous.addEventListener('click', evt => {
        // 都是先停，然后切换图片后，再重新播放
        this.stop();
        this.slidePrevious();
        this.start();
        evt.preventDefault();
      });
    }
    // 右边箭头
    const next = this.container.querySelector('.slide-list__next');
    if(next){
      next.addEventListener('click', evt => {
        this.stop();
        this.slideNext();
        this.start();
        evt.preventDefault();
      });
    }

  }
  getSelectedItem(){
    let selected = this.container.querySelector('.slider-list__item--selected');
    return selected
  }
  getSelectedItemIndex(){
    return Array.from(this.items).indexOf(this.getSelectedItem());
  }
  slideTo(idx) {
    let selected = this.getSelectedItem();
    if(selected) { 
      selected.className = 'slider-list__item';
    }
    let item = this.items[idx];
    if(item) {
      item.className = 'slider-list__item--selected';
    }
    // 触发 slide 事件 --- CustomEvent看slide文件下event.js
    const detail = {index: idx}
    const event = new CustomEvent('slide', { bubbles:true, detail })
    this.container.dispatchEvent(event)
  }
  slideNext() {
    let currentIdx = this.getSelectedItemIndex();
    let nextIdx = (currentIdx + 1) % this.items.length;
    this.slideTo(nextIdx);
  }
  slidePrevious() {
    let currentIdx = this.getSelectedItemIndex();
    let previousIdx = (this.items.length + currentIdx - 1) % this.items.length;
    this.slideTo(previousIdx);  
  }

  start() {
    this.stop(); // 加道保险
    this._timer = setInterval(() => this.slideNext(), this.cycle);
  }
  stop(){
    clearInterval(this._timer);
  }
}

const slider = new Slider('my-slider');
slider.start();