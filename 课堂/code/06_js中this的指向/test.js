var box = document.querySelector('.box');
box.onclick = function() {
  console.log(this===box); // true
}

var obj = {
  name:'tom',
  age:18
}
var info = Object.create(obj);

// console.log(obj instanceof Object);
// console.log(info instanceof Object);

// console.log(obj.__proto__);
// console.log(info.__proto__==obj); // true
// console.log(info instanceof obj); // error

// console.log(obj.isPrototypeOf(info));//true
// console.log(info.isPrototypeOf(obj));//false