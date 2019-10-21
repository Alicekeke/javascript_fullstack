#### 首页
- swiper轮播运用
- swiper轮播图 父子容器都占满100%宽
- 页面定位，浮动
- 页面路由跳转的方式
- navigator 包裹标签页跳转
- 注意标签层级嵌套
- rpx 与 px rpx = 0.5px
#### 分类页面
- bindtap绑定（阻止冒泡cash）
- 双层循环拿到数据源
- 点击索引绑定数据 添加类名 三目运算符
- wx:for || wx:key || index || item 的使用 添加自定义类名
- 双层循环wx:for-item="自定义需要循环的数组名"
- scroll-view页面滚动跳转
  1. scroll-into-view 定位滚动到的 某子元素id
  2. scroll-with-animation 动画过渡效果
- scroll-view微信小程序菜单左右联动
  1. 计算右边的页面高度 min-height
  2. 左边菜单添加scroll-into-view ,右边菜单添加bindscroll
  3. boundingClientRect布局位置的查询 返回节点信息
#### 购物车页面
- 路由跳转传参到详情页或订单页
- 购物车全选，与非全选，选单项，取消单项，单项与全选的逻辑处理
- 购物车选择不同项，icon图标在wxml是否选中，价格加减
- bindtap绑定多个逻辑函数的处理
- **小程序修改数组的方法**
- 判断页面状态，绑定数据
- 数据源驱动页面，mvvm，数据到位，改变视图
#### '我的'页面 && 填写地址
- 各种原生组件：button、form、open-data
- 取input中的值: 
  1. 微信将value放在event.detail中，可先console.log打印出查看数据结构再取
  2. bindinput 绑定事件传回event
- 小程序本地存储
 1. 存：wx.setStroge:数据存储在本地缓存指定的 key中，
 2. 取：wx.getStroge:本地缓存中异步获取指定 key 的内容,成功则取出success回调
- showModal：提示对话框


#### 未完
- 添加购物车
- 分类滑屏左右联动
- 详情页面跳转（组件）