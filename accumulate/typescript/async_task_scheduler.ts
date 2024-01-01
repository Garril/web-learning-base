function timeout(duration: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}
type TaskCallback = () => Promise<void>;
type Task = {
  doing: boolean;
  process: TaskCallback;
  complete: (value: void | PromiseLike<void>) => void;
};

class SuperTask {
  private queue: Task[] = [];
  private concurrency: number;
  constructor(concurrency = 2) {
    this.concurrency = concurrency; // 并发数量
  }
  async add(taskCallback: TaskCallback) {
    return new Promise<void>((resolve, reject) => {
      const task = { doing: false, process: taskCallback, complete: resolve };
      this.queue.push(task);
      if (this.queue.length - 1 < this.concurrency) {
        this.next(task);
      }
    });
  }
  private async next(task?: Task) {
    if (task) {
      task.doing = true;
      task.process().finally(() => {
        this.remove(task);
        this.next(this.queue.find((task) => !task.doing));
      });
    }
  }
  private async remove(task: Task) {
    task.complete();
    const i = this.queue.indexOf(task);
    if (i > -1) {
      this.queue.splice(i, 1);
    }
  }
}

const supertTask = new SuperTask();

function addTask(time: number, name: number) {
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
export {};
