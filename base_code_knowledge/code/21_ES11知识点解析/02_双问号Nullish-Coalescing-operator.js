// ES11: 空值合并运算 ??

const bar = undefined ?? "defualt value"
const bar1 = 0 ?? "default value"

// ?? 当foo是undefined / null 的时候才会使用后面的 默认值，0或者空字符串算有效
console.log("bar:",bar);
console.log("bar1:",bar1);

console.log("========================")
 // 像|| ，0和空字符串就会被看做类似 undefined/null
const bar2 = 0 || "default";
const bar3 = "" || "default";
const bar4 = " " || "default";

console.log("bar2:",bar2);
console.log("bar3:",bar3);
console.log("bar4:",bar4);
// ts 是 js 的超级

/* 
bar: defualt value
bar1: 0
========================
bar2: default
bar3: default
bar4:
*/