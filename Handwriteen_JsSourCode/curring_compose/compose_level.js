function composeFn(wrap,inner) {
  return function(...args) {
    // console.log(args); // [10,20]
    return wrap(inner(...args));
  }
}

function double(num) {
  // console.log(arguments.length); // 2
  return num * 2
}

function square(num) {
  return num ** 2
}

let composedFn = composeFn(square,double);
console.log(composedFn(10,20)) // 400 --- 先inner乘以2，再wrap平方