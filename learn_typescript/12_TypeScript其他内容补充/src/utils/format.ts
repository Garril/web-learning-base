/*
  在js中export导出的模块，会有一个自己的作用域 --- 不同模块之间可以有同名的函数定义
  而 typescript 除了 模块作用域，还有 命名空间/内部模块 --- 其实就是把模块再来划分一些作用域

  同一个模块里面有命名冲突 --- 比如下面： 一个是time的format，一个是number的format
  使用了命名空间后，之后可以通过time.format或者price.format去找对应函数
*/
export namespace time {
  export function format(time: string) {
    return "2222-02-22"
  }
  // 如果不想导出，就不写export
  export function foo() {

  }

  export let name: string = "abc"
}

export namespace price {
  export function format(price: number) {
    return "99.99"
  }
}

