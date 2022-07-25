const s1 = Symbol()
const s2 = Symbol()

const obj = {
  name: "why",
  friend: {
    name: "kobe"
  },
  foo: function() {
    console.log("foo function")
  },
  [s1]: "abc",
  s2: s2
}

obj.inner = obj

const info = JSON.parse(JSON.stringify(obj))
console.log(info === obj)
obj.friend.name = "james"
console.log(info)

/**
 * 直接使用json进行深拷贝的操作，缺点：
 *    如果对象的属性中有函数，或者symbol（作为对象的key）
 *    他都不会做拷贝处理 (如果symbol作为值，这里就会直接使用同一个)
 * 且他不支持循环引用：比如16行，inner属性指向自己
 */