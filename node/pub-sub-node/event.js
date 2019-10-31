// 前端工程化 管理合作完成工程化大的项目
// node让前端变得工程化 因为node具有文件操作  js则无

const Event = require('events')

const ev = new Event()
// 一个最简单的发布订阅者实例
// 订阅
ev.on('teacher', (a, b)=>{
  console.log(a,b,'上课了')
})
ev.on('teacher', (a, b)=>{
  console.log(a,'上课了')
})

// 发布
ev.emit('teacher', '软件工程', '操作系统')