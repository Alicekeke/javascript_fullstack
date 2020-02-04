# bilibili2020校招笔试题

### 同源策略
 - 怎样是同源：协议，端口，域名都相同
 - 为什么有同源策略？：限制同一个源加载的文档与脚本与外部的源进行交互，是重要的安全机制。
 - 什么情况下不受同源的限制？：herf、表单提交、重定向、src跨域资源的引入，但js不能读写加载的内容。
 - 常见解决跨域方法： jsonP（利用`script`标签的跨域特性绕过同源策略）、cors（跨域资源共享）、postMessage（可跨域操作的window属性）、WebSocket协议

### DOM渲染
DOM加载在任何外部资源之前 onload事件在页面载入完毕后立刻执行加载的js代码，当初始的 HTML 文档被完全加载和解析完成之后，        DOMContentLoaded 事件被触发，而无需等待样式表、图像和子框架的完成加载。

### box-sizing 盒模型计算规则
- border-box：宽高 = 内容，border、padding另算
- (默认)content-box：border + padding + content = 宽高
- inherit： 继承父元素box-sizing属性

### CSS伪类选择器
- 伪元素: 创建一些不在DOM树中的元素，并为其添加样式.    
> ::first-letter, ::first-line, ::before, ::after

- 伪类: 用于元素处于的某个状态时，为其添加对应的样式，这个状态是根据用户行为而动态变化的(:hover),和普通的 css 类相似,可以为已有的元素添加样式.    

### 运算符优先级
同优先级运算符，从左往右，
[运算符等级mdn](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence)

### 事件轮询
同步代码执行完后有微任务执行微任务，没有微任务执行下一个宏任务，如此往复循环至结束    

宏任务task:       
> setTimeout、 setInterval、I / O、全局（script）、 UI渲染、setImmediate(Node.js 环境)

微任务: microTask:      
> process.nextTick、 promise、 Object.observe、 MutationObserver
执行顺序：stack -> task queue -> microtask queue        
event-loop: 宏任务 -> 所有的微任务 -> 宏任务 —> 所有的微任务      

### this指向
自己有先调用自己的，没有就去原型链上找；    
宗旨：谁调用this，this指向谁      

### 数组及对象的内置方法
数组 & 对象的遍历方法     

### canvas & svg
- canvas不支持事件处理器(onclick、onmousehover...),canvas内部根据坐标定位(左上角为原点), 判断元素位于那个坐标之内。内部元素事件自己处理。   
- canvas位图（像素点构成） ， svg矢量图（点线圆 等基本图形构成）矢量图缩放时不会失真。    
- 

### h5新标签
<area>：对img引入图片划分（按坐标）     
<summary>: 包含 details 元素的标题，"details" 元素用于描述有关文档或文档片段的详细信息。(仅支持safari&chrome)     

### css元素属性继承
- 可以继承
> font-family，font-size，text-indent，line-height，color，visibility，border-style，cursor，speak

- 不可继承
> height，width，dispaly，max|min-height|width，position，left，right，top，bottom，margin,padding,border，background，text-shadow，content，z-index

### tranistion
  transition:一个元素在不同状态之间切换的时候定义不同的过渡效果, 由于之前没有高度，height属性不存在切换，是从无到有，瞬间到达100，所以tranistion不生效。    

### 回流和重绘
- 构建渲染树、或当渲染树中的一部分(或全部)因为元素的规模尺寸，浏览器resize，布局，隐藏等改变而需要重新构建，这就称为回流(reflow)    
- 渲染树某些元素要更新外观属性，不影响布局的情况，即为重绘    

### link属性
- as：该属性仅在 <link> 元素设置了 rel="preload" 时才能使用,加载的内容的类型
- rel: preload 告诉浏览器下载资源，因为在当前导航期间稍后将需要该资源。
- rel: prefetch 来告诉浏览器用户将来可能在其他页面（非本页面）可能使用到的资源，即加载权重比较低，那么浏览器会在空闲时加载

### JSON.stringify()
序列化：    
- undefined、任意的函数以及 symbol 作为**对象**属性值时 JSON.stringify() 将跳过（忽略）对它们进行序列化；作为**数组**元素值时，JSON.stringify() 将会将它们序列化为 null。
- undefined、任意的函数以及 symbol 被 JSON.stringify() 作为单独的值进行序列化时都会返回 undefined

### js对象、toString()
```js
var a = {};
var b = { key: 'b' }; var c = { key: 'c' }
a[b] = 'b';
a[c] = 'c';
console.log(a[b]); //b 因为a[b]和a[c]的键值被toString转换为[object Object], b被c覆盖
```
js对象的键值只能是`string`|`symbol`，其他类型的键值会先用`toString`方法转化。         
Object类型的每个实例都有toString()方法，返回对象的字符串表示`[object Object]`     

