// 函数式编程，管理输入

function sum (a, b, c) {
  return a + b + c
}
// 对sum柯里化
// bind 返回一个函数
// 参数分批传给sum
const currySum = sum.bind(null, 1, 2)
const res = currySum(7)
console.log(res);

// -----------

function mathchStr (reg, str) {
  return reg.test(str)
}

// + 1~任意长度 \s 空白符 g: global 
console.log(mathchStr(/\s+/g, 'a b')); //存在空格
console.log(mathchStr(/\s+/g, 'abc'));

const hasNum = mathchStr.bind(null, /[0-9]+/g)
// bind拆分 可以构造出任意函数
console.log(hasNum('123abc'));
console.log(hasNum('cbd'));

function type (type, value) {
  return Object.prototype.toString.call(value) === `[Object ${type}]`
}
console.log(type(Array, [1,2,3,4]))
// 把Array固定住
console.log(type(Array, [1]))
const isArray = type.bind(null, 'Array')
console.log(isArray(3));

// --------bind遇到new-------
function Foo () {
  this.a = 123
}
let obj = {}
let Bar = Foo.bind(obj)
let b = new Bar()
// Foo this 指向b
// 既有bind 又有new
// 优先级 new > call/apply/bind