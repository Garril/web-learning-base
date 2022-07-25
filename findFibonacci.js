// 实现findFibonacci函数，在一堆正整数中，找到最长的一组斐波那契数列段。 
// 比如[13, 9, 3, 8, 5, 25, 31, 11, 21]， 输出[3, 5, 8, 13, 21]

function findFibonacci(arr) {
  let set = new Set();
  let resArr = []; // 结果数组
  let rightArr = []; // 对照数组
  // 顺序排序 + 除重复
  arr.sort((a,b) => {
    return a-b;
  }).forEach(item => {
    set.add(item)
  });
  // set转化数组
  arr = Array.from(set);
  
  let startPos = 0;
  while( arr[0] > getFibonacciList(startPos) ) {
    startPos++;
  }
  let lastPos = startPos;
  while( arr[arr.length-1] > getFibonacciList(lastPos) ) {
    lastPos++;
  }
  // 按照最大值和最小值，对应的斐波那契额数列，添加到rightArr数组
  for(let i = startPos; i <= lastPos; i++) {
    rightArr.push(getFibonacciList(i));
  }

  for(let i = 0,j = 0; i < arr.length && j < rightArr.length;) {
    if(arr[i] == rightArr[j]) { // 对应上了
      // 第一次 arr[i] == rightArr[j] 或者 arr[i] < rightArr[j],小于则也表示 arr[i]不在斐波那契额数列内
      console.log(arr[i],'等于',rightArr[j])
      resArr.push(arr[i]);
      i++;
      j++;
    } else { // 没有对应上， arr[i] < rightArr[j]，数列断了
      console.log(arr[i],'不等于',rightArr[j])
      i++;
    }
  }
  
  return resArr;
}

// 获取 斐波那契额数列的 f(n)的值
function getFibonacciList(n) {
  let left = 0, right = 0, res = 1;
  for(let i = 0; i < n; i++) {
    left = right;
    right = res;
    res = left + right;
  }
  return res;
}
// 输入数组
let arr = [13, 9, 3, 8, 5, 25, 31, 11, 21];
let resArr = findFibonacci(arr);
console.log(resArr);

// console.log(getFibonacciList(0))
// console.log(getFibonacciList(1))
// console.log(getFibonacciList(2))
// console.log(getFibonacciList(3))
// console.log(getFibonacciList(4))
