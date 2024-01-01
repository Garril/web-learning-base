/* 单例模式 --- 单一实例，new出一个对象，去用 */
class MyClass {
  constructor() { }
  static _ins;
  static singleInstance() {
    if (!this._ins) {
      this._ins = new MyClass();
    }
    return this._ins;
  }
}
/*
需要解决，可能产生两个实例的情况
  一、 
    const v1 = MyClass.singleInstance();
    const v2 = new MyClass();
    v1 === v2  // false
  二、
    export defalut MyClass.singleInstance()
    这样只导出实例，极少情况下也不行，如下：
    import v1 from '../..';
    const v2 = new v1.constructor();
*/
function singleton(className) {
  let ins;
  const proxy = new Proxy(className, {
    construct(target, args) {
      if (!ins) {
        ins = new className(...args);
      } else {
        console.warn(`${className}只有一个实例`);
      }
      return ins;
    }
  })
  className.prototype.constructor = proxy;
  return proxy;
}
const singleProxyClass = singleton(MyClass);

const v1 = new singleProxyClass();
const v2 = new singleProxyClass();
/* 或者 new v1.constructor();也是一样 */
console.log(v1 === v2);

/* 
其他法子：
  ts可以加private
  constructor可以只返回一个对象
*/