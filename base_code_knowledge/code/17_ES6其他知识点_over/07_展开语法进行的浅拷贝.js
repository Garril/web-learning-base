// *** 浅拷贝，也就是：
// 我在obj展开info存入后，friend的属性值，也就是friend中对象的地址
// 是一样的。没有说整个新的对象。

const info = {
  name: "why",
  friend: { name: "kobe" }
}

const obj = { ...info, name: "coderwhy" }
// console.log(obj)
obj.friend.name = "james"

console.log(info.friend.name)

