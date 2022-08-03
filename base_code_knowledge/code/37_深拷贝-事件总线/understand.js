
// fetch('http://123.207.32.32:9001/personalized/newsong')
//   .then(response => {
//     return response.json()
//   })
//   .then(data => console.log(data));


let s2 = Symbol("bbb")
const typed = typeof(s2)
console.log(typed === 'function')

/**（设计模式）
 * 自定义总线属于一种观察者模式，其中包括三个角色：
 * 发布者
 * 订阅者
 * 事件总线：无论是发布者还是订阅者都是通过事件总线作为中台的
 * 
 * 发布订阅者模式可以认为是一种特殊的观察者模式
 * 观察者模式是可以没有事件总线的，没有中台，而发布订阅者模式有
 * 
 * 
 * vue2：本身有
 * vue3：第三方库mitt
 * 自己实现：
 *   事件监听方法on
 *   事件发射方法emit
 *   事件取消监听off
 */