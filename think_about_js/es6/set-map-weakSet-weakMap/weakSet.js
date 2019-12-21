/**
 * set是值的集合，且成员值唯一
 * weakSet 同样不会存储重复的值，不同的是其成员必须是对象类型的值
 * 与set一样，t有add()，delete()、has()
 *  WeakSet 结构不可遍历。因为它的成员都是对象的弱引用，
 * 随时被回收机制回收，成员消失。所以WeakSet没有keys()，values()，entries()，forEach()等方法和size属性
 */
const ws = new WeakSet()
// ws = 1  报错
// ws.add(1)  报错：在弱版本的weakSet上面，add没有用
// ws.add(Symbol())  报错
ws.add({a: 1})
console.log(ws)    // weakSet {<item unknown>}，weakSet只能存放对象


const a = [[1, 2], [3, 4]]
const wss = new WeakSet(a)

console.log(wss)    // weakSet {Array(2), Array(2)} ? weakSet会将数组转化成对象

const b = [5, 6]
const ke = new WeakSet(b)
console.log(ke)     // 报错：传进来的是数组不是对象。



const ws = new WeakSet()
const obj = {}
const foo = {}

ws.add(window)
console.log(ws)    // weakSet(window)
ws.add(obj)
ws.has(obj)
ws.delete(obj)
ws.add(foo)

console.log(ws.size)    // 报错：weakSet没有size属性，即weakSet不能被遍历

ws.forEach(item => {
  console.log(item)     // 报错
})


// ------- 应用场景 -----------
const foos = new WeakSet()
// 把foos定义成WeakSet的好处：
// 对实例的引用不会被计入到内存回收机制当中，
// 当实例用完之后，删除实例的时候不用考虑foos及其使用时内部用过的参数和变量(已经被垃圾回收掉了)，也不会出现内存泄漏。
class Foo {
  constructor () {
    // foos加进一个构造函数的this作用域
    foos.add(this)
  }

  method () {
    if (!foos.has(this)) {
      throw new TypeError('error')
    }
  }
}
let faa = new Foo()
// 保证Foo的实例方法只能在Foo的实例上调用，即只能faa.method()
// 只想保证Foo的实例方法只能在Foo的实例上调用时可使用WeakSet