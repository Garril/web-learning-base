const info = {
  name: "why",
  // friend: {
  //   girlFriend: {
  //     name: "hmm"
  //   }
  // } 有一天，不是朋友了，删除数据
}

// 加个if ，让后续的，也就是if外面的代码可以正常的进行
// console.log(info.friend.girlFriend.name)
// if (info && info.friend && info.friend.girlFriend) {
//   console.log(info.friend.girlFriend.name)
// }
// 但是这样写，太麻烦了

// ES11提供了可选链(Optional Chainling)
console.log(info.friend?.girlFriend?.name)
// 以前是. 现在是?. 
// 这里就不用if了，如果info.friend 不存在，不报错，直接返回undefined

console.log('其他的代码逻辑')

