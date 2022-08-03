const why = require("./why.js")
// require其实是拿到对应的文件的module.exports

console.log(why)

setTimeout(() => {
  // console.log(why.name)
  why.name = "james"
}, 1000)
