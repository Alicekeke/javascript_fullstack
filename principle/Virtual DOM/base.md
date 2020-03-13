# 真实的DOM树

  服务器传给渲染引擎的HTNL文件字节流是无法被渲染引擎理解的，要将其转化为渲染引擎能够理解的内部结构，就是DOM

  DOM有三个层面的作用
  页面：生成基础数据结构，JS脚本：
  1. 从页面的视角来看，DOM 是生成页面的基础数据结构。
  2. 从JS脚本视角来看，DOM 提供给JS脚本操作的API，通过这些API，JS 可以对 DOM 结构进行访问，从而改变文档的结构、样式和内容。
  3. 从安全视角来看，DOM 是一道安全防护线，一些不安全的内容在 DOM 解析阶段就被拒之门外了

HTML解析器：边加载数据，边解析数据为HTML文件，根据hreader字段的content-type判断是否分发渲染进程。

### 字节流 -> HTML 过三关
1. 通过分词器将字节流转换为 Token
2. 将 Token 解析为 DOM 节点
3. 将DOM 节点添加到 DOM 树中
  
  注意：的第二个和第三个阶段是同步进行的

  具体过程：
   需要通过分词器先将字节流转换为一个个 `Token`，分为`Tag Token` 和文本 `Token`
    `Tag Token` 又分 `StartTag`<>和 `EndTag`</>,HTML 解析器维护了一个`Token `栈结构, startTag 入栈，给一个DOM结点，加到DOM里，if 文本节点 不入栈，直接加到DOM树里；`EndTag`,解析完成，弹出栈，（有点类似算法题有效括号。。。）

  Q: 要是html代码内嵌了script脚本咋整？   
  A: HTML 解析器暂停工作，JS 引擎介入，并执行 script 标签中的这段脚本, 脚本执行完成之后，HTML接着执行。

  Q: 要是引入js文件咋整？
  A: 一样先暂停HTML解析器，执行 JS 代码，不过这里执行 JS 时，需要先下载这段 JS 代码，但JS文件的下载过程会阻塞DOM 解析，页面加载太慢了咋整？ Chrome做了很多优化，其中主要的优化是**预解析操作**。当渲染引擎收到字节流之后，会开启一个**预解析线程**，用来分析 HTML 文件中包含的JS、CSS 等相关文件，解析到相关文件之后，预解析线程会提前下载这些文件。

  Q: CSS怎么加载执行的？
  A: 如果代码里引用了外部的 CSS 文件，那么在执行 JS 之前，还需要等待外部的 CSS 文件下载完成，并解析生成 CSSOM 对象之后，才能执行 JS 脚本。而 JS 引擎在解析 JS 之前，是不知道 JS 是否操纵了 CSSOM的，所以渲染引擎在遇到 JS 脚本时，不管该脚本是否操纵了 CSSOM，都会执行CSS 文件下载，解析操作，再执行 JS 脚本。

   总结：
    JS 会阻塞 DOM 生成，而CSS文件又会阻塞JS 的执行（但不影响js加载，CSS也不阻塞DOM生成）  



# virtual DOM

  通过上面的分析可以看出来真实dom的操作实在是太费劲啦，老改真实DOM会触发回流，重绘等问题，简直是牵一发而动全身，所有就有了轻量级的虚拟DOM。 操作真实dom代价太大了，整个轻量级的副本。

### virtual DOM解决什么问题
  - 将页面改变的内容应用到虚拟 DOM 上，而不是直接应用到 DOM 上
  - 变化反映到虚拟 DOM 上时，虚拟 DOM 并不急着去渲染页面，而仅仅是调整虚拟DOM 的内部状态，操作dom的代价很小。
  - 在虚拟 DOM 收集到足够的改变时，再把这些变化一次性应用到真实的 DOM 上
  

### virtual DOM实现主要是三个步骤

   1. 用JS对象模拟DOM树element，
   2. 比较两棵虚拟DOM树的差异diff，
   3. 把差异应用到真正的DOM树上patch。

- 创建阶段。
  首先依据 JSX 和基础数据创建出来虚拟 DOM，它反映了真实的 DOM 树的结构。然后由虚拟 DOM 树创建出真实 DOM 树，真实的 DOM 树生成完后，再触发渲染流水线往屏幕输出页面。
- 更新阶段。
  如果数据发生了改变，那么就需要根据新的数据创建一个新的虚拟 DOM树；然后 React 比较两个树，找出变化的地方，并把变化的地方一次性更新到真实的DOM 树上；最后渲染引擎更新渲染流水线，并生成新的页面。

虚拟dom的替代方案： 虚拟dom也是一个JS对象，dom树上的属性可以很容易用js对象表示出来

```js
<ul id='list'>
  <li class='item'>Item 1</li>
  <li class='item'>Item 2</li>
  <li class='item'>Item 3</li>
</ul>


// 对应的js对象写法
var element = {
  tagName: 'ul', // 节点标签名
  props: { // DOM的属性，用一个对象存储键值对
    id: 'list'
  },
  children: [ // 该节点的子节点
    {tagName: 'li', props: {class: 'item'}, children: ["Item 1"]},
    {tagName: 'li', props: {class: 'item'}, children: ["Item 2"]},
    {tagName: 'li', props: {class: 'item'}, children: ["Item 3"]},
  ]
}
```
### 虚拟dom算法
- 用 JavaScript 对象结构表示 DOM 树的结构；然后用这个树构建一个真正的 DOM 树，插到文档当中
- 当状态变更的时候，重新构造一棵新的对象树。然后用新的树和旧的树进行比较，记录两棵树差异
- 把所记录的差异应用到步骤1所构建的真正的DOM树上，视图就更新了

- 模拟一个dom结点
```js
function Element (tagName, props, children) { //结点类型，属性，子节点
  this.tagName = tagName
  this.props = props
  this.children = children
}

module.exports = function (tagName, props, children) {
  return new Element(tagName, props, children)
}
```
  [虚拟dom的简单实现](https://www.yaruyi.com/article/2018-03-20-TJZD)

  虚拟dom可以渲染到多个平台，主要还是浏览器。

### React Fiber 更新机制
   Fiber reconciler（对账）[详解](http://www.ayqy.net/blog/dive-into-react-fiber/)


### 双缓存
  Virtual DOM 本质上就是在 JS 和 DOM 之间做了一个缓存（类似与cpu与主外存之间的Cache存储器），它会在完成一次完整的操作之后，再把结果应用到 DOM 上，这样就能减少一些不必要的更新，同时还能保证 DOM 的正常渲染。
  
### MVC模式
  model，view,controller。
  核心思想：数据与视图分离。
  视图改变，通知控制器，控制器再判断是否更新模型数据。
  重点在于各个模块之间的通信关系。