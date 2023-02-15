/* let arr = [1,2,3,4,5];

arr.forEach(item => {
  if(item ===2) {
    continue;
  } else {
    console.log(item);
  }
}) 
*/
// map、forEach不能break和continue


/* 
function foo () {
  var name = "hhh";
  console.log(name)
  function bar() {
    name = "bbb"
    console.log(name)
  }
  return bar;
}

var fn = foo();
fn();
var fn1 = foo();
fn1(); 
console.log(fn1===fn) */
// 每次调用函数foo，内部开辟的AO（对象）是新的