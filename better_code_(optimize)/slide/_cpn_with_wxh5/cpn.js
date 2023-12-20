// 考虑微信h5界面
class Component {
  constructor(id, opts = { name, data: [] }) {
    this.container = $(`#${id}`);
    this.options = opts;
    const content = this.render(opts.data);
    this.container.html(content);
  }
  registerPlugins(...plugins) {
    plugins.forEach((plugin) => {
      const content = plugin.render(this.options.data);
      const pluginContainer = $(
        `<div class="${name}__plugin">${content}</div>`
      );
      // 名字通用化，其他无变化
      this.container.append(pluginContainer);
      plugin.action(this);
    });
  }
  render(data) {
    /* abstract */
    return "";
  }
}

// 假设是微信
function isWx() {
  return false;
}

// 判断pc和移动端
function browserRedirect() {
  var sUserAgent = navigator.userAgent.toLowerCase();
  var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
  var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
  var bIsMidp = sUserAgent.match(/midp/i) == "midp";
  var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
  var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
  var bIsAndroid = sUserAgent.match(/android/i) == "android";
  var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
  var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";

  if (
    bIsIpad ||
    bIsIphoneOs ||
    bIsMidp ||
    bIsUc7 ||
    bIsUc ||
    bIsAndroid ||
    bIsCE ||
    bIsWM
  ) {
    // Mobile device detected, perform actions for mobile view
    return "mobile";
  } else {
    // PC device detected, perform actions for PC view
    return "pc";
  }
}

// pc端轮播图
class imageSliderPC extends Component {
  constructor(id, opts = { name: "my-slider", data: [], cycle: 3000 }) {
    super(id, opts);
    this.container.addClass("pc-slider-list");
    this.items = this.container.find(
      ".slider-list__item, .slider-list__item--selected"
    );
    this.cycle = opts.cycle || 3000;
    this.slideTo(0);
  }
  render(data) {
    const content = data.map((image, index) =>
      `
      <li class="slider-list__item" >
        <img src="${image}"/>
      </li>
    `.trim()
    );
    return `<ul>${content.join("")}</ul>`;
  }
  getSelectedItem() {
    const selected = this.container.find(".slider-list__item--selected");
    return selected;
  }
  getSelectedItemIndex() {
    return Array.from(this.items).indexOf(this.getSelectedItem());
  }
  slideTo(idx) {
    const selected = this.getSelectedItem();
    if (selected) {
      selected.className = "slider-list__item";
    }
    const item = this.items[idx];
    if (item) {
      item.className = "slider-list__item--selected";
    }

    const detail = { index: idx };
    // const event = new CustomEvent('slide', { bubbles: true, detail })
    // this.container.dispatchEvent(event)
    this.container.trigger("slide");
  }
  slideNext() {
    const currentIdx = this.getSelectedItemIndex();
    const nextIdx = (currentIdx + 1) % this.items.length;
    this.slideTo(nextIdx);
  }
  slidePrevious() {
    const currentIdx = this.getSelectedItemIndex();
    const previousIdx =
      (this.items.length + currentIdx - 1) % this.items.length;
    this.slideTo(previousIdx);
  }
  // addEventListener(type, handler) {
  //   this.container.addEventListener(type, handler);
  // }
  start() {
    this.stop();
    this._timer = setInterval(() => this.slideNext(), this.cycle);
  }
  stop() {
    clearInterval(this._timer);
  }
}
// 插件都实现 render 和 action 即可
const pluginControllerPC = {
  render(images) {
    return `
      <div class="slide-list__control">
        ${images
        .map(
          (image, i) => `
            <span class="slide-list__control-buttons${i === 0 ? "--selected" : ""
            }"></span>
        `
        )
        .join("")}
      </div>
    `.trim();
  },
  action(slider) {
    let controller = slider.container.find(".slide-list__control");

    if (controller) {
      let buttons = controller.find(
        ".slide-list__control-buttons, .slide-list__control-buttons--selected"
      );
      controller.on("mouseover", (evt) => {
        var idx = Array.from(buttons).indexOf(evt.target);
        if (idx >= 0) {
          slider.slideTo(idx);
          slider.stop();
        }
      });

      controller.on("mouseout", (evt) => {
        slider.start();
      });

      slider.container.bind("slide", (evt) => {
        const idx = evt.detail.index;
        let selected = controller.find(
          ".slide-list__control-buttons--selected"
        );
        if (selected) selected.className = "slide-list__control-buttons";
        buttons[idx].className = "slide-list__control-buttons--selected";
      });
    }
  },
};

