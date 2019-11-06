## node发邮件
用到的包 --  http, fs, url, nodemailer    

要实现前端页面注册发送验证码，核对验证码
注册成功后，展示一个成功的html，并打印出提交的内容    

##### http报文格式 / url格式 
- http 超文本传输协议
  请求行    请求头    请求体      
- url 统一资源定位符
  协议://用户名:密码@子域名.域名.顶级域名:端口号/目录/文件名.文件后缀?参数=值#标志    


##### 前端表单提交    
  表单注册的提交方法一般为POST; enctype="text/plain" 编码方式，以纯文本形式提交   
  `document.forms['registerform']['email'].value`   
  document可以取到html所有的元素，用这种沿着dom的方式可以层级取到表单项的值      
  fetch发请求 转json    


##### 解析url   
```
const urlModule = require('url')    
const urlObj = urlModule.parse(url)   
 ```
结合split('=')切割url数组 拿到url体中 ‘=’发送后的值   
urlObj.pathname获得URL的path，类似 '/css/bootstrap.css':    
获得URL的path，类似 '/css/bootstrap.css':   


##### fs
  req res 两个对象 继承了 流Stream 和 事件Event   
 ` fs.createReadStream('./register.html').pipe(res)`    
   将register文件流导向response；createReadStream返回一个数据流，response是响应头，pipe是将两个数据流连接起来   


##### 中文乱码
  ` res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})` 每次返回请求需要设置utf-8字符集    


##### 开启POP3/SMTP服务   
登录qq邮箱，设置 -> 账户 开启pop3/SMTP    
专门用来开启第三方的邮件服务    


##### 使用nodemailer 
1. 安装：cnpm i nodemailer -S   
2. 编写发送邮件的js文件   
   设置邮箱配置transport，设置邮箱配置，编写响应请求头，向服务端发送数据，后端匹配url把POST方法获得的表单数据打印在页面上   