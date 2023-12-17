function control(x) {
  if (x == 3) throw new Error("break");
}
function foo(x = 6) {
  return {
    next: () => {
      control(x);
      return { done: !x, value: x && x-- };
    },
  };
}
let x = new Object();
x[Symbol.iterator] = foo;
for (let i of x) console.log(i);

// 6，5，4，抛错

/*
迭代器（一个对象）：
  let obj = {
    next() {
      return { done: true, value: undefined }
    }
  }
可迭代对象（对象的Symbol.iterator方法，返回一个迭代器）：
  let iterableObj = {
    [Symbol.iterator]: function() {
      return obj
    }
  }
*/
