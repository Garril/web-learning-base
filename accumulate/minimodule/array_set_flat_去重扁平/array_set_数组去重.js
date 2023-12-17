let arr = [1, 2, 2, 3, 4, 5, 5, 6, 7, 8, 9, 11, 12, 12, 13, 14, 10];
// 要求结果：[ 1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 10 ]
// 一：for遍历
function removeDuplicatedItem(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) {
        arr.splice(j, 1); //console.log(arr[j]);
        j--;
      }
    }
  }
  return arr;
}
console.log("1: ", removeDuplicatedItem(arr));

arr = [1, 2, 2, 3, 4, 5, 5, 6, 7, 8, 9, 11, 12, 12, 13, 14, 10];
// 二：for + indexOf
function rep2(arr) {
  for (var i = 0; i < arr.length; i++) {
    // console.log(arr.indexOf(arr[i])); 可以输出当前元素首次出现的索引
    if (arr.indexOf(arr[i]) !== i) {
      arr.splice(i, 1); //删除数组元素后数组长度减1后面的元素前移
      i--; //数组下标回退
    }
  }
  return arr;
}
console.log("2: ", rep2(arr));

arr = [1, 2, 2, 3, 4, 5, 5, 6, 7, 8, 9, 11, 12, 12, 13, 14, 10];
// 三：借助新数组和indexOf
function rep(arr) {
  let ret = [];
  for (var i = 0; i < arr.length; i++) {
    if (arr.indexOf(arr[i]) == i) {
      ret.push(arr[i]);
    }
  }
  return ret;
}
console.log("3: ", rep(arr));


arr = [1, 2, 2, 3, 4, 5, 5, 6, 7, 8, 9, 11, 12, 12, 13, 14, 10];
// 四：借助空对象
// 通过对象来记录新数组中已存储过的元素 不改变原数组 与方法三类似
function test() {
  let arr = [1, 23, 1, 1, 1, 3, 23, 5, 6, 7, 9, 9, 8, 5];
  let o = {};
  let arr2 = [];
  for (var i = 0; i < arr.length; i++) {
    var k = arr[i];
    if (!o[k]) {
      o[k] = true;
      arr2.push(k);
    }
  }
}


arr = [1, 2, 2, 3, 4, 5, 5, 6, 7, 8, 9, 11, 12, 12, 13, 14, 10];
// 五：filter/include 
/* 
  查找当前元素索引出现的位置是否与当前元素索引值相等，是表示true返回 
  如果当前元素索引不等与当前索引，说明已经出现过，出现过就不返回。原数组不变
*/
let arr2 = arr.filter(function (element, index, array) {
  return array.indexOf(element) === index;
});
console.log("5: ",arr2);


arr = [1, 2, 2, 3, 4, 5, 5, 6, 7, 8, 9, 11, 12, 12, 13, 14, 10];
// 六：set
console.log("6: ",Array.from(new Set(arr)))
console.log("7: ",[...new Set(arr)])