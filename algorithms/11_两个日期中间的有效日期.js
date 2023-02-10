/* 
  求两个日期中间的有效日期（要求考虑闰年）
  示例：
    输入：2020-9-29 ~ 2020-10-3
    输出：[ '2020-9-29','2020-9-30','2020-10-1','2020-10-2','2020-10-3' ]
*/
function rangeDay(date) {
  let [day1,day2] = date.split(' ~ ');
  day1 = new Date(day1);
  day2 = new Date(day2);
  // console.log(day1); // 2020-09-28T16:00:00.000Z
  // console.log(day2); // 2020-10-02T16:00:00.000Z
  const res = [];
  const dayTimes = 24 * 60 * 60 * 1000; // 一天总毫秒数
  const startTime = day1.getTime();
  const range = day2.getTime() - startTime;
  // console.log(day2.getTime()); // 1601654400000
  // console.log(startTime); // 1601308800000
  // console.log(range); // 345600000
  let total = 0;
  while(total <= range && range > 0) {
    // console.log(new Date(startTime + total).toLocaleDateString()); // 2020/9/29  ---某一次循环的结果
    // console.log(typeof new Date(startTime + total).toLocaleDateString()); // string ---某一次循环的结果
    res.push(new Date(startTime + total).toLocaleDateString().replace(/\//g,'-')); // replace把 / 改成 -
    total += dayTimes;
  }
  return res;
}
let input = "2020-9-29 ~ 2020-10-3";
let res = rangeDay(input);
console.log(res); // [ '2020-9-29', '2020-9-30', '2020-10-1', '2020-10-2', '2020-10-3' ]