### 节流防抖
- throttling，节流的策略是，固定周期内，只执行一次动作 (平均3s)，既然是3s一次，也可以根据时间判断   
- debounce 的特点是当事件快速连续不断触发时，动作只会执行一次 (3s)

### 位运算

  去看计算机组成原理小绿书第一章    

### map & parseInt
```js
['10', '10', '10', '10', '10'].map(parseInt);
/*
map(value,index)
map('10',0) => 10 
map('10',1) => NaN 没有1进制
map('10',2) => 2 2^1
map('10',3) => 3 3^1
*/
``` 
map()把value和index暴露出来给了parseInt()处理       
parseInt(string, radix) 不能解析返回NaN     

### 对象判断
- typeof ：判断基本数据类型。特别地： (引用数据类型 & null -> object、function)
- instanceOf：判断判断一个对象是否是一个类的实例

### 引用 & 值复制 
对象分为基本数据类型和复杂数据类型，复杂数据类型具有引用关系，引用同一个地址，改变原来的值也会改变      
- 详细
  基础类型的内容直接存储在栈中（大小固定位置连续的存储空间），记录的是该数据类型的值，即直接访问，基础类型赋值是复制（copy）； 复杂类型将内容存储在堆中，堆所对应的栈中记录的是指针（堆的地址），外部访问时先引出地址，再通过地址去找到值所存放的位置。复杂类型赋值是地址引用


### var & let 定义
- var 作用全局，变量提升
- let 作用于块级，不允许覆盖，否则报错

### 编码
- escape：废弃
- encodeUrlComponent: 转义除了字母、数字、(、)、.、!、~、*、'、-和_之外的所有字符。
- encodeUrl: 一个URI是完整的URI，那么无需对那些保留的并且在URI中有特殊意思的字符进行编码
- decodeURI: 对encodeUrl编码过的url进行反解码


## 编程题

在线刷题node环境 引入readline处理输入   
```js
const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
rl.on('line', (line) => {
   console.log(solution(line));
})
```

- 有序数组 找到指定和的组合
  出现有序 -> 二分法 -> 双重循环(暴力破解)
```js
const maxLine = 3 // 只接收三行
let input = []
// 拿到输入数组开始求解
function solution(input){
  const arr = input[1].split(' ').map(e => parseInt(e));
  const sum = parseInt(input[2]);
  const len = arr.length;
  let i = 0; //头指针
  let j = len -1;  // 尾指针
  // 尾指针先走，依次和头指针相加，小于sum，头指针往后走；大于sum，说明尾指针指向结点大了，尾指针往前，头指针再往后走一遍；一直没有凑到sum，返回undefined
  // 固定条件 i < j 
  while(i < j) {
    let res = arr[i] + arr[j]
    if(res === sum) return `${arr[i]} ${arr[j]}`
    if(sum < res) { j-- }
    if(sum > res) { i++ }
  }
  return 'notfound'
}
rl.on('line', (line) => {
  input.push(line);
  if(input.length === maxLine) {
    console.log(solution(input));
    rl.close();
  }
})
``` 
- 括号匹配
 
- 跳台阶(斐波数列)
```js
// 在规定台阶数下，往后反推，都有两种走法
// 20 => 19的走法 + 1 || 18的走法 + 2
// 19 => 17的走法 + 2 || 18的走法 + 1   
// 以此类推，要知道19级的走法就要知道18级和17级的走法 类似于斐波那契数列 f(n) = f(n) + f(n-2)
// 。。。 
// 3 => 2的走法 + 1 || 1的走法 + 2
// 2 => 1的走法 + 1 || 2
// 1 => 1

function solution(step) {
  step = parseInt(step);
  function walk(n) {
    if ( n < 1 ) return 0;
    if ( n === 1 ) return 1;
    if ( n === 2 ) return 2;
    return walk(n-1) + walk(n-2);
  }
  return walk(step);
}
```
- 复数乘法
- 规格化日期字符串，判断该天是一年中第几天
```js
function isRun(year) {
  if(year % 400 === 0) { return true }
  return year % 4 === 0 && year % 100 !== 0
}
function solution(str) {
  const arr = str.split('-');
  const y = parseInt(arr[0]);
  const m = parseInt(arr[1]);
  const d = parseInt(arr[2]);
  // 不同的月份对应的天数，用map来保存这个映射关系
  const map = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if(isRun(y)) { map[2] = 29 };
  let res = 0;
  for(let i=0; i<m; i++){
    res += map[i]
  }
}
```
- 反转链表


