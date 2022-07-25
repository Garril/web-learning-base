const names = ["abc", "cba", "nba", "mba", NaN]

if (names.indexOf("cba") !== -1) { // true
  console.log("包含cba元素1")
}

// ES7 ES2016
if (names.includes("cba", 2)) { // false 
  // names.includes("cba", 1) --- true
  console.log("包含cba元素2")
}

// indexOf 不能整到 NaN， includes可以整到 NaN
if (names.indexOf(NaN) !== -1) { // false
  console.log("包含NaN1")
}

if (names.includes(NaN)) { // true
  console.log("包含NaN2")
}