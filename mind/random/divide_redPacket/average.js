/* 
  切西瓜：每次切最大的那一块
  没有不够分的情况，但是分出去的红包是趋向于均匀的
  如果要刺激，不满足
*/
function generate(amount, count){
  let ret = [amount];
  while(count > 1){
    //挑选出最大一块进行切分
    let cake = Math.max(...ret),
        idx = ret.indexOf(cake),
        part = 1 + Math.floor((cake / 2) * Math.random()),
        rest = cake - part;
    ret.splice(idx, 1, part, rest);
    count--;
  }
  return ret;
}

function getRes(sum,num){
  let amount = Math.round(parseFloat(sum) * 100);
  let count = parseInt(num);
  let output = [];
  if(isNaN(amount) || isNaN(count) 
    || amount <= 0 || count <= 0) {

      output.push('输入格式不正确！');

  } else if (amount < count) {

    output.push('钱不够分');

  } else {

    output.push(...generate(amount, count));
    output = output.map(m => (m / 100).toFixed(2));

  }
  console.log(output);
  return output;
}
// 测试总数
console.log(getRes(100,10).reduce( 
    (item,pre) => parseFloat(item) + parseFloat(pre)
    ,0.0)
    );
/* 
  [
    '8.65',  '7.47',
    '9.40',  '11.90',
    '4.40',  '4.50',
    '14.74', '12.85',
    '11.65', '14.44'
  ]
  100
*/
