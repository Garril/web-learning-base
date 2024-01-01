function arrrange(taskId) {
  const tasks = [];
  tasks.push(() => {
    console.log(`${taskId} is collect`);
  });
  async function execute() {
    for (let task of tasks) {
      await task();
    }
  }
  function doSomething(something) {
    tasks.push(() => {
      console.log(`Start to ${something}`);
    });
    return this;
  }
  function wait(duration) {
    tasks.push(() => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log("wait: ", duration);
          resolve();
        }, duration);
      });
    });
    return this;
  }
  function waitFirst(duration) {
    tasks.unshift(() => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log("waitFirst: ", duration);
          resolve();
        }, duration);
      });
    });
    return this;
  }
  return {
    execute,
    do: doSomething,
    wait,
    waitFirst,
  };
}

arrrange("Garril").do("aaa").wait(1000).do("bbb").waitFirst(1000).execute();
