var treeData = [
  {
    "name":"一级",
    "id":1,
    "pid":0,
    "child":[{
      "name":"一级子级1",
      "id":11,
      "pid":1
    },{
      "name":"一级子级2",
      "id":12,
      "pid":1
    }]
  },
  {
    "name":"二级",
    "id":2,
    "pid":0,
    "child":[{
      "name":"二级子级1",
      "id":21,
      "pid":2
    },{
      "name":"二级子级2",
      "id":22,
      "pid":2
    }]
  },
  {
    "name":"三级",
    "id":3,
    "pid":0,
    "child":[{
      "name":"三级子级1",
      "id":31,
      "pid":3
    }]
  }
];

//field 定义children字段名称
function treeToArray(treeData, field) {
  var res = [];
  if(!field) field = "children";
  for(var key in treeData) {
    var obj = treeData[key];
    var clone = JSON.parse(JSON.stringify(obj));
    delete clone[field];
    res.push(clone);

    if(obj[field]) {
      var tmp = treeToArray(obj[field], field);
      res = res.concat(tmp);
    }
  }
  return res;
}
// console.log(treeToArray(treeData, "child"));
// console.log(JSON.stringify(treeToArray(treeData, "child"), null, 2));