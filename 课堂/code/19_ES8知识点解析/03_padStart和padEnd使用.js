const message = "Hello World"

// 填充！意味着，填充到15位，用*，如果原来有内容，内容不变
// padStart 和 padEnd的第二个参数，可以不填，默认为空格
const newMessage = message.padStart(15, "*").padEnd(20, "-")
console.log(newMessage)

// 案例，除了最后4位，其他加密
const cardNumber = "321324234242342342341312"
const lastFourCard = cardNumber.slice(-4)
const finalCard = lastFourCard.padStart(cardNumber.length, "*")
console.log(finalCard)

/* 
****Hello World-----
********************1312
*/