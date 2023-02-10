/* 
  写一个数组去重函数
  示例：
    输入：[ 123, 'webpack', [1,2,3], '123', {a: 1, b: 2}, 'obj', 123, [1,2,3], {b: 2, a: 1} , {a:1} ,[33,11],[11,33] ]
    输出：[ 123, 'webpack', [1,2,3], '123', {a: 1, b: 2}, {a: 1}, 'obj',[33,11] ]
*/
let arr = [ 123, 'webpack', [1,2,3], '123', {a: 1, b: 2}, 'obj', 123, [1,2,3], {b: 2, a: 1} , {a:1} ,[33,11],[11,33] ];
let res = [];
let obj_col = [];
let arr_col = [];
function setArr(arr) {
  return arr.filter((item, index) => {
    if(arr.indexOf(item) === index) {
      if(typeof item === "object") {
        if(Array.isArray(item)) {
          arr_col.push(item);
          return false;
        } else {
          let t = objSort(item);
          obj_col.push(t);
          return false;
        }
      }
      return true;
    } else {
      return false;
    }
  })
}

function objSort(obj){
  let newObj = {}
  //遍历对象，并将key进行排序
  Object.keys(obj).sort().map(key => {
      newObj[key] = obj[key]
  })
  //将排序好的数组转成字符串
  return JSON.stringify(newObj)
}

res = setArr(arr);
[...new Set(obj_col)].forEach(item => {
  res.push(JSON.parse(item));
});

arr_col.forEach((item,index) => {
  for(let i = 0; i < arr_col.length; i++) {
    if(index !== i) {
      if(item.sort().toString() === arr_col[i].sort().toString()) {
        arr_col.splice(i,1);
      }
    }
  }
})
arr_col.forEach(item => {
  res.push(item);
})

console.log(res);

