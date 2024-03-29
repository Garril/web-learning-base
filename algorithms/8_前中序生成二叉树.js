/* 
  输入某二叉树的前序遍历和中序遍历的结果，请重建出该二叉树并返回它的头结点。
  假设输入的前序遍历和中序遍历的结果中都不含重复的数字。
    例如:
      输入前序遍历序列{1,2,4,7,3,5,6,8}
      中序遍历序列{4,7,2,1,5,3,8,6}
      则重建二叉树并返回。
*/

function TreeNode(x) {
  this.val = x;
  this.left = null;
  this.right = null;
}
function reConstructBinaryTree(pre, vin) {
  // write code here
  if(!pre.length||!vin.length) return null
  const root = new TreeNode(pre.shift())
  //检测vin里面是否有root这个节点,返回这个节点的位置
  const index = vin.indexOf(root.val)
  root.left = reConstructBinaryTree(pre,vin.slice(0,index)) // 不包括index
  root.right = reConstructBinaryTree(pre,vin.slice(index+1)) // index+1到末尾
  return root
}
let pre = [1,2,4,7,3,5,6,8];
let vin = [4,7,2,1,5,3,8,6];
let res = reConstructBinaryTree(pre,vin);
console.log(res);