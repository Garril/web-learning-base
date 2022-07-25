// ES11之前 max_safe_integer
const maxInt = Number.MAX_SAFE_INTEGER
console.log(maxInt) // 9007199254740991
console.log(maxInt + 1)
console.log(maxInt + 2)
// 不安全数字，加一加二，可能得到的结果是一样的

// ES11之后: BigInt
const bigInt = 900719925474099100n
console.log(bigInt + 10n)

const num = 100
console.log(bigInt + BigInt(num))

const smallNum = Number(bigInt)
console.log(smallNum)
/* 
9007199254740991
9007199254740992
9007199254740992

900719925474099110n
900719925474099200n
900719925474099100
*/