const pluginPreviousPC = {
  render() {
    return `<a class="slide-list__previous"></a>`;
  },
  action(slider) {
    let previous = slider.container.find(".slide-list__previous");
    if (previous) {
      previous.on("click", (evt) => {
        slider.stop();
        slider.slidePrevious();
        slider.start();
        evt.preventDefault();
      });
    }
  },
};

const pluginNextPC = {
  render() {
    return `<a class="slide-list__next"></a>`;
  },
  action(slider) {
    let previous = slider.container.find(".slide-list__next");
    if (previous) {
      previous.on("click", (evt) => {
        slider.stop();
        slider.slideNext();
        slider.start();
        evt.preventDefault();
      });
    }
  },
};

const pluginHoverStopPC = {
  render() {
    return "";
  },
  action(slider) {
    slider.items.on("mouseenter", () => {
      slider.stop();
    });
    slider.items.on("mouseleave", () => {
      slider.start();
    });
  },
};

// 小程序h5轮播图
class imageSliderH5 extends Component {
  constructor(id, opts = { name: "my-slider", data: [], cycle: 3000 }) {
    super(id, opts);
    this.container.classList.add("h5-slider-list");
  }
}

let slider;
if (isWx()) {
  // 微信h5
  slider = new imageSliderH5("my-slider", {
    data: [
      "https://p5.ssl.qhimg.com/t0119c74624763dd070.png",
      "https://p4.ssl.qhimg.com/t01adbe3351db853eb3.jpg",
      "https://p2.ssl.qhimg.com/t01645cd5ba0c3b60cb.jpg",
      "https://p4.ssl.qhimg.com/t01331ac159b58f5478.jpg",
    ],
    cycle: 2000,
  });
  // slider.registerPlugins(pluginControllerPC, pluginPreviousPC, pluginNextPC, pluginHoverStopPC);
  // slider.start();
} else {
  // pc，进一步区分pc和移动端。微信browserRedirect报错
  const cur_envir = browserRedirect();
  if (cur_envir == "mobile") {
    slider = new imageSliderH5("my-slider", {
      data: [
        "https://p5.ssl.qhimg.com/t0119c74624763dd070.png",
        "https://p4.ssl.qhimg.com/t01adbe3351db853eb3.jpg",
        "https://p2.ssl.qhimg.com/t01645cd5ba0c3b60cb.jpg",
        "https://p4.ssl.qhimg.com/t01331ac159b58f5478.jpg",
      ],
      cycle: 2000,
    });
  } else if (cur_envir == "pc") {
    slider = new imageSliderPC("my-slider", {
      data: [
        "https://p5.ssl.qhimg.com/t0119c74624763dd070.png",
        "https://p4.ssl.qhimg.com/t01adbe3351db853eb3.jpg",
        "https://p2.ssl.qhimg.com/t01645cd5ba0c3b60cb.jpg",
        "https://p4.ssl.qhimg.com/t01331ac159b58f5478.jpg",
      ],
      cycle: 2000,
      height: "35vh",
      width: "55vw",
    });
    slider.registerPlugins(
      pluginControllerPC,
      pluginPreviousPC,
      pluginNextPC,
      pluginHoverStopPC
    );
    slider.start();
  }
}
