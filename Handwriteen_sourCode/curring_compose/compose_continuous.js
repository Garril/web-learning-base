function zwCompose(...fns) {
  let len = fns.length;
  for(let i = 0; i < len; i++) {
    if(typeof fns[i] !== 'function') {
      throw new TypeError("Expected arguments are functions"+fns[i]+"is not function!");
    }
  }
  function compose(...args) {
    let index = 0;
    let res = len?fns[index].apply(this,args):args;
    while(++index < len) {
      res = fns[index].call(this,res);
    }
    return res;
  }
  return compose;
}

function double(m,n) {
  return m * n
}

function square(n) {
  return n ** 2
}
function chu(n) {
  return n/2;
}
function add(n) {
  return n+10;
}

var newFn = zwCompose(double, square, chu)
console.log(newFn(10,2)) // (10*2)^2 / 2  = 200