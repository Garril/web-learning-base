async function async1() {
  console.log('async1 start')
  await async2()
  console.log('async1 end')
}

async function async2() {
  console.log('async2')
}

console.log('script start')

setTimeout(function () {
  console.log('setTimeout0')
}, 0)

setTimeout(function () {
  console.log('setTimeout2')
}, 300)

setImmediate(() => console.log('setImmediate'));

process.nextTick(() => console.log('nextTick1'));

async1();

process.nextTick(() => console.log('nextTick2'));

new Promise(function (resolve) {
  console.log('promise1')
  resolve();
  console.log('promise2')
}).then(function () {
  console.log('promise3')
})

console.log('script end')

// script start
// async1 start
// async2
// promise1
// promise2
// script end
// nexttick1
// nexttick2
// async1 end
// promise3
// settimetout0
// setImmediate
// setTimeout2


// node下的解析： 
/*
main script: script start、async1 start、async2、promise1、promise2
nexttick: nexttick1、nexttick2
other micro: async1 end、promise3
timers: setTimeout0
check: setImmediate

外边一个 3s的定时器，3s后，放到timer，输出setTimeout2

关乎libuv源码的一些操作的代码：
setTimeout(() => {
  console.log("setTimeout")
},0)
setImmediate(() => {
  console.log("setImmediate")
})
*/