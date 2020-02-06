# 乐信2020校招笔试题

### 浏览器缓存，状态码    
http控制缓存开关字段：`cache-control`:通用消息头字段      
cache-control可以取不同的指令，指明被可以被哪种对象缓存。       
[mdn: cache-control](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Cache-Control)   

| 类别 |原因短语
:-:|-:|-:
| 1XX | Informational（信息性状态码）|	接受的请求正在处理
| 2XX	| Success（成功状态码）| 请求被正常处理完毕
| 3XX	| Redirection（重定向状态码）|	需要进行附加操作以完成请求
| 4XX	| Client Error（客户端错误状态码）| 服务器无法处理请求
| 5XX |	Server Error（服务器错误状态码）|	服务器处理请求出错

### 前端技术选型
动态化开发：weex & reactnative, 分别用vue和react开发app的框架。适用于开发   
flutter： flutter技术实现的app，不是hybrid app （原生 + h5）热更新。    
pwa： service-work：缓存 断网也能访问这个页面，应用添加到桌面 可通知。    
SPA：对到页面之间交互展示基本没有公共模块的流程，我们也推荐使用SPA的方式进行页面开发。    
内|外联js：   

### cookies，session，storage
- cookie保存在浏览器端，session保存在服务器端; 若未在浏览器设置cookies过期时间，浏览器关闭，cookies清除；       
- storage: localStorage（本地存储）和sessionStorage（会话存储）   
    1. localStorage生命周期默认永久的除非主动删除；sessionStorage关闭浏览器即销毁，且独立打开的窗口sessionStorage不一样；
    2. localStorage和sessionStorage都保存在客户端，不与服务器进行交互通信。
    3. localStoragese常用于长期登录（+判断用户是否已登录），适合长期保存在本地的数据。sessionStorage：敏感账号一次性登录； 

### 前端安全
- XSS: （跨站脚本注入）
- 图片验证码主要是防止非人为（爬虫）。
- CSRF（跨站请求伪造）: 
  防止CSRF攻击：token机制判断页面来源是否合法；google最新推出一个cookies属性: same-site。   

### 前后端分离
将当前页面的请求转发至指定的ip： 负载均衡     
设想一下，一个页面的请求超负荷，那么就需要将请求转换到另一台服务器上以分散请求压力。      
SPA：（single page application）动态的重写页面的部分与用户交互，从而避免过多的数据交换，响应速度更快，减少后端的压力，后端程序只需要提供API，不用管用户端是什么。缺点是首屏打开较慢、不利于SEO。    
SEO：（Search Engine Optimization）搜索引擎优化，通过了解搜索引擎运作规则提高自己的搜索排名。   

### 字符串方法
- chatAt(index)
- substr(start, size)
- substring(start, end): 

### 面向对象的三个特征
封装、继承、多态      

### 前后端通信  
XMLHttpRequest 、ajax、axios、fetch     
ajax和axios都是对XMLHttpRequest的另一种封装，但fetch是一个新的发请求的api，不基于任何东西，Promise风格操作。      

### 打包工具
grunt、gulp：任务流：js打包完 -> 图片压缩 -> 上线     
webpack：模块打包工具。     

### 域名系统
- 域名层级
    1. 顶级域名（.com / .cn）
    2. 二级域名 （baidu.com、jd.com、taobao.com...）
    3. 三级域名  (bbs.baidu.com、m.jd.com...)
 二级域名及其以上级别的域名，统称为子域名，不在“注册域名”的范畴中     
    eg：（https://mail.qq.com/）.com: .com顶级域名、qq.com二级域名、mail.qq.com三级域名。

### 合适的表单
- 前端检验（即时判断输入是否合法）错误提示说明
- 标签和输入框一一绑定
- 按tab能在不同的输入框之间切换
- 光标自动定位于输入框内
- 内容长度尽量与输入框对应
- 标记选填与必填项
- 填写完成后高亮submit键

### 编程题
- js面向对象描述 创建
- 数组转换字符串

```js
var a = ["welcome", "to", "Lexin", "!"];
var b = ["Let", "us", "make", "the", "future", "together", "!"]

function formatArr(...words) {
  return words.map((arr) => {
    return arr.join(' ')
  }).join('\n')
}

console.log(formatArr(a,b))
```