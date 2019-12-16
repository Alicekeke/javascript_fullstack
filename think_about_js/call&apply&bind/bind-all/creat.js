// 手写bind
Function.prototype.myBind = function (oThis, ...aArgs) {  //... 整理为数组
  // 先获取要绑定的函数
  var fToBind = this
  var fBound = function() {
    fToBind.apply(oThis)
  }
  return fBound
}

function sun(a, b, c) {
  return a + b +c
}
// 第一步调用 绑定this 但不执行
var a = sum.myBind(null, 1)
// 第二步调用 实际执行
a(2, 3)

/**
 bind()方法创建一个新的函数，在bind()被调用时，
 这个新函数的this被bind的第一个参数指定，其余的参数将作为新函数的参数供调用时使用
 */


//  -------进阶版-----------
Function.prototype.myBind = function (oThis, ...aArgs) {  //... 整理为数组
  // 先获取要绑定的函数
  var fToBind = this
  var fBound = function(...bArgs) {
    // 拿到所有的参数 并返回
    // 增加判断是否被new调用 如果被new调用 this指向被new完的实例 否则默认第一个参数oThis
    let isNew = this instanceof fBound
    return fToBind.apply(isNew ? this : oThis, aArgs.concat(bArgs))
  }
  // fBound没有prototype 处理完被丢失 要继承原型链保证不丢失
  fBound.prototype = Object.create(this.prototype)
  return fBound
}
// 
function sum(a, b, c) {
  return a + b +c
}
sum.prototype.abc = function () {}
// 如果原来有一个自带prototype， 重绑定会导致丢失

let obj = {}
// bind不是立即执行 而是返回一个参数
// 第一步调用 绑定this 但不执行
var a = sum.myBind(null, 1)
// 第二步调用 实际执行
a(2, 3)


//总结： 1.处理this 2.绑定参数 3.处理原型对象