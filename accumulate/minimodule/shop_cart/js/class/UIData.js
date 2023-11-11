// 整个界面的数据
class UIData {
  constructor(shopData) {
    this.goods = shopData.map(item => {
      return new UIGoods(item);
    });
    // 起送费
    this.deliveryThreshold = 30;
    // 配送费
    this.deliveryPrice = 3;
  }
  // 获取购物车总价(没加运费)
  getTotalPrice() {
    let sum = 0;
    this.goods.forEach(item => {
      sum += item.getTotalPrice();
    })
    // sum = sum > 0 ? sum + this.deliveryPrice : sum;
    return sum;
  }

  // 增加某件商品的选中数量
  increase(index) {
    this.goods[index].increase();
  }
  // 减少某件商品的选中数量
  decrease(index) {
    this.goods[index].decrease();
  }

  // 得到总共的选择数量
  getTotalChooseNumber() {
    let sum = 0;
    this.goods.forEach(item => {
      sum += item['choose'];
    })
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
    return this.goods[index].isChoose();
  }
}