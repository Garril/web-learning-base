const cards = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
function shuffle(cards) {
  return [...cards].sort(() => Math.random() > 0.5 ? -1 : 1);
}
console.log(shuffle(cards));
const result = Array(10).fill(0);
for(let i = 0; i < 1000000; i++) {
  const c = shuffle(cards);
  for(let j = 0; j < 10; j++) {
    result[j] += c[j];
  }
}
console.log(result);
/* 
  可以多次运行，会发现其实，并不是公平的
  [ 本次抽取的顺序
    1, 0, 2, 8, 9,
    7, 6, 3, 5, 4 
  ]
  [ 0-9号被抽取的次数
    3861170, 3864689,
    4538107, 4652633,
    4676161, 4362640,
    4361790, 4717897,
    4852644, 5112269
  ]
*/