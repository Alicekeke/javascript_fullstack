### restful web API
URL: Universal Resource Location
解析restful API 解析url

#### 配置json-server并启动的知识点流程
` npm init -y ` :初始化node项目
` npm install json-server` : 安装json-server（应该全局安装，疏忽了）
scripts: 添加脚本命令  使用npm run运行  钩子函数
` json-server` 搭建本地的数据接口，创建json文件，便于调试  可以在一个url上将json文件向外暴露
 ` "dev": "json-server --watch db.json --port 1111" `在1111端口获得api服务，监控db.json的变化 更新1111端口数据
` npm run dev `: 打开端口
`http://localhost:1111/posts `：访问到1111端口使用POST方式得到的db.json数据

 \{^_^}/ hi! 好可爱


[json restful的GitHub地址](https://github.com/typicode/json-server)
- 语义化的url
:1111/posts/id :按id名获取文章详情
:1111/posts?id= :get方式模拟接口参数可筛选该目录下内容

#### 使用postman模拟请求

x-www-form-unlencoded:  修改表单 -> 选择发送方式
[一个很全面的postman使用教程](https://www.jianshu.com/p/97ba64888894)


#### 请求方式 
- GET: 明文访问 表单的数据显式地放在URL
- POST: 新增数据，
- PUT: 覆盖性修改数据，适用老对象该新对象
- DELETE: 删除数据
- PATCH：部分修改
- : 8080 live-server 启动web页面。
  : 1111 这个端口启用了后端API。    不同的端口代表了不同的服务


 #### bootstrap快速开发页面
 引入cdn
 bootstrap 固定类名
 container 最外层容器  bootstrap 默认弹性布局
 一行十二列 列与列之间关系快速构建栅格系统
 eg: col-md-6：占6/10
 使用bootstrap组件

#### 获取数据资源渲染在页面

页面是用来包裹资源的, 获取资源，渲染资源

- 使用fetch在页面上获取到数据
``` fetch('http://localhost:1111/posts').then(data => data.json()).then(data =>{console.log(data)})
     请求资源 es6用fetch(默认get)请求数据   http请求是一个文件传输的请求 二进制流
    .then(data => data.json())获取到json文件中数据，.then(data =>{console.log(data)}接住数据并进行相应的数据处理
```
- data.map(item)
  关于map在[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map)上的解释
>  map() 方法创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果。

使用map方法会产生一个新的数组，数组的每一项就是我们return出去的值（所以map方法必须有返回值，如果没有return，那么新数组的每一项都为undefined），数组的个数与原数组一样。在这里的data.map将json数组中的item遍历后用return产生新数组并用字符串模板拼接html为对应带数据的dom结构

-  将一个数据数组(json) 变为你想要的数组形式(html)

` document.getElementById('cards').innerHTML = htmlArr.join('')`
标准做法 ：htmlArr数据数组拿到data.map()返回的数组， 使用join拼接成一块完整的HTML字符串并使用innerhtml插入到完整的dom中




