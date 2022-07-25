// 主要核心： 提前写好css类，动态改变class
class Slider{
  constructor(id){
    this.container = document.getElementById(id);
    this.items = this.container
    .querySelectorAll('.slider-list__item, .slider-list__item--selected');
    this.len = this.items.length;
  }
  // return 被选中的当前的li
  getSelectedItem(){
    const selected = this.container
      .querySelector('.slider-list__item--selected');
    return selected
  }
  // return 被选中的当前的li的 index
  getSelectedItemIndex(){
    return Array.from(this.items).indexOf(this.getSelectedItem());
  }

  slideTo(idx){
    const selected = this.getSelectedItem();
    // 当前显示的图片取消显示（opacity = 0）
    if(selected){ 
      selected.className = 'slider-list__item';
    }
    // 显示第idx的图片
    const item = this.items[idx];
    if(item){
      item.className = 'slider-list__item--selected';
    }
  }
  slideNext(){
    const currentIdx = this.getSelectedItemIndex();
    const nextIdx = (currentIdx + 1) % this.items.length;
    this.slideTo(nextIdx);
  }
  slidePrevious(){
    const currentIdx = this.getSelectedItemIndex();
    const previousIdx = (this.items.length + currentIdx - 1)
      % this.items.length;
    this.slideTo(previousIdx);
  }
}

const slider = new Slider('my-slider');
for(let i = 0; i < slider.len; i++) {
  setTimeout(() => {
    slider.slideTo(i);
  },3000*i);
}