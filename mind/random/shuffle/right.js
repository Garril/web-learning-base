const cards = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function shuffle(cards) {
  const c = [...cards];
  // 一张一张牌抽，抽完后，放到最后，然后不动了
  // 再从剩下的牌中抽 --- 保证每一张牌，到每一个位置的概率相同
  /* 
    数学归纳：
      a1,a2,a3.....ak张牌。。。第一张 1/k的概率
      第二张  ( (k-1)/k ) * ( 1/(k-1) ) = 1/k
      ......
  */
  for(let i = c.length; i > 0; i--) {
    const pIdx = Math.floor(Math.random() * i);
    [c[pIdx], c[i - 1]] = [c[i - 1], c[pIdx]];
  }
  return c;
}
console.log(shuffle(cards));
/* 
  [
    1, 6, 7, 5, 9,
    3, 8, 2, 0, 4
  ]
*/
const result = Array(10).fill(0);
for(let i = 0; i < 10000; i++) {
  const c = shuffle(cards);
  for(let j = 0; j < 10; j++) {
    result[j] += c[j];
  }
}
console.log(result);
/*  
  [
    44606, 45107, 45069,
    44241, 45338, 44695,
    45490, 45235, 45202,
    45017
  ]
*/