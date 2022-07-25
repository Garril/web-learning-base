// for...in 标准化: ECMA
const obj = {
  name: "why",
  age: 18
}

for (const item in obj) {
  console.log(item)// 规范了一下，item都是key，而不是value
}