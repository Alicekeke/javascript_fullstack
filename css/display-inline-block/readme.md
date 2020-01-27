## inline（行内元素）
- 使元素变成行内元素，拥有行内元素的特性，即可以与其他行内元素共享一行，不会独占一行. 
- 不能更改元素的height，width的值，大小由内容撑开. 
- 可以使用padding上下左右都有效，margin只有left和right产生边距效果，但是top和bottom就不行.
- 常见行内元素：`<span>、<input>、<a>、<label>、<img>、<textarea>`等。

## block 块级元素

- 每个块级元素都从新的一行开始，并且其后的元素也另起一行。（很霸道，一个块级元素独占一行）
- 元素的height、width、padding，margin的各个属性值都可以设定，top，left，bottom，right都能够产生边距效果.
- 在不设置自己的宽度的情况下，块级元素会默认填满父级元素的宽度
- 常见块级元素：`<h1~6>、<div>、<p>、<form>、<table>、<ul>、<ol>、<li>、<dl>、<hr>、`等。

# inline-block 行块级元素

同时具备内联元素、块状元素的特点。结合了上述inline的第1个特点和block的第2个特点.
- 和其他元素都在一行上
- 元素的高度、宽度、行高以及顶和底边距都可设置。

## display: inline-block的问题
inline 内联元素 带有文字属性 会自带间隔
代码中的换行也会产生文本节点(text)
- css渲染规则
    连续的空格合并为一个空格
    任何代码在body都会被解析成不同的节点类型 包括注释 `node.nodeType`的`Number`值对应不同类型的节点类型常量

解决方法：
1、既然是text文本节点 父容器font-size设为0 空格即不存在，不能影响原本要渲染的文本，font-size设为0
2、压缩代码 除去空格

## display: inline-block与浮动
1. 对元素设置display：inline-block ，元素不会脱离文本流，而float就会使得元素脱离文本流，且还有父元素高度坍塌的效果
2. 对父容器中两个子容器使用float：left时，父元素会高度坍塌，所以要清除浮动，对box使用overflow：hidden
3. 浮动的局限性在于，若要元素排满一行，换行后还要整齐排列，就要子元素的高度一致才行，不然就会出现参差不齐的效果，而inline-block就不会。
   
## 清除浮动的几种方法
1. 在浮动元素后面添加 class 为 clear 的 空 div 元素，给这个 div 设置样式`.clear{clear:both;}`
2. 浮动元素后面右一个不为空的 div 元素，我们直接为这个元素添加 `clear：both` 样式
3. 给父容器添加 `overflow:hidden `或者 auto 样式
4. 给父容器添加 clearfix 的 class ，用 伪元素 `clearfix：after `来设置样式，清除浮动
## 使用场景
- 对于横向排列容器来说，更倾向与使用inline-block来布局，因为这样清晰，也不用再像浮动那样清除浮动，害怕布局混乱等等。
- 对于浮动布局就用于需要文字环绕的时候，毕竟这才是浮动真正的用武之地，水平排列的是就交给inline-block了。
  
[mdn的nodetype详解](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/nodeType)