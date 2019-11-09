const http = require('http')

http.createServer((req, res) => {
  // 通过一个响应头告诉浏览器返回的数据类型
  console.log(req.url, req.method, req.httpVersion,  req.headers)//路径，请求方式，协议的版本，请求头
  res.writeHead(200, {
    'content-type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'X-auth, content-type',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
    'Access-Control-Allow-Credentials': true
  })
  // res.end(JSON.stringify({
  //   name: 'keke',
  //   sex: 'female'
  // }))
  // ------------jsop风格--------
  // json对象转化为字符串作为参数塞到getBook的方法参数中，end响应结束返回内容
  res.end(`getBook(${JSON.stringify({bookName: 'js'})})`)
})
.listen(3000, () => {
  console.log('server is running')
})