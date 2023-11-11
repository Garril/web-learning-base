// 整个界面的数据
class UIData {
  constructor() {
    const uiGoods = [];
    for (let i = 0; i < shopData.length; i++) {
      const uig = new UIGoods(shopData[i]);
      uiGoods.push(uig);
    }
    this.uiGoods = uiGoods;
    this.deliveryThreshold = 30;
    this.deliveryPrice = 5;
  }

  getTotalPrice() {
    let sum = 0;
    for (let i = 0; i < this.uiGoods.length; i++) {
      const g = this.uiGoods[i];
      sum += g.getTotalPrice();
    }
    return sum;
  }

  // 增加某件商品的选中数量
  increase(index) {
    this.uiGoods[index].increase();
  }
  // 减少某件商品的选中数量
  decrease(index) {
    this.uiGoods[index].decrease();
  }

  // 得到总共的选择数量
  getTotalChooseNumber() {
    let sum = 0;
    for (let i = 0; i < this.uiGoods.length; i++) {
      sum += this.uiGoods[i].choose;
    }
    return sum;
  }

  // 购物车中有没有东西
  hasGoodsInCar() {
    return this.getTotalChooseNumber() > 0;
  }

  // 是否跨过了起送标准
  isCrossDeliveryThreshold() {
    return this.getTotalPrice() >= this.deliveryThreshold;
  }

  isChoose(index) {
    return this.uiGoods[index].isChoose();
  }
}