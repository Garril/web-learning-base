function isAsyncFunction(func) {
  const str = Object.prototype.toString.call(func);
  // return str === '[object AsyncFunction]';
  // return String(func.__proto__.constructor).indexOf('Async') > -1;
  return func[Symbol.toStringTag] === 'AsyncFunction';
}
isAsyncFunction(() => { });
isAsyncFunction(async () => { });