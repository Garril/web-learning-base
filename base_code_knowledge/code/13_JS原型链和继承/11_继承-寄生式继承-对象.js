
var personObj = {
  running: function() {
    console.log("running")
  }
}

function createStudent(name) {
  var stu = Object.create(personObj)
  stu.name = name
  stu.studying = function() {
    console.log("studying~")
  }
  return stu
}

var stuObj = createStudent("why")
var stuObj1 = createStudent("kobe")
var stuObj2 = createStudent("james")

console.log(stuObj)
console.log(stuObj1)
console.log(stuObj.__proto__ == stuObj1.__proto__);
/* 
{ name: 'why', studying: [Function (anonymous)] }
{ name: 'kobe', studying: [Function (anonymous)] }
true
*/