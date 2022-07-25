var set = new Set();  

let tempSet = set.add("a").add("b");
console.log("tempSet: ",tempSet);
console.log(tempSet === set)
/* 
tempSet:  Set(2) { 'a', 'b' }
true
*/
tempSet.add("d").add("c");

for (let v of set) {  
  console.log(v);  
} 

console.log("--------------------");  

var map = new Map();  
let tempMap = map.set("a",1).set("b",2)
console.log("tempMap：",tempMap);
console.log(tempMap === map);
/* 
tempMap： Map(2) { 'a' => 1, 'b' => 2 }
true
*/
tempMap.set(999,3);  
for(let [k,v] of map) {  
    console.log(k,v);  
}
/* 
a
b
d
c
--------------------
a 1
b 2
999 3 
*/