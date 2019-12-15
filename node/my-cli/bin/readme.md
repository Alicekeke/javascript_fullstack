## 搭建简易脚手架

1. 下载git模板文件
2. 配置文件
3. 生成操作，替换模板文件

### 用到的包
- `npm install commander -S` 脚手架读取相关终端输入
- `npm link` 模块链接到对应的运行项目中，自动配置环境变量
- `npm install download-git-repo -S`  根据用户输入下载对应的模板
- `npm i inquirer -S` 与终端用户交互
- `npm i ora -S` 终端loading效果
- `npm i handlebars -S` 模板引擎 模板内容字符串替换成用户输入的值
- `npm i metalsmith -S`  静态站点生成器，生成最终文件



### 3.文件操作
先生成一个临时文件，在模板（template handleBars）里面 先写好判断再通过metalsmith编译生成文件。可以看到mustache被解析替换了