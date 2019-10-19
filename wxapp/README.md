## wxminiprograme

### 生命周期
页面 Page 实例的生命周期
![page生命周期](https://res.wx.qq.com/wxdoc/dist/assets/img/page-lifecycle.2e646c86.png)
### 新建页面
 每新建一个page,page路径都必须在app.json中注册，（删除需要自己去开发者工具中删除）

  wxml: 多个组件的集合，填充


  #### rpx
  px = 2rpx 
  iphone6的物理像素做标准（width:750rpx;  height:1134rpx ）
  ### 自定义组件
  组件：内置组件|自定义组件

  带样式，骨架的组件复用.

  json页面引用"usingComponents":{"componentsname":"path"} -> wxml使用 -> 页面实现

  #### 组件相关图片引入
  - 单个组件下新建image文件夹引用
  - 共有组件在Compontents文件夹下新建images文件夹引用
  - 根目录下的image放与page页面相关的图片
  ### 前端数据来源

  数据绑定："{{}}"双括号在html显示一个js定义的变量
 
  - 三元表达式 : 表达式 ? 条件1 : 条件2

  {{}}可用于许多组件中，包括许多属性中，eg: img与src
  #### 组件的封装，开放性
  决定哪些组件封装在内部，哪些开放出来


  