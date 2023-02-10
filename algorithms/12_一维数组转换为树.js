/* 
  一份数据省-市，扁平结构（一维数组），需要转换为树状结构，请实现转换函数
  示例：
    [
      { 
        id: 1,
        pID: null,
        name: '广东'
      },
      {
        id: 2,
        pID: 2,
        name: '深圳'
      },..........
    ]
  id为节点唯一id，pID 为父节点ID，pID==null表示根节点
*/
function arrayToTree(arr) {
	let map = {};  //存着每一个层级的引用，以id为key，方便查找
	let res = [];
	for(let i = 0; i < arr.length; i++) {
		let obj = arr[i];
		let clone = JSON.parse(JSON.stringify(obj));

		if(obj.pid == null) {
			res.push(clone);
		}
		map[clone.id] = clone;
		if(map[clone.pid]) { // child是数组，因为这里的树，不一定是二叉树
			if(!map[clone.pid].child) map[clone.pid].child = [];
			map[clone.pid].child.push(clone);
		}
	}
	return res;
}

let arr=[
  {"name":"一级","id":1,"pid":null},
    {"name":"一级子级1","id":11,"pid":1},
    {"name":"一级子级2","id":12,"pid":1},
    
    {"name":"二级","id":2,"pid":1},
      {"name":"二级子级1","id":21,"pid":2},
      {"name":"二级子级2","id":22,"pid":2},
    {"name":"三级","id":3,"pid":1},
      {"name":"三级子级1","id":31,"pid":3}
];
let res = arrayToTree(arr);
// console.log(arr);
// console.log(res);
console.log(res[0].child);