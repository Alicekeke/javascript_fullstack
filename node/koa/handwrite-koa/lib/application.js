let http = require('http')
let EventEmitter = require('events')
let context = require('./context')
let request = require('./request')
let response = require('./response')
// 判断图像流类型
let Stream = require('stream')


// 错误处理机制
class Koa extends EventEmitter {
  constructor () {
    super()
    this.fn
    this.context = context
    this.request = request
    this.response = response
  }

  use (fn) {
    this.fn = fn
  }

  createContext (req, res) { //创建ctx
    const ctx = Object.create(this.context)
    const request = ctx.request = Object.create(this.request)
    const response = ctx.response = Object.create(this.response)
    // 交叉赋值   互相包含
    ctx.req = request.req = response.req = req
    ctx.res = request.res = response.res = res
    request.ctx = response.ctx
    request.response = response
    response.request = request
    return ctx
  }

  handleRequest(req, res) { // 创建一个处理请求的函数
    res.statusCode = 404
    let ctx = this.createContext(req, res) // 创建了ctx
    this.fn(ctx)
    // 优化输出，若对象 转为json格式 
    if(typeof ctx.body == 'object') {
      res.setHeader('Content-Type', 'application/json;charset=utf-8')
      res.end(JSON.stringify(ctx.body))
    } else if (ctx.body instanceof Stream) {
      ctx.body.pipe(res)  //处理流类型数据
    } else if(typeof ctx.body === 'string' || Buffer.isBuffer(ctx.body)) {
      res.setHeader('Content-Type', 'application/json;charset=utf-8')
      res.end(ctx.body)
    } else {
      res.end('Not Found')
    }
    // res.end(ctx.body)
  }

  listen (...args) {
    let server = http.createServer(this.handleRequest.bind(this))
    server.listen(...args)
  }
}

module.exports = Koa
