// 先写一个浅拷贝的实现
// ----------------浅拷贝------------
function cloneShallow(source) {
  var target = {}
  for (var key in source) {
   if (Object.prototype.hasOwnProperty.call(source, key)) {
    target[key] = source[key]
   }
  }
  return target
}
// js不拷贝原型链上的值 判断是否是继承来的属性 
// Object.prototype.hasOwnProperty.call()用来检测一个对象是否含有特定的自身属性；并且忽略掉那些从原型链上继承到的属性。

let a = {
  name: 'keke',
  book: {
    title: 'hi',
    price: '11',
  }
}
let b = cloneShallow(a)
a.name = 'xixi'
a.book.price = '22'
console.log(a)  //book中引用数据类型book.price被修改
// 深拷贝拿到原始值类型，所以要一步步深入找原始值

// ------------深拷贝-------------
//  从引用值一直往里面找到原始值 递归
function cloneDeep(source) {
  // 判断是否是引用类型，如果判断为基础数据类型，则没有必要深拷贝
  if (typeof source !== 'object') {
    return source
  }
  // 判断当前source是数组还是对象
  var target = Array.isArray(source) ? [] : {}
  // var target = {}
  for (var key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      //在这里找到引用值还不够，再往里找  判断是不是引用类型
      //  typeof不能判断复杂数据类型，但对象可以用typeof判断
      if (typeof source[key] === 'object') {
        // 递归 再筛一遍
        target[key] = cloneDeep(source[key])
      } else {
        target[key] = source[key]
      }
    }
  }
  return target
}
let a = {
  name: 'keke',
  book: {
    title: 'hi',
    price: '11',
  }
}
let b = cloneDeep(a)
a.name = 'xixi'
a.book.price = '22'
console.log(b)  // 22 book中引用数据类型被修改

// 如何兼容数组？
// 增加判断是否数组的操作

let a = [0, '1', [2, 3]]
let b = cloneDeep(a)
a[0] = 9
a[2][0] = 4
console.log(b)

// ------------借用栈规则，避开递归调用的缺陷----------
// 链表查结点 循环置换 递归 尾递归 空间换时间 递归比较好理解
function cloneDeep2(x) {
  const root = {}
  // 栈结构
  const loopList = [{
    parent: root, //相对父节点
    key: undefined, //key用来存储放哪一个父元素的那一个子元素的拷贝对象
    data: x
  }]

  while (loopList.length) {
    // 深度优先
    const node = loopList.pop() //删除并返回栈底元素
    const parent = node.parent //父节点，第一次遍历为空对象，之后拿到第二层的key
    const key = node.key      //第一层数据
    const data = node.data  //传来的对象结点
    console.log(parent) // {}
    console.log(key)  //undefined
    console.log(data)   

    let res = parent // {}
    // 初始化赋值目标，key为undefined的话拷贝到父元素，否则拷贝到子元素
    if (typeof key !== 'undefined') {
      res = parent[key] = {}
    }
    // 循环对象
    for (let k in data) {
      if (data.hasOwnProperty(k)) {
        if (typeof data[k] === 'object') {
          // 下一次循环 把再一次找的引用值放到栈中
          loopList.push({
            parent: res,
            key: k,
            data: data[k] //下一次循环 data存放循环后找到的对象中的引用数据类型
          })
        } else {
          res[k] = data[k]
        }
      }
    }
  }
  return root
}

let a = {
    name: 'keke',
    book: {
      title: 'hi',
      price: '11',
      me: {
        my: 'yy'
      }
    }
  }
  let b = cloneDeep2(a)
  a.name = 'xixi'
  a.book.price = '22'
  a.book.me.my = 'zz'
  console.log(b) //b值没有被改变


  //for..in  for..of 的区别
  //遍历对象  数组

