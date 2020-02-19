/**
 * 实现一个Queue类，要求包含两个函数 task函数：新增一个任务。包含两个参数，等待时间和回调函数
 *  start函数：执行任务队列。将所有任务按队列顺序执行，执行完一个任务才能执行下一个任务 
 * ps：下面代码，实现添加3个任务，然后执行3个任务。隔1秒，打印1；再隔2秒，打印2；再隔1秒，打印3
  原题：https://www.nowcoder.com/discuss/357853?type=2&order=0&pos=16&page=1
 */
 
new Queue()
.task(1000, () => {
  console.log(1)
})
.task(2000, () => {
  console.log(2)
})
.task(1000, () => {
  console.log(3)
})
.start()

class Queue {
  constructor() {
    this._tasks = [];
    this.loop = 0;
    this.limitNumber = 1;
  }
  task(wait, cb) {
    this._tasks.push({
      cb,
      wait
    })
    return this;
  }
  start() {
    return this._run(this._tasks.slice(this.loop * this.limitNumber, 
      this.loop * this.limitNumber + this.limitNumber));
  }
  _run(task) {
    // if (task.length < 1) return Promise.resolve();
    var taskDetail = task[0]
    if (!taskDetail) return Promise.resolve();
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        taskDetail.cb();
        this.loop ++;
        resolve();
      }, taskDetail.wait);
    })
    .then(res => {
      // 下次任务
      return this._run(this._tasks.slice(this.loop * this.limitNumber, 
        this.loop * this.limitNumber + this.limitNumber));
    })
  }
}