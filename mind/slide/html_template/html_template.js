/* 
  我们可以看到这里的html代码，只有一行了 
  取而代之，我们用render方法去生成
  
  插件中我们主要做两件事情
  1、render接收数据，渲染模板返回
  2、action接收slider实例（进行api调用）--render后执行
    且，在render阶段生成的模板中，html有css类名
    通过querySelector，
    可以对其进行事件监听 和 css的className的切换
*/
class Slider{
  constructor(id, opts = {images:[], cycle: 3000}){
    this.container = document.getElementById(id);
    this.options = opts;
    this.cycle = opts.cycle || 3000;
    // render一定要在querySelectorAll之前
    this.container.innerHTML = this.render();
    this.items = this.container.querySelectorAll('.slider-list__item, .slider-list__item--selected');
    this.slideTo(0);
  }
  // render 获取 数据对应的html模板
  render(){
    const images = this.options.images;
    // 模板拼接 --- 新数组content
    const content = images.map(image => `
      <li class="slider-list__item">
        <img src="${image}"/>
      </li>    
    `.trim());
    return `<ul>${content.join('')}</ul>`;
  }
  // 插件注册
  registerPlugins(...plugins){
    plugins.forEach(plugin => {
      // 构建div，div内放插件render返回的内容，最后将其放入container，样式看css
      const pluginContainer = document.createElement('div');
      pluginContainer.className = '.slider-list__plugin';
      pluginContainer.innerHTML = plugin.render(this.options.images);
      this.container.appendChild(pluginContainer);
      plugin.action(this);
    });
  }

  getSelectedItem(){
    const selected = this.container.querySelector('.slider-list__item--selected');
    return selected
  }
  getSelectedItemIndex(){
    return Array.from(this.items).indexOf(this.getSelectedItem());
  }
  slideTo(idx){
    const selected = this.getSelectedItem();
    if(selected){ 
      selected.className = 'slider-list__item';
    }
    let item = this.items[idx];
    if(item){
      item.className = 'slider-list__item--selected';
    }
    
    const detail = {index: idx}
    const event = new CustomEvent('slide', {bubbles:true, detail})
    this.container.dispatchEvent(event)
  }
  slideNext(){
    const currentIdx = this.getSelectedItemIndex();
    const nextIdx = (currentIdx + 1) % this.items.length;
    this.slideTo(nextIdx);
  }
  slidePrevious(){
    const currentIdx = this.getSelectedItemIndex();
    const previousIdx = (this.items.length + currentIdx - 1) % this.items.length;
    this.slideTo(previousIdx);  
  }
  addEventListener(type, handler){
    this.container.addEventListener(type, handler);
  }
  start(){
    this.stop();
    this._timer = setInterval(() => this.slideNext(), this.cycle);
  }
  stop(){
    clearInterval(this._timer);
  }
}

const pluginController = {
  render(images){
    return `
      <div class="slide-list__control">
        ${images.map((image, i) => `
            <span class="slide-list__control-buttons${i===0?'--selected':''}"></span>
        `).join('')}
      </div>    
    `.trim();
  },
  action(slider){
    const controller = slider.container.querySelector('.slide-list__control');
    
    if(controller){
      const buttons = controller.querySelectorAll('.slide-list__control-buttons, .slide-list__control-buttons--selected');
      controller.addEventListener('mouseover', evt => {
        const idx = Array.from(buttons).indexOf(evt.target);
        if(idx >= 0){
          slider.slideTo(idx);
          slider.stop();
        }
      });

      controller.addEventListener('mouseout', evt => {
        slider.start();
      });

      slider.addEventListener('slide', evt => {
        const idx = evt.detail.index
        const selected = controller.querySelector('.slide-list__control-buttons--selected');
        if(selected) selected.className = 'slide-list__control-buttons';
        buttons[idx].className = 'slide-list__control-buttons--selected';
      });
    }    
  }
};

const pluginPrevious = {
  render(){
    return `<a class="slide-list__previous"></a>`;
  },
  action(slider){
    const previous = slider.container.querySelector('.slide-list__previous');
    if(previous){
      previous.addEventListener('click', evt => {
        slider.stop();
        slider.slidePrevious();
        slider.start();
        evt.preventDefault(); // 阻止a标签默认跳转
      });
    }  
  }
};

const pluginNext = {
  render(){
    return `<a class="slide-list__next"></a>`;
  },
  action(slider){
    const previous = slider.container.querySelector('.slide-list__next');
    if(previous){
      previous.addEventListener('click', evt => {
        slider.stop();
        slider.slideNext();
        slider.start();
        evt.preventDefault();
      });
    }  
  }
};
// 修改部分 -----------------------------------------------
const slider = new Slider('my-slider',
  {
    images: ['https://p5.ssl.qhimg.com/t0119c74624763dd070.png',
            'https://p4.ssl.qhimg.com/t01adbe3351db853eb3.jpg',
            'https://p2.ssl.qhimg.com/t01645cd5ba0c3b60cb.jpg',
            'https://p4.ssl.qhimg.com/t01331ac159b58f5478.jpg'],
    cycle: 3000
  } // 数据传入
);
// -----------------------------------------------

slider.registerPlugins(pluginController, pluginPrevious, pluginNext);
slider.start();