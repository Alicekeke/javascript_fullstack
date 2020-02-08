# 字节跳动效率工程面试题

[原文链接](https://www.nowcoder.com/discuss/337035)

## 一面
1. HTML+CSS
- 屏幕中间有个元素A，随着屏幕宽度的增加，始终需要满足以下条件：
  1. A元素垂直居中于屏幕；
  2. A元素距离屏幕左右边距各10px；
  3. A元素里面的文字“A”的font-size:20px；水平垂直居中；
  4. A元素的高度始终是A元素宽度的50%；（如果搞不定可以实现为A元素的高度固定为200px;）

solution: 1、2要求垂直居中且有marign，则垂直居中的方案选择弹性布局。
4: 要求高是宽的50%，可以用padding撑开，因为**padding百分比相对于宽度来计算**，padding可上下各占25%即撑到中间。
A元素的高度还包含了其文字的高度，可以再套一层容器，高度设为0，给上下padding让其元素撑开。

```html
 <div class="out">
   <div class="in">
    A
   </div>
  </div>
```
```css
  * {
      padding: 0;margin: 0;
    }
    body{
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;    
      /* vh=(view height) vw=(view width) 相对于视口的尺寸，1vh = 1/100 of view height*/
      width: 100vw;
    }
    .out {
      background-color: blue;
      width: 100%;
      margin: 0 10px;
      font-size: 20px;
      text-align: center;
      /* padding: 25% 0;   padding百分比相对于宽度来计算 */
    }
    .in {
      height: 0;
      padding: 25% 0;
    }
```

2. 类数组
arguments: 类数组，不是真正的数组
转换为真正数组的方式： 
```js
  - [...arguments]
  - Array.prototype.slice(arguments, 0)
  - Array.from(arguments)
```
3. 类型转换

```js
if([] == false)    //空数组toString转换为空字符串; Number('') = 0; flase = 0 所以[] == false 为true
if({} == false)   //报错
if( [] )       //flase 
if([1] == [1])  // flase
```
- == （非严格相等）：比较两个值是否相等，在比较前将两个比较值转换为相同类型（toString()方法转换）。
- === （严格相等）：比较值，比较前不隐式转换。
调用顺序： [].toString => Number() 
> 两个对象进行比较时，自动将== 变为 === ，对象即使里面的值相等，内存地址不一样，false。

[mdn js中相等性判断](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Equality_comparisons_and_sameness)

4. 事件轮询
  
```js
async function async1() {
console.log('async1 start');
await async2();
// 后面等待await执行完再执行，异步
console.log('async1 end');
}
async function async2() {
console.log('async2');
}
console.log('script start');
setTimeout(function () {
console.log('setTimeout');
}, 0);
async1();
new Promise(function (resolve) {
console.log('promise1');
resolve();
}).then(function () {
console.log('promise2');
});
console.log('script end');
```

new 是同步操作，await后面的代码等待执行 Promise.then
stack: [script start, async1 start, async2, promise1, script end]
task: [setTimeout,]
microtask: [await async2(), resolve();]

先执行同步任务，再清空所有的微任务，再从宏任务里取出一个任务执行，如果取出的这个宏任务里有微任务，则再一次性执行完这些微任务。
故执行顺序是：script start, async1 start, async2, promise1, script end, async1 end, promise2, setTimeout.

5. this考点：以最小改动解决以下代码的错误（可以用es6）。
```js
const obj = {
      name: " jsCoder",
      skill: ["es6", "react", "angular"],
      say: function () {
        for (var i = 0, len = this.skill.length; i < len; i++) {
          setTimeout(function () {
            console.log('No.' + i + this.name);
            console.log(this.skill[i]);
            console.log('--------------------------');
          }, 0);
          console.log(i);
        }
      }
    };
    obj.say();
```
   1. setTimeout里面的回调是指向window的，替换为es6的箭头函数`setTimeout( () => {} )`
   2. 定义循环变量i要用let块级作用域，否则i会循环为最后的值才执行回调函数。
箭头函数默认指向定义它时，所处上下文的对象的this指向。即ES6箭头函数里this的指向就是上下文里对象this指向，偶尔没有上下文对象，this就指向window，即使是call，apply，bind等显式绑定方法也不能改变箭头函数this的指向。
在这里，obj调用了say方法，this指向直接调用者obj，setTimeout箭头函数，this指向最近的函数的this指向，即也是obj。
 
6. 实现ES5中Function原型的bind方法， 使得以下程序最后能输出'success'
```js
function Animal(name, color) {
 this.name = name;
 this.color = color;
}
Animal.prototype.say = function () {
 return `I'm a ${this.color} ${this.name}`;
};
const Cat = Animal.bind(null, 'cat');
const cat = new Cat('white');
if (cat.say() === 'I\'m a white cat' && cat instanceof Cat && cat instanceof Animal) {
 console.log('success');
}
```


7. 找到n个数和为sum

回溯法：从很多选项里面找到满足条件的那个选项。        
又称为试探法，按选优条件向前搜索，以达到目标。但当探索到某一步时，发现原先选择并不优或达不到目标，就退回一步重新选择，使用深度优先搜索策略进行遍历，这种走不通就退回再走的技术为回溯法。      

采用递归，记录当前值，且能一直向下走。      

```js
// temp保存当前数字的组合
// [1,2,3] = temp
// [1,2,4] = temp
function getAllCombine(array, n, sum, temp) {
  if(temp.length === n) {
    if(temp.reduce((a,b) => a + b) === sum) {
      return temp
    } 
    return false
  }
  // 递归
  for(let i = 0; i < array.length; i ++) {
    // 当前固定住的一个数
  const current = array.shift()
  temp.push(current)
  // 在这里要再次组合 递归调用
  let result = getAllCombine(array, n, sum, temp)
  if(result) {
    return result
  }
  temp.pop()
  array.push(current)
  }
}
console.log(getAllCombine([1, 2, 3, 4, 5, 6], 3, 15, []))
```

## 二面
1. 代码运行结果
```js
   var a = function () { this.b = 3; }
   var c = new a();
   a.prototype.b = 9;
   var b = 7;
   a();
   console.log(b);
   console.log(c.b);
