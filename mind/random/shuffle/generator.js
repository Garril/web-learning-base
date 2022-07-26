const cards = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function * draw(cards){
    const c = [...cards];

  for(let i = c.length; i > 0; i--) {
    const pIdx = Math.floor(Math.random() * i);
    [c[pIdx], c[i - 1]] = [c[i - 1], c[pIdx]];
    yield c[i - 1];
  }
}

const result = draw(cards);
console.log([result.next().value,
  result.next().value ]); // 前两个被抽到的数 -- 要抽多少，就重复
/* 
  console.log([...result]);
  [
    4, 1, 6, 3, 9,
    7, 2, 0, 5, 8
  ]
*/