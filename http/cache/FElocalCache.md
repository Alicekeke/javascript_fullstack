## 什么是cookie
  因为http无状态的的协议，不会保存用户的信息      
  cooKie储存在客户端，cookie是服务器发送到浏览器的一小块数据，在下次访问时携带上发送至服务器      
  cookie是不可跨域的(一级域名和二级域名之间允许共享靠的是domain)      

## cookie的属性:
  - key=value 键值对存放对应的值
  - domain: cookie指定的域名默认当前域名
  - path: cookie在那个路由下生效默认是'/'
  - maxAge: cookie的失效时间
  - expries: 过期时间
  - secure: cookie是否使用安全协议，https和ssl等 为true在http无效，在https中有效
  - httpOnly: 设置这个属性，无法通过JS脚本获取cookie信息，一定程度上防止XSS攻击但不是绝对安全，可以通过application手动修改cookie。

## 什么是session
  session是记录服务器和客户端的状态机制，基于cookie      

  sesion储存在服务端，第一次访问服务器会返回一个sessionID给浏览器, 第二次访问会提取sessionID的信息进行判断       


## cookie和session的区别
 - 安全性: session比cookie安全 session储存在服务器端，cookie储存在客户端     
 - 存取的值类型不同: cookie只支持字符串数据，session可以是任何数据类型     
 - 有效期: cookie可以设置长时间保存，session的保存时间较短，客户端关闭则失效
 - 存储大小不同: 单个cookie不超过4K，sesion可存储远高于cookie

## token
  访问接口的凭证(令牌)      
  由uid+time+sign(哈希算法压缩成的十六进制字符串， 就是签名)组成    
  Access_token , Refresh_token, Access_token有效期比较短，过期失效由refresh token 是专用于刷新 access token 的 token   
  

  流程: 客户端使用用户名和密码请求登陆    
  1. 服务器端收到请求，验证用户名和密码
  2. 服务器端签发一个token给客户端
  3. 客户端存储token，放在cookie或者localStorage里
  4. 客户端向服务器请求时带上token
  5. 验证token，成功向客户端放回数据
  6. token 完全由应用管理，所以它可以避开同源策略

  每一次请求都要携带token，把token放在http的header里    

  token是用户**服务端无状态验证**的方式, 服务器端不用存放token，用token的计算时间换取session的存储空间，减轻服务器的压力，减少查询数据库

## JWT token
  为JSON web Token 目前最流行的跨域认证解决方案
  jwt用来在客户端和度无端之间传递的身份信息

## token和jwt区别
  token: 服务器端验证客户端的token，需要查询数据库信息，然后验证是否有效
  jwt: 将token和payload加密后存储域哭护短，服务端秩序使用密钥进行校验，不需要查询数据库挥着减少查询数据库

[傻傻分不清之 Cookie、Session、Token、JWT](https://juejin.im/post/5e055d9ef265da33997a42cc)