/* 
  抽出一层Component类
    处理注册插件 和 渲染（abstract待子类实现）
  更进：还没考虑嵌套：
    有些组件可以嵌套的，他的子组件可以作为父组件的插件来使用
    这里Component 和 Plugin是分开的
    可以设计一种更通用的，把 Component 和 Plugin组合起来，构成一个SumCpn
    SumCpn有它的子组件，作为父组件插件来使用
*/
class Component {
  constructor(id, opts = {name, data:[]}) {
    this.container = document.getElementById(id);
    this.options = opts;
    this.container.innerHTML = this.render(opts.data);
  }
  registerPlugins(...plugins) {
    plugins.forEach(plugin => {
      const pluginContainer = document.createElement('div');
      // 名字通用化，其他无变化
      pluginContainer.className = `.${name}__plugin`;
      pluginContainer.innerHTML = plugin.render(this.options.data);
      this.container.appendChild(pluginContainer);
      plugin.action(this);
    });
  }
  render(data) {
    /* abstract */
    return ''
  }
}
// 继承Component，实现render，实现自身api
// 插件处理的代码被抽出
class Slider extends Component {
  constructor(id, opts = {name: 'slider-list', data:[], cycle: 3000}){
    super(id, opts);
    this.items = this.container.querySelectorAll('.slider-list__item, .slider-list__item--selected');
    this.cycle = opts.cycle || 3000;
    this.slideTo(0);
  }
  render(data) {
    const content = data.map(image => `
      <li class="slider-list__item">
        <img src="${image}"/>
      </li>
    `.trim());
    return `<ul>${content.join('')}</ul>`;
  }
  getSelectedItem() {
    const selected = this.container.querySelector('.slider-list__item--selected');
    return selected
  }
  getSelectedItemIndex() {
    return Array.from(this.items).indexOf(this.getSelectedItem());
  }
  slideTo(idx) {
    const selected = this.getSelectedItem();
    if(selected){ 
      selected.className = 'slider-list__item';
    }
    const item = this.items[idx];
    if(item){
      item.className = 'slider-list__item--selected';
    }

    const detail = {index: idx}
    const event = new CustomEvent('slide', {bubbles:true, detail})
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
  addEventListener(type, handler){
    this.container.addEventListener(type, handler);
  }
  start() {
    this.stop();
    this._timer = setInterval(()=>this.slideNext(), this.cycle);
  }
  stop() {
    clearInterval(this._timer);
  }
}
// 插件都实现 render 和 action 即可
const pluginController = {
  render(images) {
    return `
      <div class="slide-list__control">
        ${images.map((image, i) => `
            <span class="slide-list__control-buttons${i===0?'--selected':''}"></span>
        `).join('')}
      </div>    
    `.trim();
  },
  action(slider) {
    let controller = slider.container.querySelector('.slide-list__control');
    
    if(controller){
      let buttons = controller.querySelectorAll('.slide-list__control-buttons, .slide-list__control-buttons--selected');
      controller.addEventListener('mouseover', evt=>{
        var idx = Array.from(buttons).indexOf(evt.target);
        if(idx >= 0){
          slider.slideTo(idx);
          slider.stop();
        }
      });

      controller.addEventListener('mouseout', evt=>{
        slider.start();
      });

      slider.addEventListener('slide', evt => {
        const idx = evt.detail.index;
        let selected = controller.querySelector('.slide-list__control-buttons--selected');
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
    let previous = slider.container.querySelector('.slide-list__previous');
    if(previous){
      previous.addEventListener('click', evt => {
        slider.stop();
        slider.slidePrevious();
        slider.start();
        evt.preventDefault();
      });
    }  
  }
};

const pluginNext = {
  render(){
    return `<a class="slide-list__next"></a>`;
  },
  action(slider){
    let previous = slider.container.querySelector('.slide-list__next');
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

const slider = new Slider('my-slider',
  {
    images: ['https://p5.ssl.qhimg.com/t0119c74624763dd070.png',
            'https://p4.ssl.qhimg.com/t01adbe3351db853eb3.jpg',
            'https://p2.ssl.qhimg.com/t01645cd5ba0c3b60cb.jpg',
            'https://p4.ssl.qhimg.com/t01331ac159b58f5478.jpg'],
    cycle: 3000
  }
);
slider.registerPlugins(pluginController, pluginPrevious, pluginNext);
slider.start();