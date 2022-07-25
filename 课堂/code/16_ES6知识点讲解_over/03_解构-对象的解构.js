var obj = {
  name: "why",
  age: 18,
  height: 1.88
}

// 对象的解构: {}
var { name, age, height } = obj
console.log(name, age, height)

var { age } = obj
console.log(age)
console.log("==================================");

var { name: newName } = obj;
//***** 对obj做一个解构，解构后的属性值 放到一个新的变量中

// console.log("name: ",name); 
// **** 将第8行注释掉，报错 name is not defined

console.log("newName:",newName);

// **** 这里解构 赋值时，还设置了默认值
var { address: newAddress = "广州市" } = obj
console.log("newAddress: ",newAddress);


// console.log("address:",address); 
//****** address is not defined 

console.log("==================================");

function foo(info) {
  console.log(info.name, info.age)
}

foo(obj)

function bar({name, age}) {
  console.log(name, age)
}

bar(obj)
console.log("==================================");
