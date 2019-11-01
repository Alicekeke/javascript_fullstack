// node.misic.js 内容
// node进程模块 process ，process对象一个全局变量
// console.log(process.argv)
// process.argv 属性返回一个数组，这个数组包含了启动Node.js进程时的命令行参数，
// [ 'C:\\Program Files\\nodejs\\node.exe',
//   'D:\\javascript_fullstack\\node\\pub-sub-node\\music.js',
//   '内容' ]
const request = require('request')
const Event = require('events')
const inquirer = require('inquirer') //用户与命令行交互的工具
const fs = require('fs')
const ev = new Event()

function main(argv) {
  if (argv.length) {
    let search = argv[0]
    // console.log(search)
    // 模块解耦
    ev.emit('search', search) //订阅
  }
}
// 定义下载歌
ev.on('download',(id) => {
  request({   //request结束一个对象(很多配置)
    method: 'GET',
    url:  `http://neteasecloudmusicapi.zhaoboy.com/song/url?id=${id}`,
    json: true
  },(err,res) => {
    // 拿到地址
    const body = res.body
    console.log('地址',body.data[0].url)
    if(body.data && body.data[0] && body.data[0].url){
      //下载
      request(body.data[0].url).pipe(        //request作用 原始：返回json；在这里获得二进制流
        fs.createWriteStream(`./${id}.mp3`) //创建本地MP3--可写流 是pipe管道连接了他两 pipe是node中stream模块的部分
      )
    }
    else{
      console.log('没有找到这首歌，重选')
    }
  })
})
// 命令行交互配置
ev.on('select', (songLists) => {
  // prompt: 定义好的交互根据交互问题的不同，定义不同的参数 ，要求是一个数组; prompt是一个方法，直接调用就行
  inquirer.prompt([{
    // 以下都是prompt的配置
      type: 'list',
      name: 'song',
      message: `共有${songLists.result.songCount}首歌，回车下载`,
      choices: songLists.result.songs.map(song => {
        return {
          value: song.id,
          name: song.name + (song.artists[0] ? song.artists[0].name : ''),
        }
      })
    }])
    .then(id => {
      // console.log('选择了', id)
      id = id.song
      // 命令行交互回调执行download方法
      ev.emit('download',id)
    })
})

// 搜索模块
ev.on('search', (search) => {
  search = encodeURIComponent(search);
  // 拿到要搜索的关键词
  request({
    method: 'GET',
    json: true,
    url: `http://neteasecloudmusicapi.zhaoboy.com/search?keywords=${search}`
  }, (err, body) => {
    if (err) {
      console.log('出错了', err)
    } else {
      // console.log(body.body)
      // 把收到的body传给select
      ev.emit('select', body.body)
    }
  })
})

main(process.argv.slice(2)) //发布，先订阅再发布
//发布订阅
// event.emit()