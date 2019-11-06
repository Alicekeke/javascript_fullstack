const http = require('http')
const fs = require('fs')
const urlModule = require('url')
const nodemailer = require('nodemailer')

let code = 666666

http.createServer((req, res) => {
    const method = req.method
    const url = req.url
    const urlObj = urlModule.parse(url)
    console.log('url', url)
    if (url === '/register' && method === 'GET') {
      // require respons 两个对象 继承了 流Stream 和 事件Event
      res.writeHead(200, {
        'Content-Type': 'text/html;charset=utf-8'
      })
      fs.createReadStream('./register.html').pipe(res)
    } else if (urlObj.pathname === '/sendEmail' && method === 'GET') {
      const emailQs = urlObj.query
      const email = emailQs.split('=')[1]

      // nodemail配置模块
      const transport = nodemailer.createTransport({
        service: 'qq',
        port: 465,
        secureConnection: true,
        auth: {
          user: '1424254461@qq.com',
          pass: 'dmsopdvamukfbabf'
        }
      })
      
      // 设置邮箱配置
      transport.sendMail({
        to: email,
        // 发邮件  ==  发一份html
        html: `<h2>${code}</h2>`,
        from: '1424254461@qq.com',
        subject: '网站验证'
      }, (err, info) => {
        res.writeHead(200, {
          'Content-Type': 'application/json'
        })
        if (err) {
          res.end(JSON.stringify({ //end只能返回字符串，需要转json；stringify()js对象转换为字符串
            code: 500,
            email,
          }))
        } else {
          res.end(JSON.stringify({
            code: 200,
            email,
          }))
        }
      })
    } else if (urlObj.pathname === '/register1' && method === 'POST') {
      let data
      // 简单把提交过来的东西拼接看下
      req.on('data', (c) => {
        data += c
      })
      req.on('end', () => {
        console.log('data', data)
        res.end(data)
      })
    } else {
      res.writeHead(200, {
        'Content-Type': 'text/html;charset=utf-8'
      })
      res.end('访问出错')
    }
  })
  .listen(3344, () => {
    console.log('server is running http://localhost:3344')
  })