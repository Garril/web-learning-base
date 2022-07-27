/* 
  定义
    在不暴露数据类型的情况下，访问集合(key-value)中的数据
  应用
    数据结构中多钟数据类型，列表，树等，提供通用操作接口
    （for...of..array/map/set/....）
*/
class MyDomElement {
  tag: string;
  children: MyDomElement[];
  constructor(tag: string) {
    this.tag = tag;
    this.children = [];
  }
  
  addChildren(component: MyDomElement) {
    this.children.push(component);
  }
  [Symbol.iterator]() {
    const list = [...this.children];
    let node;

    return {
      next: () => {
        while ((node = list.shift())) {
          node.children.length > 0 && list.push(...node.children);
          return { value: node, done: false };
        }
        return { value: null, done: true };
      },
    };
  }
}