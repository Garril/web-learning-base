const num1 = 100 // 十进制

// b -> binary
const num2 = 0b100 // 二进制
// o -> octonary
const num3 = 0o100 // 八进制
// x -> hexadecimal
const num4 = 0x100 // 十六进制

// **** 记一个单词 box   0b二进制 0o八进制  0x十六进制

console.log(num1, num2, num3, num4)

// 大的数值的连接符(ES2021 ES12)
const num = 10_000_000_000_000_000
console.log(num)
// **** console.log 输出的时候不会显示下划线

/* 
100 4 64 256
10000000000000000
*/