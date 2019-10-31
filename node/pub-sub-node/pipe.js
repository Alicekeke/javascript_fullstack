const fs = require('fs')
// 文件模块
fs.readFile('./index.html',(err, data) =>{
  //区别： data 读完之后放在内存中 ；极端场景：容量过大时，读完再存 耗时大
  fs.writeFile('./index-copy.html', data, (err,res) =>{
    if(! err){
      console.log('writted!') //js的经典回调
    }
  })
})
const request = require('request')

// 复制一份文件
// stream的好处，边读边写
fs.createReadStream('./music.js') //把要读的那一端打开
.pipe(                  //pipe相当于管道，文件读写的两端
  fs.WriteStream('./musicCopy.js')
)