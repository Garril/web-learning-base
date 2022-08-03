// const info = {
//   name: "why",
//   age: 18
// }

// info.name = "kobe"
// 默认info是对象类型，且name和age对应string和number类型
// 但是可能带来安全隐患

/**
 * 问题如下：
 * 
 * type Method = 'GET' | 'POST'
 * function request(url: string, method: Method) {}
 * 
 * const options = {
 *    url: "https://........",
 *    method: "POST"
 * }
 * request(options.url, options.method)
 * 这里的request第二个参数，报错了
 * 原因是options的method是一个string，而不是 Method
 * 有可能在调用request之前，你改变了这个method
 * 
 * 解决方案如下：
 */

type Method = 'GET' | 'POST'
function request(url: string, method: Method) {}
// 方案一： 用type Request
type Request = {
  url: string,
  method: Method
}
/**
 * 然后让options为Request的类型，从而限定method的类型
 * 
 * const options: Request = {
 *    url: "https://www.coderwhy.org/abc",
 *    method: "POST"
 * }
 */

// 方案三（官方文档有）： 字面量推理
const options = {
  url: "https://www.coderwhy.org/abc",
  method: "POST"
} as const
// 加了个as const，你会发现options为一个对象类型
// 且url和method变成了 readonly属性


/**
 * 方案二：类型断言
 * request(options.url, options.method as Method)
 * method转换为Method，编译就没问题了
 */
request(options.url, options.method)

export {}
