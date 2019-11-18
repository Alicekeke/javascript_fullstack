### 百度AI
- npm init -y 初始化项目
- npm install baidu-api-sdk 下载node SDK依赖包
- 引入node内置fs模块 

#### 百度大脑sdk
- 大量数据构建好了训练模型 模型能够分辨出来 机器学习
- 百度智能云 申请创建应用 申请key
  
### 
- 引入包
- 读取图片 从内存 -> I/O流 需要花一些时间 异步操作 变同步
- 实例化 client对象，传入APP_ID, API_KEY, SECRET_KEY
- 使用carDetect方法 调用识图api
- promise.then() 使用try...catch 做错误处理


[看文档，超详细](https://ai.baidu.com/docs#/ImageClassify-Node-SDK/top)