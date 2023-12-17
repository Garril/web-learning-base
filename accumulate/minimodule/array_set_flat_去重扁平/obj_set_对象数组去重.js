// 原数据是这样的
let objArr = [
  {
    goodsId: "1",
    quota: 12,
    skuId: "1",
  },
  {
    goodsId: "2",
    quota: 12,
    skuId: "2",
  },
  {
    goodsId: "1",
    quota: 12,
    skuId: "1",
  },
  {
    goodsId: "3",
    quota: 20,
    skuId: "3",
  },
];
/* 结果要求得到： 
根据goodsId的唯一性
  [
    { goodsId: '1', quota: 12, skuId: '1' },
    { goodsId: '2', quota: 12, skuId: '2' },
    { goodsId: '3', quota: 20, skuId: '3' }
  ]
根据quota的唯一性
  [
  { goodsId: '1', quota: 12, skuId: '1' },
  { goodsId: '3', quota: 20, skuId: '3' }
  ]
根据skuId的唯一性
  [
    { goodsId: '1', quota: 12, skuId: '1' },
    { goodsId: '2', quota: 12, skuId: '2' },
    { goodsId: '3', quota: 20, skuId: '3' }
  ]
*/

// 一：使用filter和Map
function uniqueFunc(arr, uniId) {
  const map = new Map();
  let resArr = arr.filter(
    (item) => !map.has(item[uniId]) && map.set(item[uniId], 1)
  );
  return resArr;
}
// console.log("1: ", uniqueFunc(objArr, "goodsId"));
// console.log("1: ", uniqueFunc(objArr, "quota"));
// console.log("1: ", uniqueFunc(objArr, "skuId"));

// 二：使用reduce，和上面的原理差不多
function uniqueFunc2(arr, uniId) {
  let hash = {};
  return arr.reduce((accum, item) => {
    hash[item[uniId]] ? "" : (hash[item[uniId]] = true && accum.push(item));
    return accum;
  }, []);
}
// console.log("2: ", uniqueFunc2(objArr, "goodsId"));
// console.log("2: ", uniqueFunc2(objArr, "quota"));
// console.log("2: ", uniqueFunc2(objArr, "skuId"));

// 三：使用for循环
function uniqueFunc3(arr, uniId) {
  let obj = {};
  let tempArr = [];
  for (var i = 0; i < arr.length; i++) {
    /*
      遍历arr中的对象foo，只拿foo对象的属性uniId的值
      这个值将会做为外层对象obj的属性，先检查是否有对应的属性在obj对象上
      如果不存在就赋值为true，把当前对象加入tempArr数组
    */
    if (!obj[arr[i][uniId]]) {
      tempArr.push(arr[i]);
      obj[arr[i][uniId]] = true;
    }
  }
  return tempArr;
}
// console.log("3: ", uniqueFunc3(objArr, "goodsId"));
// console.log("3: ", uniqueFunc3(objArr, "quota"));
// console.log("3: ", uniqueFunc3(objArr, "skuId"));
