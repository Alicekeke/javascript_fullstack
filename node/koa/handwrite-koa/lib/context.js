let proto = {}
// 代理 方法
function defineGetter(prop, name) { // 参数分别是为了 代理的对象和对象上面的属性
  proto.__defineGetter__(name, function () { 
  // 每一个对象都有一个这样的方法__defineGetter__, 可以用这个方法实现代理
    return this[prop][name] // 这里的this是ctx ctx.url 就是this.request.url

  })
}

function defineSetter(prop, name) {
  proto.__defineSetter__(name, function(val) {
    this[prop][name] = val
  })
}

defineGetter('request','url')
defineGetter('request','path')
defineGetter('response', 'body')
defineSetter('response', 'body')

module.exports = proto