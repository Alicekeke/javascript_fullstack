## 跨域
浏览器的安全策略：两个服务器需要通信需要遵守同源策略    
同源才会让你发出请求    
不同源 就产生跨域，比如   
1、请求协议http,https的不同   
2、域domain的不同   
3、端口port的不同   

- 加一个响应头    
  `cross-origin-resource-share`   
  正统的前端跨域解决方式：一个规范，允许服务器申明那些源可以访问      
  怎么申明？'Access-Control-Allow-Origin': '*' ，同意任意跨源请求   


- 告诉后端我的请求合法--构造一个请求头    

```
//content-type在前后端都可以设置 前端以新建Headers以append的方式追加
  res.writeHead(200, {
'content-type': 'application/json',
'Access-Control-Allow-Origin': '*', //同意任意跨源请求
'Access-Control-Allow-Headers': 'X-auth, content-type'//该次请求的自定义请求头
'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',//请求方式
'Access-Control-Allow-Credentials': true/false          //是否允许cookies传输
})
```

解决跨域两种常见的方法 **CORS,JSONP**

### CORS   
cross-origin-resource-share   
一个规范，允许服务器申明那些源可以访问    

#### 请求的步骤   
1. 简单请求：直接发起跨域请求 只能head，get，post   
2. 复杂请求：先发起一个预检（preFlight）请求，预先试探一下服务端支不支持跨域，之后才会发起正式的跨域请求    
   简单请求：表单编码方式那三种，超过那三种即为非简单请求   
   前后端要约定好传来的数据以什么方式传递     

### JSONP    
  当我们请求外部资源以link script img 时 不受同源策略的影响     
  刚好JSON的纯字符数据格式可以简洁的描述复杂数据，并且的是JSON还被js原生支持 
     
 **jsonp的原理** ：通过script标签引入一个js文件，这个js文件载入成功后会执行我们在url参数中指定的函数，并且会把我们需要的json数据作为参数传入     

   script加载回来的东西被当做js执行     
   jsonP返回的是字符串。是前端预先定义好传给服务端的回调  
  ```
  //前端
   function getBook(res) {
      console.log('得到请求结果', res);
    }
  //后端
  // json对象转化为字符串作为参数塞到getBook的方法参数中，end响应结束返回内容
  res.end(`getBook(${JSON.stringify({bookName: 'js'})})`)
  ```   
缺点：它只支持GET请求而不支持POST等其它类型的HTTP请求；它只支持跨域HTTP请求这种情况，不能解决不同域的两个页面之间如何进行JavaScript调用的问题。       


[阮一峰老师 跨域资源共享 CORS 详解](http://www.ruanyifeng.com/blog/2016/04/cors.html)   
[jsonp原理详解](https://blog.csdn.net/hansexploration/article/details/80314948)   

- console.log可能是异步的 或者惰性的
  console.log(JSON.stringify(obj)) -- node中可以正常显示