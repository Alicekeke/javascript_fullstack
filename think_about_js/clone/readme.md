# 深拷贝与浅拷贝

## 数据类型
数据分为基本数据类型(String, Number, Boolean, Null, Undefined，Symbol)和对象数据类型    

原始数据类型：保存在栈(stack)中，   
引用类型类型：存储的是该对象在栈中引用，真实的数据存放在堆内存里    

js引擎需要用栈来维护执行上下午的状态，如果栈空间太大，效率就低了。引用类型存放在堆空间了，栈里只是存放引用地址    

----------------

## 值和引用
原始值总是通过值复制(value-copy)的方式来赋值/传递
复合值--对象(包括数组和封装对象)和函数，总是通过引用复制的方式来赋值/传递
```
// 简单值 通过值复制的方式赋值
let a = 2
let b = a // b是a的值的副本
a ++
console.log(b)   /* 2 浅拷贝：基础数据类型，不会改变原始值*/ 
```
```
//  复合值 通过引用复制的方式赋值
let a = {
  name: 'keke',
  book: { title: "You Don't Know JavaScript",price: '45' }
}
let b = a
a.name = 'xixi'
a.book.price = '55'
console.log(b)    /* 引用类型执行的复制操作叫浅拷贝*/
console.log(a)  /* xixi, 55 */
```
我们无法自行决定使用值复制还是引用复制，一切由值的类型决定    
对原始值进行复制操作会对值进行一份拷贝；而对引用类型赋值，则会进行地址的拷贝，最终两个变量指向同一份数据    
所以，如果我们要通过值复制的方式来传递复合值，就需要为其创建一个副本，这样传递的就不再是原始值    

---------------

### 赋值与浅拷贝的区别
- 深拷贝和浅拷贝是只针对Object和Array这样的引用数据类型的。
- 当我们把一个对象**赋值**给一个新的变量时，赋的其实是该对象的在栈中的地址，而不是堆中的数据。也就是两个对象指向的是同一个存储空间，无论哪个对象发生改变，其实都是改变的存储空间的内容，两个对象是联动的，具有映射关系，你变我也变。    

- **浅拷贝**是按位拷贝对象，它会创建一个新对象，这个对象有着原始对象属性值的一份精确拷贝。如果属性是基本类型，拷贝的就是基本类型的值；如果属性是内存地址（引用类型），拷贝的就是内存地址 ，因此如果其中一个对象改变了这个地址，就会影响到另一个对象。即默认拷贝构造函数只是对对象进行浅拷贝复制(逐个成员依次拷贝)，即只复制对象空间而不复制资源。     

--|和原始值是否指向同一对象|第一层数据为基本数据类型|原数据中包含子对象
--|:--:|:--:|:--:
赋值|是|改变会使原数据一同改变|改变会使原数据一同改变
浅拷贝|否|改变不会使原数据一同改变|改变会使原数据一同改变
深拷贝|否|改变不会使原数据一同改变|改变不会使原数据一同改变

--------------

## 浅拷贝
引用赋值，相当于取了一个别名。新旧对象还是共享同一块内存，对其中一个修改，会影响另一个。浅拷贝只复制指向某个对象的指针，而不复制对象本身，新对象只是拿到了原对象的一个引用。    

 如果属性是基本类型，那么拷贝的就是基本类型的值，如果属性是引用类型，那么拷贝的就是内存地址，   

  #### 实现方法
  (1) Object.assign的方式 
  ```
  // -------------assign() 对象的拼接
  let a = [
   {name: 'keke'},
   {book: { title: "You Don't Know JavaScript",price: '45' } }
  ]
  let b = Object.assign({}, a)/* Object.assign既不是深拷贝也不是浅拷贝，看值的数据类型 会把a中的一级属性都拷贝到｛｝中， */
  a.name = '珂珂'
  a[1].book.price = '55'
  console.log(b)    /* keke, 55 */
  ```
  (2) 通过对象扩展运算符 
  ```
  //取出参数对象的所有可遍历属性，拷贝到当前对象之中
    let b = {...a}
    b[0].name = '珂珂';
    b[1].book.price= '45'
    console.log(b); //{'珂珂' ,'45'}

  ```
  (3) 通过数组的slice方法 
  ```
  let b = a.slice()   
  b[0].name = '珂珂';
  b[1].book.price= '45'
  console.log(b); //{'珂珂' ,'45'}
```
  (4) 通过数组的concat方法
  ```
  let b = a.concat()   
  b[0].name = '珂珂'
  b[1].book.price = '45'
  console.log(b)  //{name: '珂珂'},{price: 45}
```
  slice()和concat() 不带参数会返回当前数组的浅拷贝，返回一个新的数组对象，由于传递给函数的是指向该副本的引用，所以不改变原数组

