// 可选类型是必须写在必选类型的后面的
// y -> undefined | number
function foo(x: number, y?: number) {
// y?:number
// y 实际上等同于 联合类型 number | undefined
// 但是他可以不传，比如下面的 foo(200)，没传y,默认undefined
// 而如果是联合类型，他必须传一个值，去给y，
// 且这个值一定要为number或者undefined
}

foo(20, 30)
foo(20)
export {}