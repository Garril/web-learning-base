let obj = {
  name: "muggle",
  age: "18",
  foo() {
    console.log("foo function: ",this.name)
  }
}

Object.keys(obj).forEach( key => {
  let value = obj[key];
  Object.defineProperty(obj,key,{
    get() {
      console.log(`这里${key}被get了`)
      return value;
    },
    set(newValue) {
      console.log(`这里${key}被set了`)
      value = newValue;
    }
  })
})

obj.age  = 20;
obj.name =  "test"
console.log("=========")
console.log(obj.name)
console.log(obj.age)
console.log("=========")
obj.foo();
/* 
这里age被set了
这里name被set了
=========
这里name被get了
test
这里age被get了
20
=========
这里foo被get了
这里name被get了
foo function:  test
*/