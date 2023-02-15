Array.prototype.zwSlice = function(start,end) {
  let arr = this;
  start = start || 0; //  0 || 0 为 0
  end = end || arr.length;
  let res = [];
  for(let i = start; i < end; i++) {
    res.push(arr[i])
  }
  return res;
}
// test
let arr1 = ["aaa","bbb","ccc"];

let newArr1 = Array.prototype.zwSlice.call(arr1,1,3);
console.log(newArr1);

let newArr2 = arr1.slice(1,3);
console.log(newArr2);

/* 
[ 'bbb', 'ccc' ]
[ 'bbb', 'ccc' ]
*/