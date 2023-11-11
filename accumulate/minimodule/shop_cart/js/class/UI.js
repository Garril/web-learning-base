// 整个界面
class UI {
  constructor(uiData) {
    this.uiData = uiData;
    this.doms = {
      goodsContainer: document.querySelector(".goods-list"),
      deliveryPrice: document.querySelector(".footer-car-tip"),
      footerPay: document.querySelector(".footer-pay"),
      footerPayInnerSpan: document.querySelector(".footer-pay span"),
      totalPrice: document.querySelector(".footer-car-total"),
      car: document.querySelector(".footer-car"),
      badge: document.querySelector(".footer-car-badge"),
    };
    // 获取左下角购物车标位置信息
    const carRect = this.doms.car.getBoundingClientRect();
    // 计算动画位移的最终位置
    const jumpTarget = {
      x: carRect.left + carRect.width / 2,
      y: carRect.top + carRect.height / 5,
    };
    this.jumpTarget = jumpTarget;

    this.createHTML();
    this.updateFooter();
    this.listenEvent();
  }

  // 根据商品数据创建商品列表元素
  createHTML() {
    let html = "";
    for (let i = 0; i < this.uiData.goods.length; i++) {
      const good = this.uiData.goods[i];
      html += `<div class="goods-item">
      <img src="${good.data.pic}" alt="" class="goods-pic">
      <div class="goods-info">
        <h2 class="goods-title">${good.data.title}</h2>
        <p class="goods-desc">${good.data.desc}</p>
        <p class="goods-sell">
          <span>月售 ${good.data.sellNumber}</span>
          <span>好评率${good.data.favorRate}%</span>
        </p>
        <div class="goods-confirm">
          <p class="goods-price">
            <span class="goods-price-unit">￥</span>
            <span>${good.data.price}</span>
          </p>
          <div class="goods-btns">
            <i index="${i}" class="iconfont i-jianhao"></i>
            <span>${good.choose}</span>
            <i index="${i}" class="iconfont i-jiajianzujianjiahao"></i>
          </div>
        </div>
      </div>
    </div>`;
    }
    this.doms.goodsContainer.innerHTML = html;
  }
  // 更新页脚
  updateFooter() {
    // 得到总价数据
    const total = this.uiData.getTotalPrice();
    // 设置配送费
    this.doms.deliveryPrice.textContent = `配送费￥${this.uiData.deliveryPrice}`;
    // 设置起送费还差多少
    if (this.uiData.isCrossDeliveryThreshold()) {
      // 到达起送点
      this.doms.footerPay.classList.add("active");
    } else {
      this.doms.footerPay.classList.remove("active");
      // 更新还差多少钱
      let dis = this.uiData.deliveryThreshold - total;
      dis = Math.round(dis);
      this.doms.footerPayInnerSpan.textContent = `还差￥${dis}元起送`;
    }
    // 设置总价
    this.doms.totalPrice.textContent = total.toFixed(2);
    // 设置购物车的样式状态
    if (this.uiData.hasGoodsInCar()) {
      this.doms.car.classList.add("active");
    } else {
      this.doms.car.classList.remove("active");
    }
    // 设置购物车中的数量
    this.doms.badge.textContent = this.uiData.getTotalChooseNumber();
  }
  // 监听各种事件
  listenEvent() {
    // （动画结束移除所有的animate --- 就购物车图标）
    this.doms.car.addEventListener("animationend", function () {
      this.classList.remove("animate");
    });
  }
  increase(index) {
    this.uiData.increase(index);
    this.updateGoodsItem(index);
    this.updateFooter();
    this.jump(index);
  }

  decrease(index) {
    this.uiData.decrease(index);
    this.updateGoodsItem(index);
    this.updateFooter();
  }
  // 更新某个商品元素的显示状态
  updateGoodsItem(index) {
    const goodsDom = this.doms.goodsContainer.children[index];
    if (this.uiData.isChoose(index)) {
      goodsDom.classList.add("active");
    } else {
      goodsDom.classList.remove("active");
    }
    const span = goodsDom.querySelector(".goods-btns span");
    span.textContent = this.uiData.goods[index].choose;
  }

  // 购物车动画（+号移动结束，给购物车标添加动画）
  carAnimate() {
    this.doms.car.classList.add("animate");
  }
  // 抛物线跳跃的元素
  jump(index) {
    // 找到对应商品的加号
    const btnAdd = this.doms.goodsContainer.children[index].querySelector(
      ".i-jiajianzujianjiahao"
    );
    const rect = btnAdd.getBoundingClientRect();
    const start = {
      x: rect.left,
      y: rect.top,
    };
    // 创建新元素去做动画
    const div = document.createElement("div");
    div.className = "add-to-car";
    const i = document.createElement("i");
    i.className = "iconfont i-jiajianzujianjiahao";
    // 设置初始位置
    div.style.transform = `translateX(${start.x}px)`;
    i.style.transform = `translateY(${start.y}px)`;
    div.appendChild(i);
    document.body.appendChild(div);
    // 强行渲染（强行让他reflow一次，不然下面的样式覆盖上面，相当于没做。）
    div.clientWidth;

    // 设置结束位置
    div.style.transform = `translateX(${this.jumpTarget.x}px)`;
    i.style.transform = `translateY(${this.jumpTarget.y}px)`;
    const that = this;
    div.addEventListener(
      "transitionend",
      function () {
        div.remove();
        that.carAnimate();
      },
      {
        once: true, // 事件仅触发一次
      }
    );
  }
}
