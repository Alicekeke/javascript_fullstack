//vue源码实现 -- 响应式原理 -- 数据变化的同时可以更新视图

function observer (target) {  //观察者 只能观察对象
  if(typeof target !== 'object' || target == null) {
    return target
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
  //如何更新视图？  diff算法 实时监控data数据源 排成dom节点 替换虚拟dom
  console.log('更新视图')
}

// 使用object.defineProperty 对象劫持 重新定义对象属性 给属性增加getter setter方法  之前是隐藏的属性
let data = {
  name: 'keke',
  age: 19,
  // weight: [100, 110, 120] //data中数组情况 不能执行更新视图 因为vue重写了数组方法
}
observer(data)    //观察者要实时观察数据源

模拟数据变化
setInterval (() => {
  data.name = String(Math.random()) + 'keke'
}, 3000)
