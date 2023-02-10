let arr = [21, 8, 4, 32, 5];


/* sort排序 */
// arr.sort( (a,b) => a - b );
// console.log(arr);
//[ 4, 5, 8, 21, 32 ]


/* 快排
  找初始中间值，分左右数组，左右再快排，最后合并
*/
function quickSort(arr) {
  if(arr.length <= 1) {
    return arr;
  }
  let mid = Math.floor(arr.length/2);
  let t = arr.splice(mid,1)[0]; // slice不变原数组、splice改变
  let left = [];
  let right = [];
  arr.forEach((item,index) => {
    if(item < t) {
      left.push(item)
    } else {
      right.push(item);
    }
  })
  return quickSort(left).concat([t],quickSort(right));
}
// let res = quickSort(arr);
// console.log(res);
// console.log(arr);


/* 插入排序
  我们规定数组的最前面为已经排好序的区间，那么后面的区间就是乱序的区间。
*/
function insertSort(arr) {
  let left = arr.splice(0,1);
  arr.forEach((item,index) => {
    for(let i = left.length-1; i >= 0; ) {
      let cur = left[i];
      if(item < cur) {
        i--;
        if(i === -1) {
          left.unshift(item);
        }
      } else {
        left.splice(i+1,0,item)
        break;
      }
    }
  })
  return left;
}
// console.log(insertSort(arr));
// console.log(arr)


/* 选择排序
  我们规定数组的最后位置为已经排好序的区间，那么前面的区间就是乱序的区间。
  对于选择排序，当我们从乱序的区间中找极值时，总是一味的去遍历这个乱序的区间，
  直到乱序的区间遍历完成后，我们才能确定极值。 ---- 时间复杂度： O(n^2) */



/* 冒泡排序
  从第一项开始,与它后面的每一项进行比较,如果大于后面的项,则交换位置
*/
function buddleSort(arr) {
  for(let i = 0; i < arr.length - 1; i++) {
    for(let j = 0; j < arr.length - 1 - i; j++) {
      if(arr[j] > arr[j+1]) {
        let t = arr[j];
        arr[j] = arr[j+1];
        arr[j+1] = t;
      }
    }
  }
  return arr;
}
// console.log(arr);
// console.log(buddleSort(arr));