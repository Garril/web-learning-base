/* 
  运用你所掌握的数据结构，设计和实现一个 LRU (最近最少使用) 缓存机制。
  它应该支持以下操作：
    获取数据 get 和 写入数据 put 。
    获取数据 get(key) - 如果关键字 (key) 存在于缓存中，则获取关键字的值（总是正数），否则返回 -1。
    写入数据 put(key, value) - 如果关键字已经存在，则变更其数据值；
    如果关键字不存在，则插入该组「关键字/值」。
    当缓存容量达到上限时，它应该在写入新数据之前删除最久未使用的数据值，从而为新的数据值留出空间。
  进阶:
    你是否可以在 O(1) 时间复杂度内完成这两种操作？
  示例:
    LRUCache cache = new LRUCache( 2 ); // 2表示缓存容量
    cache.put(1, 1);
    cache.put(2, 2);
    cache.get(1); // 返回 1
    cache.put(3, 3); // 该操作会使得关键字 2 作废
    cache.get(2); // 返回 -1 (未找到)
    cache.put(4, 4); // 该操作会使得关键字 1 作废
    cache.get(1); // 返回 -1 (未找到)
    cache.get(3); // 返回 3
    cache.get(4); // 返回 4
*/
class Node {
  constructor(key,value) {
    this.key = key;
    this.value = value;
  }
}
class LRUCache {

  constructor(size) {
    this.size = size;
    this.cache = new Map(); // key - node 方便查找
    this.queue = []; // node队列 - size管理 和 位置调整
  }

  get(key) {
    if(this.queue.length == 0) { // 没有缓存
      return -1;
    }
    let node = this.cache.get(key);
    if(node?.value != -1) { // 值均获取到的正数，如果移出缓存，赋值为-1即可
      // queue中位置的调整
      let idx = 0;
      this.queue.forEach((item,index) => {
        if(item.value == node.value) {
          idx = index;
        }
      })
      this.queue.splice(idx,1);
      this.queue.push(node);
      // console.log("========= get ===========")
      // console.log("this.queue: ",this.queue);
      // console.log("this.map: ",this.cache);
      // console.log("====================")
      return node.value;
    } else {
      return -1;
    }
  }

  put(key,value) {
    let node = this.cache.get(key);
    if(node?.value) { // 存在node的正数值，应该移到最末尾
      // 更新cache中的node的value
      node.value = value;
      this.cache.set(key,node);
      // queue中位置的调整
      let idx = 0,t = null;
      this.queue.forEach((item,index) => {
        if(item.value == value) {
          idx = index;
          t = item;
        }
      })
      this.queue.splice(idx,1);
      this.queue.push(t);
    } else { // 不存在node，加入
      let newNode = new Node(key,value);
      this.cache.set(key,newNode);
      if(this.queue.length == this.size) {
        let oldNode = this.queue.shift(); // 移除首个
        oldNode.value = -1;
        this.cache.set(oldNode.key,oldNode); // 移除了的值变为-1
      }
      this.queue.push(newNode);
    }
    // console.log("========= put ===========")
    // console.log("this.queue: ",this.queue);
    // console.log("this.map: ",this.cache);
    // console.log("====================")
  }
}

let cache = new LRUCache(2);
cache.put(1,1);
cache.put(2,2);
console.log(cache.get(1)); // 1
console.log(cache.get(2)); // 2
cache.put(3, 3);
console.log(cache.get(1)); // 返回 -1 (未找到)
cache.put(4, 4);
console.log(cache.get(2)); // 返回 -1 (未找到)
console.log(cache.get(3)); // 返回 3
console.log(cache.get(4)); // 返回 4
