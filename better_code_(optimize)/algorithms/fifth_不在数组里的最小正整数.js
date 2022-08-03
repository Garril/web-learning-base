//不在数组里的最小正整数
/*
  给出一个无序的整数型数组，求不在给定数组里的最小的正整数
  例如：
    给出的数组为[1,2,0] 返回3,
    给出的数组为[4,3,-1,-2,1] 返回2.
      你需要给出时间复杂度在O(n)之内
      并且空间复杂度为常数级的算法
  
  首先正整数！那就是从1开始,len其实就是可能出现的最大的值】
  （因为可能会有负数，如果没有负数，那就是代表最大正整数）
*/
function findMinNum (nums) {
  //输入部分没有元素或者只有一个元素且不为1时
  if (nums == undefined || nums.length == 0 || (nums.length == 1 && nums[0] != 1 )) {
    return 1;
  }
  const len = nums.length;
  for (let i = 0; i < len; i++)  {
    let curValue = nums[i];
    // 注意while的作用，换位后，curValue也变了
    while(curValue > 0 && curValue <= len && nums[curValue - 1] != curValue) {
      // nums[curValue - 1] 这个curValue本应该在的位置
      let t = curValue;
      curValue = nums[curValue - 1];
      nums[t - 1] = t; // curValue变了，记得用t
    }
  }
  /* 
    此时：  4，3，-1，-2，1  变为了： 1，-1，3，4，-2
  */
  for (let j = 0; j < len; j++) {
    if(nums[j] != j + 1) {
      return j + 1;
    }
    // 如果要放回缺少的数的数组，也在这里修改即可
  }
  return len + 1;
}
let arr = [4,3,-1,-2,1];
let res = findMinNum(arr);
console.log(res);