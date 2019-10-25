## http
协议  
客户端，服务端  
客户端请求报文： 
1. 请求行（方法 路径 版本），eg（GET /simple.html HTTP/1.1）
2. 请求头
3. 请求正文
   
服务端响应报文： 
1. 响应行（版本号 状态码 状态文本）eg（HTTP/1.1 200 OK）
2. 响应头：响应文件基本信息
3. 响应报文

URL: 统一资源定位符 
URL基本格式：协议名://主机名/路径/文件名  

- 引入node包 https  
发请求  
node语言风格：回调,流的形式传输，不是一次传完,需要每一次得到都进行一次拼接  
res.on('data',() => { })  
res.on('end',() =>{ })  
拿到网页源代码，需要进行解析，拿到需要的数据  
npm i cheerio --save (用cnpm成功) 
cheerio可以像jquery一样操作字符串 

在写好的过程化代码改为回调  
**回调非常重要！**  要理解回调  

- 展示数据  
新建index.html展示获取到的信息，使用fetch处理 
引入http包  
http.createServer() 创建生成一个http服务 创建完成后监听端口   
回调调用doubanSpider爬取    

res.writeHead()编写响应头   
mime 类型：指定一些端文件的打开方式 eg：(text/plain-> 纯文本)  

爬取到的数据先拼装为数组    
res.end(JSON.stringify(data),json转为字符串 因为end要求必须为字符串   
res.writeHead/res.end 每次都带res 不支持链式调用    

- 堆砌页面  
res => res.json()格式化数据   
map、join 得到dom结构、map循环遍历返回新数组 数组映射、es6模板拼接为字符串、innerHtml插入拼接好的字符串到dom中  