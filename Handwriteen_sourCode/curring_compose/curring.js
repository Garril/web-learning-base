function zwCurring(fn) {
  function curried(...args1) {
    if(args1.length >= fn.length) {
      // console.log("this1: ",this); // window
      return fn.apply(this, args1);

    } else {

      return function(...args2) {
        // console.log("this2: ",this); // window
        return curried.apply(this,args1.concat(args2));
      }

    }
  }
  return curried;
}

let curryAdd = zwCurring(add1);

function add1(x, y, z) {
  return x + y + z
}

console.log(curryAdd(10, 20, 30)) // 60
console.log(curryAdd(10, 20)(30)) // 60
// console.log(curryAdd(10)(20)(30)) // 60