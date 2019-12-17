# Function JS 

### 什么是函数式编程

- 编程范例
- 编码风格
- 人群观念
- 流行趋势

### per
- 安全、便于调试、维护
- Do every with function 一切都要函数化
 考虑 input --> output 数据流

### 注意
- 避免副作用
- 使用（pure）纯函数

函数的结果只由输入决定，指定唯一输入后返回唯一输出
避免在函数中做一些函数目的操作之外的事（eg: 使用全局变量参加运算 ，函数块中代码加入console打印输出）

### JS高阶函数

`map, reduce, filter  ` 

特点： 函数作为函数的输入，也可返回一个输出，函数视作对象本身，可以传递其他函数，甚至嵌套函数

### 避免迭代
避免使用（for，while）
除了JS内置的map，reduce，filter。还可以使用lodash等JS库

![map](https://pic2.zhimg.com/80/87d2a7aa7fa5390a3287a0003f7e2261_hd.jpg)

map做洗，切等操作，reduce负责按固定流程组合起来，filter用于过滤掉你或许不需要的那一项

### 避免数据变异
数据变异：对象的改变
很多情况我们改变数据是在无意中发生的，比如丢失this绑定，

### 缓存 多次拷贝
举个例子
- 斐波那契数列
```
// map作用 缓存
// 斐波那契数列 递推 f(n) = f(n-1) + f(n-2)
// 1 1 2 3 5 8 12
function fb(n) {
  if (n === 1 || n === 2) {
    return 1
  }
  return fb(n - 1) + fb(n - 2)
}
console.time('fb')
let res = fb(35)
console.log(res);
console.timeEnd('fb');
```
计算时间很长，因为递归重复计算了很多参与值
 存在很多重复的计算 可以把单次计算结果缓存下来 减少重复计算
 ``` 
 这里fb(33) 每一次递推都要计算一次
  fb(35) = fb(34) fb(33)
  fb(34) = fb(33) fb(32)
  fb(33) = fb(32) fb(31)
 ``` 
使用map优化 空间换时间
```
let map = new Map()
function fb(n) {
  if (n === 1 || n === 2) {
    return 1
  }
  // 已经计算 返回
  if (map.get(n)) return map.get(n)
  let res = fb(n - 1) + fb(n - 2)
  // map键值对的形式存储
  map.set(n, res)
  return res
}
console.time('fb')
let res = fb(35)
console.log(res);
console.timeEnd('fb')
```
### structural sharing
可代替数据结构    
数组 --> 树 数组项 --> 叶子结点     
高复用 map/hashmap    
现存在H1, H2 ,H3这个数组，如果想把H3替换为H4， 按照避免数据变异的原则应该拷贝一份再将H3换为H4，
但可代替数据结构 复用H1、H2，再连上新加入的节点H4 如图 
![](https://pic2.zhimg.com/80/v2-690e76b3f69afd7928eaac29d29043d5_hd.jpg)
![](https://pic2.zhimg.com/80/v2-478258cb85ea3996a94183ff4d4cffa5_hd.jpg)

函数库
- mori
- underscore
- loadsh