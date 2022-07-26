// 抽牌法
/*
  比如100块，分10人。
  把 100块看做：0，1，2.......9999的数列
  把数列里面插入9个分隔符，第一个分隔符比如到了49
  那就说明第一个人是4毛9
  第二个人是199，就199-49=150，一块五


*/
function * draw(cards){
  const c = [...cards];

  for(let i = c.length; i > 0; i--) {
    const pIdx = Math.floor(Math.random() * i);
    [c[pIdx], c[i - 1]] = [c[i - 1], c[pIdx]];
    yield c[i - 1];
  }
}
function generate(amount, count){
  if(count <= 1) return [amount];
  const cards = Array(amount - 1).fill(0).map((_, i) => i + 1);
  const pick = draw(cards);
  const result = [];
  for(let i = 0; i < count - 1; i++) {
    result.push(pick.next().value);
  }
  result.sort((a, b) => a - b);
  result.push(amount);
  for(let i = result.length - 1; i > 0; i--) {
    result[i] = result[i] - result[i - 1];
  }
  return result;
}
function getRes(sum,num){
  let amount = Math.round(parseFloat(sum) * 100);
  let count = parseInt(num);
  
  let output = [];
  
  if(isNaN(amount) || isNaN(count) 
    || amount <= 0 || count <= 0){
    output.push('输入格式不正确！');
  }else if(amount < count){
    output.push('钱不够分')
  }else{
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
    '18.26', '16.27',
    '1.45',  '2.05',
    '11.96', '2.17',
    '8.59',  '28.66',
    '4.23',  '6.36'
  ]
  100
*/