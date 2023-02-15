
/* 
一： Promise.all
*/
  Promise.all([promise1,promise2,promise3]).then(res => {
    // res是一个数组  
  }).catch(err => {

  })
  // promise1,promise2,promise3 一个为reject就reject


/* 二：Promise.allSettled */
  Promise.allSettled([p1, p2, p3]).then(res => {
    console.log("res: ",res)
  }).catch(err => {
    console.log("err: ",err)
  })
/* 
不管有没有reject,都会调then，catch不调
结果如下：
  res:  [
    { status: 'fulfilled', value: 11111 },
    { status: 'rejected', reason: 22222 },
    { status: 'fulfilled', value: 33333 }
  ]
*/


// 三：Promise.race
// 只要有一个Promise变成fulfilled / rejected状态, 那么就结束

/* 
四：Promise.any
相当于是 race，但是不会直接就被reject结束掉，而会至少等一个resolve结果。
*/
  Promise.any([p1, p2, p3]).then(res => {
    console.log("res:", res)
  }).catch(err => {
    // 只有等到所有的，都拒绝，才执行这里的catch
    console.log("err:", err.errors)// 自动生成一个AggregateError类，有一个errors属性
    // 可以拿到含所有 err的数组
  })
  