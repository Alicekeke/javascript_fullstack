# 字节跳动效率工程面试题

[原文链接](https://www.nowcoder.com/discuss/337035)

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
stack: 
task:
microtask:

5. bind实现特定功能



6. 找到n个数和为sum

解算法题：回溯法：从很多选项里面找到满足条件的那个选项。    
又称为试探法，按选优条件向前搜索，以达到目标。但当探索到某一步时，发现原先选择并不优或达不到目标，就退回一步重新选择，使用深度优先搜索策略进行遍历，这种走不通就退回再走的技术为回溯法。

  