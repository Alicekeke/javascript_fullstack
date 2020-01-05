//vue源码实现 -- 响应式原理 -- 数据变化的同时可以更新视图

// 重写数组方法 push shift pop reverse    在不污染Array.prototype的前提下 拿到原型链保存
let oldArrayPrototype = Array.prototype
let proto = Object.create(oldArrayPrototype)  //深拷贝一份prototype creat()返回带隐式对象的空数组

// forEach报错 拿到的是类数组 不是真正意义上的数组  类型转换
let arr = new Array()
arr = [...['a','b','c']]

Array.from(['push', 'shift', 'unshift']).forEach(method => {
  proto[method] = function() {    //函数劫持，函数重写，内部调用的还是原来的方法
    updateView() //切片编程
    oldArrayPrototype[method].call(this, ...arguments)
  }
})

function observer (target) {  //观察者
  if(typeof target !== 'object' || target == null) {
    return target
  }
  // 拦截数组 给数组中的方法进行重写
  if (Array.isArray(target)) {
    // target.__proto__ = proto
    Object.setPrototypeOf(target, proto)    //设置target对象的原型为proto
  }
  for (let key in target) {
    defineReactive(target, key, target[key])
    // Object.defineProperty(target, key, { //抽象出来分离成defineReactive()
    //   set(){}
    //   get(){}
    // })
  }
}
function defineReactive(target, key, val) {
  observer(val) //递归一层层判断data中是否有数组类型 pro：性能差 仅在三层或三层之后才有作用
  Object.defineProperty(target, key, {
    // 经过defineProperty操作过的对象 取值必须经过get方法
    get () {
      return val
    },
    // 拿到新值
    set (newVal) {
      if (newVal !== val) {
        updateView()
        val = newVal
      }
    }
  })
}

function updateView () {
  // diff算法 实时监控data数据源 排成dom节点 替换虚拟dom
  // console.log('更新视图')
}

// 使用object.defineProperty 对象劫持 重新定义对象属性 给属性增加getter setter方法  之前是隐藏的属性
let data = {
  name: 'keke',
  age: 19,
  weight: [100, 110, 120] //data中数组情况 不能执行更新视图 因为vue重写了数组方法
}
observer(data)    //观察者要实时观察数据源

// 模拟数据变化
// setInterval (() => {
//   data.name = String(Math.random()) + 'keke'
// }, 3000)
data.weight.push(30)
