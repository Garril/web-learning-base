/* 实现memorize函数：
有缓冲返回，没有利用当前值计算。
提供set去设置缓存值 */

class MemorizeMap {
  constructor() {
    this._map = new Map();
    this._weakMap = new WeakMap();
  }
  _isObject(v) {
    return typeof v === "object" && v !== null;
  }
  set(key, value) {
    if (this._isObject(key)) {
      this._weakMap.set(key, value);
    } else {
      this._map.set(key, value);
    }
  }
  get(key) {
    if (this._isObject(key)) {
      return this._weakMap.get(key);
    } else {
      return this._map.get(key);
    }
  }
  has(key) {
    if (this._isObject(key)) {
      return this._weakMap.has(key);
    } else {
      return this._map.has(key);
    }
  }
}

function memorize(func, resolver) {
  function innerFn(...args) {
    /* 这里resolver 待斟酌， */
    // const key = resolver ? resolver(...args) : args[0];
    const key = args[0];
    // 如果要使用resolver，那么MemorizeMap需要定制化的进行对应的修改
    // 因为类在判断有没有那个key的时候，没有当前key对应的、你传入的那个函数，获取不到实际上存入时的key。
    // console.log("key: ", key);
    const cache = innerFn.cache;
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = func.apply(this, args);
    cache.set(key, result);
    return result;
  }

  /*使用map的缺点，当你使用map，将其中保存的对象设置为null
  期待被垃圾回收，但是map中仍然有引用，所以不会被回收
  使用weakMap，其又对key有特殊要求，所以自己封装 */
  innerFn.cache = new MemorizeMap();

  return innerFn;
}

const obj1 = { a: 1, b: 2 },
  obj2 = { a: 3, b: 4 };
const getVal = memorize((object) => Object.values(object));

console.log(getVal(obj1));
console.log(getVal(obj2));

console.log("======");

obj1.a = 2;
console.log(getVal(obj1));

getVal.cache.set(obj1, ['a', 'b']);
console.log(getVal(obj1));


/* 
  [ 1, 2 ]
  [ 3, 4 ]
  ======
  [ 1, 2 ]
  [ 'a', 'b' ]
*/