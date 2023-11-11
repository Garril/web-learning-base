// 单件商品的数据
class UIGoods {
  constructor(g) {
    this.data = g;
    this.choose = 0;
  }
  // 获取总价
  getTotalPrice() {
    return this.data.price * this.choose;
  }
  // 是否选中了此件商品
  isChoose() {
    return this.choose > 0;
  }
  // 选择的数量+1
  increase() {
    this.choose++;
  }
  //   选择的数量-1
  decrease() {
    if (this.choose === 0) {
      return;
    }
    this.choose--;
  }
}