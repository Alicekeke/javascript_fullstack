# cookies session

cookies和seession出现于来源于最早的web交互需求（论坛，在线购物网站等），需要记住客户端登录是谁，谁往购物车上加入了什么商品，即我们需要把每一个人区分开。

由于http的无状态特性，所以必须需要加点东西，那就是cookies和session

## cookies

cookies最早是网景公司的前雇员Lou Montulli在1993年3月的发明。Cookie是当你浏览某网站时，服务器存储在你机器上的一个小文本文件，再次来到该网站时，网站通过读取Cookie，得知你的相关信息，就可以做出相应的动作

cookies大小不超过4k，数量不多于20个，只能存ASCII，它保存在客户端，每个网站都可以有自己的cookies，但每个网站只能读取自己的cookies。

### cookies数据传递

Cookie是利用网页代码中的HTTP头信息进行传递的，浏览器的每一次网页请求，都可以伴随Cookie传递。它记住曾经访问的用户信息。

http request：浏览器向服务器发起的**每一个**请求都会带上cookie（第二次请求带上之前保存在客户啊短的cookies）：
```
Host: www.example.org
Cookie: foo=value1;bar=value2
Accept: */*
```

服务器将Cookie添加到网页的HTTP头信息中，伴随网页数据传回到你的浏览器，浏览器会根据你电脑的Cookie设置选择是否保存这些数据。

如果浏览器不允许Cookie保存，则关掉浏览器后，这些数据就消失。

http response: 服务端给浏览器的返回可以设置cookies
```
HTTP/1.1 200 OK
Content-type: text/html
Set-Cookie: name=value
Set-Cookie: name2=value2; Expires=Wed,09 June 2021 10:18:32 GMT
 
(content of page)
```
### cookies相关属性
  - name 
  - value 
  - expire ：设置cookies过期时间
  - max-age: cookies失效前需要经历的秒数
  - domain： 指定了 Cookie 可以送达的主机名。假如没有指定，默认值为当前文档访问地址中的主机部分（但是不包含子域名）
  - path：指定了一个 URL 路径，这个路径必须出现在要请求的资源的路径中才可以发送 Cookie 首部
  - secure：仅被https加密才能发送
  - httponly：仅http访问，防止客户端脚本通过 document.cookie 等方式访问 Cookie，避免xss攻击
  - SameSite：(新特性)让 Cookie 在跨站请求时不会被发送，从而可以阻止跨站请求伪造攻击（csrf）取值（strict（请求方必带cookies），Lax（允许部分第三方请求携带cookies），None（都发cookies））

### cookies的生命周期

Cookie有一个Expires（有效期）属性，这个属性决定了Cookie的保存时间，服务器可以通过设定Expires字段的数值，来改变Cookie的保存时间。如果不设置该属性，或设为0，那么Cookie只在浏览网页期间有效，关闭浏览器，这些Cookie自动消失。

### cookies的应用场景

- 会话状态管理（如简化登录、购物车、游戏分数或其它需要记录的信息）
- 个性化设置（如用户自定义设置、主题等）
- 浏览器行为跟踪（如跟踪分析用户行为等）


## session

Session 代表着服务器和客户端一次会话的过程。Session 对象存储特定用户会话所需的属性及配置信息。这样，当用户在应用程序的 Web 页之间跳转时，存储在 Session 对象中的变量将不会丢失，而是在整个用户会话中一直存在下去。当客户端关闭会话，或者 Session 超时失效时会话结束。

与cookies不同的是，session是以**服务端**来保存状态的，记住正在访问的用户信息，整个网站的所有页面都可以访问。

### session机制

当客户端请求创建一个session的时候，服务器会先检查这个客户端的请求里是否已包含了一个session标识 - sessionId

- 如果已包含这个sessionId，则说明以前已经为此客户端创建过session，服务器就按照sessionId把这个session检索出来使用（如果检索不到，可能会新建一个）
- 如果客户端请求不包含sessionId，则为此客户端创建一个session并且生成一个与此session相关联的sessionId
  
保存sessionId的方式大多情况下用的是cookie


### 常用场景：
  
  防跳墙，会话管理，用户登录验证，权限访问控制，购物车，临时数据。

