/* 题目
  已知有数组:
    [ 
      [1, 2, 2], 
      [3, 4, 5, 5], 
      [6, 7, 8, 9,
        [11,12,[12,13,[14]]]
      ],
      10
    ]，
  扁平化数组后应该得到的数组为：
    [1,2,2,3,4,5,5,6,7,8,9,11,12,12,13,14,10] 
*/
let arr1 = [
  [1, 2, 2],
  [3, 4, 5, 5],
  [6, 7, 8, 9, [11, 12, [12, 13, [14]]]],
  10,
];
// 法一：flat(Infinity) --- 不改变原数组
console.log("1: ",arr1.flat(Infinity));
// 法二：for + 递归 --- 不改变原数组
function flatten_for(arr) {
  let res = [];
  for (let i = 0, length = arr.length; i < length; i++) {
    if (Array.isArray(arr[i])) {
      res = res.concat(flatten_for(arr[i])); // concat 并不会改变原数组
      // res.push(...flatten_for(arr[i])); // 扩展运算符
    } else {
      res.push(arr[i]);
    }
  }
  return res;
}
console.log("2: ",flatten_for(arr1));

// 法三：while
function flatten_while(arr) {
  while (arr.some((item) => Array.isArray(item))) {
    arr = [].concat(...arr);
    //arr = Array.prototype.concat.apply([],arr);
  }
  return arr;
}
console.log("3: ",flatten_while(arr1));

// 法四：reduce方法
function flatten_reduce(arr) {
  return arr.reduce((res, next) => {
    return res.concat(Array.isArray(next) ? flatten_reduce(next) : next);
  }, []);
}
console.log("4: ",flatten_reduce(arr1));

// 法五：使用 stack 无限反嵌套多层嵌套数组
function flatten_stack(arr) {
  const stack = [...arr]; //保证不会破坏原数组
  const result = [];
  while (stack.length) {
    const first = stack.shift();
    if (Array.isArray(first)) {
      stack.unshift(...first);
    } else {
      result.push(first);
    }
  }
  return result;
}
console.log("5: ",flatten_stack(arr1))

// 六：如果数组的项全为数字，可以使用join() 或者 toString() 搭配 split()
/*
  原理很简单，先把数组转换成字符串，这个过程会吧所有的[]去掉，不管多少层
  然后再调用split()方法转换成数组,最后不能忘了，吧每一项转换为数组，即调用map()方法。
*/
function flatten_num(input) {
  return input.toString().split(',').map(item => +item); // +item转化为number类型
  // return input.toString().split(',').map(Number);
  // return input.join().split(',').map(item => +item);
  // return input.join(',').split(',').map(item => +item);
}
console.log("6: ",flatten_num(arr1));
// [null,undefined].toString(); //"null,undefined"  
// 这里可以理解js引擎做了判断，执行了String()方法。保证数组的toString()方法不会报错。



/*
  不需要多层flat，只有两层的情况：

*/
let arr2 = [12, 3, 45, [6, 7, 8]]
console.log([].concat(...arr2))  // [12, 3, 45, 6, 7, 8]