```
谁调用this，this指向谁，a运行调用this指向a所在的全局全局的b覆盖7变成3；new得到c是a的一个实例，存在b属性指向全局，所以c.b也是3

2. js继承如何实现
   - 原型链继承
    `Child.prototype = new Parent()`
    可以沿着原型链，继承父类的方法


   - 原型式继承
    ```js
    function create(obj) {
      //一个暂时的js对象，返回一个暂时的实例副本
     var F = function() {}
     F.prototype = obj;
     return new F();
    }
    Child.prototype = create(Parent.prototype);
    //es6标准化后官方推出 Object.create()
    ```

    
   - 寄生组合继承  `extends`
    ```js
    //继承属性
    function Child1() {
     Parent1.call(this);
    }
    function create(obj) {
      var F = function() {}
      F.prototype = obj;
      return new F();
    }
    //继承方法
    Child.prototype = create(Parent.prototype);
    Child.prototype.constructor = Child
 ```

 3. repeat 实现，使用JS实现一个repeat方法，调用这个 repeatedFunc("hellworld")，会alert4次 helloworld, 每次间隔3秒     
   函数式编程，处理函数，高阶函数，输入是一个函数，返回也是一个函数   

   ```js
   function repeat(func, times, wait) {
    return (...rest) => {
      for (let i = 0; i < times; i++) {
        setTimeout(() => {
          func(...rest)  //参数打包丢给func处理
        }, wait * i)
      }
    }
   }
   const repeatFunc = repeat(alert, 4, 3000)
   repeatFunc('helloworld')
   ```

hash表结构，解决冲突的办法，hash函数有什么类型?
### 哈希表

哈希表（Hash table，也叫散列表） 是根据键（Key）而直接访问在内存储存位置的数据结构。

它通过计算一个关于键值的函数，将所需查询的数据**映射**到表中一个位置来访问记录，这加快了查找速度。这个映射函数称做 **散列函数**，存放记录的数组称做散列表. 哈希表存储的是键值对，其查找的时间复杂度与元素数量多少无关，哈希表在查找元素时是通过计算哈希码值来定位元素的位置从而直接访问元素的，因此，哈希表查找的时间复杂度为O（1）。   

但是就像“人无完人”一样，哈希查找也有缺点，会产生冲突，而冲突是无法避免的，我们只能说尽可能的减少冲突来优化哈希表并且要解决冲突。（99%）

###  哈希函数
- 直接定址（寻址）法: 取关键字的某个线性函数值为散列地址 如f(key) = a·key + b(a、b是常数)
- 平方取中法：{421，423，436}，平方之后的结果为{177241，178929，190096}，那么可以取中间的两位数{72，89，00}作为Hash地址。
- 折叠法：将关键字拆分成几部分，然后将这几部分组合在一起，以特定的方式进行转化形成Hash地址。假如知道图书的ISBN号为8903-241-23，可以将address(key)=89+03+24+12+3作为Hash地址   

### hash 碰撞
- 开放定址法： 关键字{12，13，25，23，38，34，6，84，91}，Hash表长为14， Hash：address(key)=key%11，当插入12，13，25时可以直接插入，而当插入23时，地址1被占用了，因此沿着地址1依次往下探测(探测步长可以根据情况而定)，直到探测到地址4，发现为空，则将23插入其中。     

- 链地址法：

参考：[简书](https://www.jianshu.com/p/de33dc676a3f)

## 三面

1. 模式匹配
   正则：1234567890 -> 1, 234, 567, 890       
   // \b: 是单词边界，具体就是\w ([0-9 a-z A-Z ]) 和 \W (排除字符组[^ 0-9 a-z A-Z ]的简写形式) 之间的位置     
   // \B即\b的反面，非单词边界。例如在字符串中所有的位置中，扣掉\b, 剩下的都是\B的。      
    答案：` /\B(?=(\d{3})+(?!\d))/g`

2. 浏览器的缓存策略
   - service-work     
    安装 -> 激活 -> 监听      
   - http 缓存

3. 跨域问题
  - cors

```js
app.use(async (ctx, next) => {
  // 允许来自所有域名请求
  ctx.set("Access-Control-Allow-Origin", "http://localhost:59243");
  // 这样就能只允许 http://localhost:8080 这个域名的请求了
  // ctx.set("Access-Control-Allow-Origin", "http://localhost:8080"); 

  // 设置所允许的HTTP请求方法
  ctx.set("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE");

  // 字段是必需的。它也是一个逗号分隔的字符串，表明服务器支持的所有头信息字段.
  ctx.set("Access-Control-Allow-Headers", "X-custom, content-type");

  // 服务器收到请求以后，检查了Origin、Access-Control-Request-Method和Access-Control-Request-Headers字段以后，确认允许跨源请求，就可以做出回应。


  // 该字段可选。它的值是一个布尔值，表示是否允许发送Cookie。默认情况下，Cookie不包括在CORS请求之中。
  // 当设置成允许请求携带cookie时，需要保证"Access-Control-Allow-Origin"是服务器有的域名，而不能是"*";
  ctx.set("Access-Control-Allow-Credentials", true);

  // 该字段可选，用来指定本次预检请求的有效期，单位为秒。
  // 当请求方法是PUT或DELETE等特殊方法或者Content-Type字段的类型是application/json时，服务器会提前发送一次请求进行验证
  // 下面的的设置只本次验证的有效时间，即在该时间段内服务端可以不用进行验证
  ctx.set("Access-Control-Max-Age", 1000 * 60 * 60);
  await next();
})
```
  - jsonP
  后端传回的数据塞到src参数中，让前端拿到数据     

4. 性能检测 [你的页面为什么慢，Performance Timeline 简介](https://juejin.im/post/5df3575751882512302db3d5#comment)


5. 数组和链表的区别
   数组是一种线性表数据结构，一组连续的内存空间     
   链表它并不需要一块连续的内存空间，通过 next 指针 把各部分连起来，和数组相比,链表更适合插入、删除操作频繁的场景       
   [图文详解](https://www.cnblogs.com/klyjb/p/11237361.html)

6. 浏览器渲染过程
   - 李兵老师的浏览器原理
   - [猛哥博客](https://github.com/MengZhaoFly/blog/issues/26)