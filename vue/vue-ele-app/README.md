# vue-ele-app

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

--------------------------------
# 自己的笔记
---------------------------
# 合并两个对象
  Object.assign({}, this.seller, res.data.data)


# 父组件给子组件传递数据
  <v-header :abc="seller"><-header>

# 子组件接收父组件传来的数据  
  <script>
    export default {
      props: ['abc']
    }
  </script>
### html绑定class出现数组下标为零的空对象 TypeError（父组件还没传值过来）
  v-if 判断传值对象数组是否为空 空则不显示
  ` v-if="seller.supports"`

箭头不用自己写，在iconfont里找svg和下载样式
行内标签直接设置宽高不生效 设为行内块级标签
 左右拦腰对齐 :  vertical-align middle

 ### vue官方transition

 > 全屏
 针对手机屏幕全屏：fixed定位，上右下左全屏拉扯100%

 > 虚化
 backdrop-filter 背景色虚化

 > v-for 
 v-key 放唯一标识
 `v-bind:class="classMap[seller.supports[0].type]"`按添加类名标识优惠图片

/**解决带文字特性的margin问题 */
 &-wrapper
      width 100%
      min-height 100%     /*内容超出，就滚动，最小100%*/
           .line
          border-bottom 1px solid rgba(255, 255, 255, 0.2)
          flex 1 /*1:1:1平等继承父容器宽度*/
          position relative /*相对自己原来得到位置向上*/
### bfc

  &.router-link-active
        color rgb(240, 20, 20)//判断解析后添加的router-link-active类名 a标签点击变红

## 配置页面，App.vue引入路由
goods作为首页，/# 和 /goods都要在路由中注册

在生命周期created用$https: 封装在vue原型链上的axios获取到数据
axios封装了axios的promise.then()
concat: 数组拼接
assign：对象拼接

- 根据数据源中type值 设类名显示icon


-   flex 0 0 80px 自占80px,不管手机宽度变多大，我只要80px,剩下都给其他同级容器
-   　display的table和table-cell
-   放icon
  classMap放icon类名数组，在html里v-bind绑定item.type对应到classMap中下标对应的那个类名
  需要加图片的type大于零，直接用v-if判断

- better-scroll : vue 滑屏插件
  vue获取容器dom结构 ref="驼峰" 在mount挂载后才能看到dom结构

- ref可以类似得到dom结构，但源码没有真正实现拿到dom

- 菜单联动
  左侧用better scroll
  右侧
  取整，取绝对值

- 组件引入 (样式组件不用配路由)
- 引入 在要使用页面 script中import组件vue文件
- 声明 components声明 在页面按定义的标签引入
- 样式 
  

- 购物车数量加减
vue中用transition标签包裹动画效果

父组件子组件传值 :v-bind
子组件接受父组件值 props对象形式接受
js 原生 $set 修改数据源

js事件流 捕获 冒泡 先执行捕获 再执行冒泡
dom嵌套 父子级dom执行两种不同的事件要阻止冒泡
@click.stop.prevent="方法名"：阻止默认事件冒泡

- 兄弟组件之间的传值
  先给父组件，传值给兄弟组件
  组件 ：高复用，有自己的特性
  this.$emit() 相当于发散式信号塔，将页面上的数据传递给别人
  任何一个事件都有事件参数, 里面包含很多可用的事件值

  forEach是数组独有的方法
  computed 实时更新的方法
  default必须用函数的格式来写

  goods.vue是app.vue的路由组件
  通过路由入口传值

  遍历的goods和foods要分清
