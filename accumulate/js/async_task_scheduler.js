// 并发任务控制
class SuperTask {
  constructor(parallelCount = 2) {
    this.parallelCount = parallelCount; // 并发数量
    this.runningCount = 0; // 正在运行的任务数
    this.tasks = []; // 任务列表
  }
  add(task) {
    // add 返回一个promise，但是什么时候完成，什么时候失败
    return new Promise((resolve, reject) => {
      // 只有调用task异步任务才能知道，但是不知道当前运行任务数是否到达上限
      // 所以先不调，收集起来，_run去调,但是_run中跑task后需要resolve/reject所以搜集
      this.tasks.push({
        task,
        resolve,
        reject,
      });
      this._run();
    });
  }
  _run() {
    while (this.runningCount < this.parallelCount && this.tasks.length) {
      const { task, resolve, reject } = this.tasks.shift();
      // 需要考虑下task是否返回的是一个promise
      let res = task(); // res：拿到timeout返回的promise
      // resolve，reject是add后返回的promise的resolve和reject
      if (!(res instanceof Promise)) {
        res = Promise.resolve(res);
      }
      this.runningCount++;
      res.then(resolve, reject).finally(() => {
        this.runningCount--;
        this._run();
      });
    }
  }
}

const supertTask = new SuperTask();
function timeout(duration) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}
function addTask(time, name) {
  supertTask
    .add(() => timeout(time))
    .then(() => {
      console.log(`任务${name}完成`);
    });
}
addTask(10000, 1); // 10s后输出：任务1完成
addTask(5000, 2); // 5s后输出：任务2完成
addTask(3000, 3); // 8s后输出：任务3完成
addTask(4000, 4); // 12s后输出：任务4完成
addTask(5000, 5); // 15s后输出：任务5完成
/* 
  输出顺序：任务2、3、1、4、5
*/
