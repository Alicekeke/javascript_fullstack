const Event = require('events')

const ev = new Event()
// 一个events模块最简单的发布订阅者实例
// on订阅 准备好这个模块等待发布者使用
ev.on('lesson', (a, b)=>{
  console.log(a,b,'上课了')
})
ev.on('lesson', (a, b)=>{
  console.log(a,'上课了')
})

// emit发布
ev.emit('lesson', '软件工程', '操作系统')