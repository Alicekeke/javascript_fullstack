#### 拖拉拽必用的三个事件
拖拽的交互都是根据三个组合的事件完成的，根据坐标计算拖动了多少    
- touchstart
- touchmove
- touchend
  
#### offsetWidth、clientWidth、innerWidth及相关属性方法

* offsetWidth 水平方向 width + 左右padding + 左右border-width
* offsetHeight 垂直方向 height + 上下padding + 上下border-width
* clientWidth 水平方向 width + 左右padding
* clientHeight 垂直方向 height + 上下padding
* offsetTop / offsetLeft 获取当前元素到 定位父节点 的top/left方向的距离
* scrollWidth / scrollHeight 元素内容真实的宽/高度，内容不超出盒子高度时为盒子的clientWidth / clientHeight
* innerWidth / innerHeight 浏览器窗口可视区宽 / 高度（不包括浏览器控制台、菜单栏、工具栏） 
* document.documentElement.clientWidth / clientHeight浏览器窗口可视区宽/高（不包括浏览器控制台、菜单栏、工具栏、滚动条） * document.documentElement.offsetHeight 获取整个文档的高度（包含body的margin）
* document.body.offsetHeight 获取整个文档的高度（不包含body的margin）

#### 面向对象改写封装

用类和构造器解构配置，给到新的方法，构造好参数并初始化，    
类中方法要用到在构造器中初始化的元素需要用this绑定好作用域，然后在通知回调函数修改dom操作需要的数据。   
new一个新的类，调用我们定义好的回调函数   

#### 函数式编程 -- 无参化

> forEach(function(currentValue, index, arr), thisValue) 方法用于调用数组的每个元素，并将元素传递给回调函数   


```
function add(a, b, c) {
    console.log(a, b, c)
  }
  add(1, 2, 3)
  let arr = [1, 2, 3]
  arr.forEach(add)
  // === 在这里上下参数不同的forEach方法是相同的，add无参化，暴露出它所有参数   
  arr.forEach((item, i, arr) => {
    //console.log(item, i, arr)
    add(item, i, arr)
    // forEach暴露出的所有参数都会被add回调接收到   
  })
  ```
  因为js中函数是一等公民 函数和其他变量一样 具有同等地位

  - 一道例题
  > [1,2,3].map(parseInt)


  ```
  // map和上面一样，map得到的参数全部给了parseInt   
  // 缺点，所有参数都暴露，配置不合法会导致方法失败,如这里parseInt报错    
   console.log([1,2,3].map(parseInt))   
  // === 效果相同 
  parseInt(1, 0, [1,2,3])
  parseInt(2, 1, [1,2,3]) //这里NaN，parseInt以后一位参数转换进制   
  parseInt(3, 2, [1,2,3])
  ```
