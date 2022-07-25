function bar(m,n) {
  return (x,y,z) => {
    console.log(arguments);
  }
}

var fn = bar(20,30);
fn(10,20,30); // [Arguments] { '0': 20, '1': 30 }


// console.log(arguments); 
/* 
var foo = (x,y,z) => {
  console.log(arguments);
}
foo(20,30,10);
 */
