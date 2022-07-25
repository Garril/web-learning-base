//*****   Rest parameter must be last formal parameter
//*****  剩余参数必须放到参数的最后
// function foo(...args, m, n) {
//   console.log(m, n)
//   console.log(args)
//   console.log(arguments)
// }

// foo(20, 30, 40, 50, 60)


// *** 不建议的做法

// function foo(m, n = m + 1) {
//   console.log(m, n)
// }

// foo(10);
