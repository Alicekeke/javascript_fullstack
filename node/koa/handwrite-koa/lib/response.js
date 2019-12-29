let response = {
  // 创建'body'方法
  get body() {
    return this._body
  },
  set body(value) {
    this.res.statusCode = 200
    this._body = value //set时先保存下来
  }
}

// ctx.response.body

module.exports = response
