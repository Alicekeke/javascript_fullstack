const url = require('url')
let request = {
  get url() { // 一个方法如果在前面加了 get 那么调用这个函数时就不要加上 ()就可以调用
    // 直接用ctx.request.url 取值
    return this.req.url
  },
  get path() {
    return url.parse(this.req.url).pathname
  },
  get query() {
    return url.parse(this.req.url).query
  }
}

module.exports = request