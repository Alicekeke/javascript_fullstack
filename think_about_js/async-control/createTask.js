// 写出下面代码输出结果
// 源链接https://www.nowcoder.com/discuss/353684?type=2&order=0&pos=9&page=2

function createTask(ms) {
   return () => {
     console.log('start', ms);
     return new Promise(r => setTimeout(() => {
       console.log('end', ms);
       r(ms);
     }, ms));
   }
}
const tasks = Array(5).fill(null).map((_, i) => createTask(i * 1000));
Promise.all(tasks.map(task => task())).then(console.log);


// 题解：
// Array(5).fill(null) ==> [null, null, null, null, null]

/* map(_, i) => createTask(i*1000) 返回一个新的createTask的回调：array下标对应乘1000
  ==> task = [creatTask(0), creatTask(1000)...  createTask(4000)]

  map依次执行createTask(), promise.all等所有的promise resolve回打印resolve的值 （console.log无参化，函数式编程风格）
  promise.all( createTask(0)()...createTask(4000)()).then(console.log)  

  createTask里先同步输出start 0/.../4000    
  在new promise异步setTimeout中每隔ms输出 end 0/.../4000（end 0 不需要等待，等start打印完紧接着输出）

  Promise中 r(ms);  ==> 最后输出promise.all resolve的结果数组[0, 1000, 2000, 3000, 4000]
*/



// 接上 表示同时只能有2个任务运行，且then中得到的数组顺序和通过Promise.all得到的一致
limitRunTask(tasks, 2).then(console.log);

// function limitRunTask(allTask, limitNumber) {
//   let resArr = []
//   let loop = 0
//   // limitRunTask每次只接受两个任务运行，并且每次返回promise 再执行下两个任务(递归) 递归的终止条件即tasks遍历完 长度为0
//   function run(tasks) {
//     if(!tasks.length) return Promise.resolve()
//     return Promise.all(tasks.map(task => task())).then(res => {
//       resArr.push(...res)   //组装promise的resolve
//       // console.log(loop, '任务结束')
//       loop ++;    // 轮次+1  再返回下两个任务执行
//       return run(allTask.splice(loop * limitNumber, loop * limitNumber + limitNumber))
//     })
//   }
//   // 每次从任务队列里切割出两个task执行 loop记录当前轮次
//   return run(allTasks.splice(loop * limitNumber, loop * limitNumber + limitNumber))
// }


// solution2
function limitRunTask(tasks, limit) {
  return new Promise((resolve, reject) => {
    let index = 0;
    let alive = 0;
    let finish = 0;
    let result = [];
    function trigger() {
      if (finish >= tasks.length) { //终止条件
        resolve(result);
        return;
      }
      while (alive < limit  && index < tasks.length) {  //思路一样 但前者按固定分片再promise.all抛出  
        alive ++;
        const promise = tasks[index]();
        const curIndex = index;
        promise.then(value => {
          alive --;   //[0, limit]
          finish ++;  //当前执行task长
          result[curIndex] = value;
          trigger();  //判断是否到终止条件
        });
        index ++;
      }
    }
    trigger();
  });
}
