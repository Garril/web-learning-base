/*
JS在浏览器中，让浏览器发送网络请求：js -> 浏览器 -> 操作系统
node中： js readfile -> libuv -> 任务
node中的理解：
  一次tick，其实就是宏任务走了一轮，宏任务分类按顺序（分阶段）
  一次tick中，每次执行宏任务的一个阶段前，都会查看微任务队列是否要执行
微任务优先，微任务先比较浏览器多了个process.nextTick
宏任务： IO和close还有setImmediate
*/