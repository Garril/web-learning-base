// prototype进行的链式操作
[1, 2, 3, 3, 5]
  .map((i) => i * 2)
  .filter((i) => i !== 10)
  .reduce((acc, cur) => acc + cur);

// args: Array[function]
const pipe = (...args) => {
  return (x) => {
    args.reduce((preVal, curFn) => curFn(preVal), x);
  };
};
