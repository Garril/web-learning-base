const obj = {
  name: "why",
  age: 18
}

console.log(Object.keys(obj))
console.log(Object.values(obj))

// 用的非常少
console.log(Object.values(["abc", "cba", "nba"]))
console.log(Object.values("abc"))  // ['a','b','c'] 字符串会分解

/* 
[ 'name', 'age' ]
[ 'why', 18 ]
[ 'abc', 'cba', 'nba' ]
[ 'a', 'b', 'c' ]
*/