----------------

## 深拷贝
  赋值时值完全复制，深拷贝会另外创建一个一模一样的对象，完完全全扒下来的，新对象跟原对象不共享内存修改新对象不会改到原对象对其中一个作出改变，不会影响另一个    

  #### 实现方法   
  (1) 通过JSON.stringify来序列化对象    
  ```
   let a = {
   name: 'keke',
   book: { title: 'hi', price: '11', }
   }
   let b = JSON.parse(JSON.stringify(a)) //典型的深拷贝 对象转成字符串，再转换为对象
   console.log(b)
   a.name = 'xixi'
   a.book.price = '22'
   console.log(b)  //前后输出相同
```
- 原理： 用JSON.stringify将对象转成JSON字符串，再用JSON.parse()把字符串解析成对象，一去一来，新的对象产生了，而且对象会开辟新的栈，实现深拷贝。   
- 但JSON.stringify()在遇到不安全的JSON值（undefined、function、symbol、和包含循环引用的对象都不符合JSON结构标准，无法处理，会自动将不安全的JSON值忽略，在数组中返回null。   
既然JSON.parse(JSON.stringify())不能处理函数，则需要手动遍历    

(2) 手写实现递归的方式。

 先写一个浅拷贝的实现
 ```
 ----------------浅拷贝：只进行一次拷贝------------
 function cloneShallow(source) {
   var target = {}
   for (var key in source) {
      // js不拷贝原型链上的值 判断是否是继承来的属性 
    if (Object.prototype.hasOwnProperty.call(source, key)) {
     target[key] = source[key]
    }
   }
   return target
  ```
` Object.prototype.hasOwnProperty.call()` 用来检测一个对象是否含有特定的自身属性；并且忽略掉那些从原型链上继承到的属性。    

接着是深拷贝，深拷贝要拿到原始值类型，所以要一步步深入找原始值    
```
// ------------深拷贝：无限层级拷贝-------------
//  从引用值一直往里面找到原始值 递归
function cloneDeep(source) {
  // 判断是否是引用类型，如果判断为基础数据类型，则没有必要深拷贝
  if (typeof source !== 'object') {
    return source
  }
  // 兼容数组 判断当前source是数组还是对象
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
  book: {   title: 'hi', price: '11', }
}
let b = cloneDeep(a)
a.name = 'xixi'
a.book.price = '22'
console.log(b)  // 22 book中引用数据类型被修改

```

虽然递归比较好理解，但有一个更好的实现深拷贝的办法 就是借用栈规则，避开递归调用的缺陷。链表查结点 循环置换    

- 递归过程：用循环遍历一棵树，需要借助一个栈，当栈为空时就遍历完了，栈里面存储**下一个需要拷贝的节点**
首先我们往栈里放入种子数据，key用来存储放哪一个父元素的那一个子元素拷贝对象
然后遍历当前节点下的子元素，如果是引用对象就放到栈里，否则直接拷贝    
```
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
    const parent = node.parent //第一次遍历为空对象，之后拿到第二层的key
    const key = node.key      //第一层数据
    const data = node.data  //传来的对象结点

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
      me: {my: 'yy'}
    }
  }
  let b = cloneDeep2(a)
  a.name = 'xixi'
  a.book.price = '22'
  a.book.me.my = 'zz'
  console.log(b) /*b拿到原始值*/
```

参考：
[深拷贝的终极探索](https://segmentfault.com/a/1190000016672263#articleHeader2)
[浅拷贝与深拷贝](https://juejin.im/post/5b5dcf8351882519790c9a2e#heading-15)
