- 云函数配置
- dist UI框架，放在page页面，其他原来的page文件夹删光
- 配置tabberBar

#### 如何在小程序中引入ui组件
[引入vant-weapp](https://youzan.github.io/vant-weapp/#/intro)

 "usingComponents"：{
   分别引入，给上路径，再在页面中用标签的方式引入
 }

 js 引入全局组件，手动import

 > 有点像暑假写过的旧岛，它是手写组件，页面内引用

transition: 触发事件，设置过度动画效果
show:{{}} 字段设为true

云开发控制台新建集合

在cloudfunction中新建对应数据库操作事件
在js文件中 

1. 指明云函数环境id `const env = '环境id'`
2. 获取数据库句柄(指定环境id) `const db = cloud.database({env})`

对应增删改查操作
 return await db.collection('数据库集合').add({})

云函数改变必上传部署

 ## 坑
 img && image标签不一样
 bindtap="" 是等号
 微信标签自定义属性 data-

 不同数据库字段名对应，别打错了
 
