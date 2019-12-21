### 静态HTML文件中使用react

#### 加载cdn
```
    顺序不能乱
  <!-- react.js react顶级api -->
  <script src="react.js"></script>
  <!-- 添加特定于DOM的方法 -->
  <script src="react-dom.js"></script>
  <!-- JavaScript编译器 向后兼容es6语法 -->
  <script src="/babel-core/5.8.38/browser.min.js"></script>
  ```

#### 编写方法
- 程序入口：id=`demo` 在render方法中getElementById找到
- 由于babel要求，script脚本类型指定`text/babel`
- `React.createClass()`创建组件类；`getInitialState`返回一个初始状态下的对象
- `render()`模板转化为HTML语言，将写好的组件渲染到HTML的div中
- props：入参数据
- state 处理私有数据；使用`this.setState()`修改数据

####   JSX => javascript XML

#### 生命周期方法
#####  mounting: 正在挂载的虚拟dom到真实dom 
- getInitialState
- componentWillMount    :已经经历初始化，但未渲染dom
- componentDidMount     ：渲染完成，dom节点生成，可调用ajax、修改数据
#####  updating： 正在被重新渲染时
- componentWillUpdate   ：组件进入重新渲染流程
- componentDidUpdate  ：组件更新完毕
#####  unmounting：表示正在移除虚拟dom到真实dom
- componentWillUnmount  ：组件卸载、数据销毁

![react生命周期示意图](https://upload-images.jianshu.io/upload_images/16775500-8d325f8093591c76.jpg?imageMogr2/auto-orient/strip|imageView2/2/format/webp)