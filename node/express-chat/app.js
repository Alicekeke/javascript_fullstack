var http = require('http')
var fs = require('fs')

var server = http.createServer((req, res) => {
  res.writeHead(200, {"Content-type": "text/html"})
  const myreadstream = fs.createReadStream(__dirname + '/views/http_demo.html','utf-8')
  myreadstream.pipe(res)
})

var io = require('socket.io')(server)

io.on("connection", function (socket) {
  console.log('一个socket链接成功了');
  // 接受前端发回的socket请求 收消息emit 发消息on
  socket.on('link_to_server', (msg) => {
    console.info(`这是收到的消息${msg}`)
    // socket.emit('link_to_client', '对')
    io.emit('link_to_client', msg)

  })
  
})
server.listen(1314, '127.0.0.1')
// 连到同一个ip既可以在同一个局域网实现消息互动
console.log('server is running in 1314');
