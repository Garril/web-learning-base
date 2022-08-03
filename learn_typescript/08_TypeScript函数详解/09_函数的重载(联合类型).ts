/**
 * 通过联合类型有两个缺点:
 *  1.进行很多的逻辑判断(类型缩小)
 *  2.返回值的类型依然是不能确定
 */
function _9add(a1: number | string, a2: number | string) {
  /**
   * 这里不能直接进行 a1+a2的操作，为什么？
   * 因为ts认为的 a1 和 a2的类型，不是说： number或者string其中一个
   * 他认为的是： “number|string” 这个整体
   */
  if (typeof a1 === "number" && typeof a2 === "number") {
    return a1 + a2
  } else if (typeof a1 === "string" && typeof a2 === "string") {
    return a1 + a2
  }

  // return a1 + a2;
}

_9add(10, 20)



export {}