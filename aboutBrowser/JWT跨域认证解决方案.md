### token
token相当于一个通行证，有了token就可以拥有响应操作和查看的权限，这些权限是服务器知道你是谁（authentication）后赋予你的。
不同的 token 都有不同的实现，比如下面的 jwt，他就规定了 json web token 的 生成使用流

## JWT
  传统的 cookie-session 单机当然没有问题，如果是服务器集群，或者是跨域的服务导向架构，就要求**session 数据共享**，每台服务器都能够读取 session。

session共享方案
1. session 数据持久化，写入数据库或别的持久层。session存储在服务器端，各种服务收到请求后，都向持久层请求数据。这种方案的优点是架构清晰，缺点是工程量比较大。另外，持久层万一挂了，就会单点失败。
  - 单点登录
 > 单点登录（Single Sign On），简称为 SSO，是比较流行的企业业务整合的解决方案之一。SSO的定义是在多个应用系统中，用户只需要登录一次就可以访问所有相互信任的应用系统，（比如用同一个百度账号自动登录所有的百度系产品）

3. 另一种方案是服务器索性不保存 session 数据了，所有数据都保存在客户端，每次请求都发回服务器。JWT 就是这种方案的一个代表。

 ### 具体使用方式

 认证后，服务端返回一个加密后的**json对象**，存储在客户端，jwt分为三个部分Header（头部）.Payload（负载）.Signature（签名）
 其中，头部包含了其签名算法（sha256）；Payload 部分也是一个 JSON 对象，用来存放实际需要传递的数据；Signature 部分是对前两部分的签名，防止数据篡改。最后用Base64URL编码（base64UrlEncode()）

 客户端收到服务器返回的 JWT，可以储存在 Cookie 里面，也可以储存在 localStorage；
 最好的做法是放在在加密的HTTPS里请求的头信息**Authorization**字段里面。并且有效期应比较短。

 ### JWT缺点
 这个 token 在客户端存储，JWT被服务端签发了，过期之前都不能废止某个 token，假如服务端要在过期之前把某个用户踢出登录。除非服务端再把 token 对应的过期时间存起来，那么这样右回到老样子，服务端又要存储状态了。

 ## BA认证（Basic Authentication）

 Basic authentication(BA)是一个最简单的对Web资源进行访问控制的方法，因为它不需要cookie，session identifiers或者登录界面。而且BA使用HTTP header中的标准字段，所以也不需要握手。

请求的HTTP头字段会包含Authorization字段，形式如下： Authorization: Basic <凭证>，该凭证是用户和密码的组和的base64编码。
仅仅使用 Base64 编码并传输，而没有使用任何 加密 或 hash算法。因此，基本认证常常和 HTTPS 一起使用，以提供机密性。
很少在可公开访问的公网上使用，有时候会在小型私有系统中使用。
token生成方式：bse64(name:pwd)


OAuth的请求头标准
```
Authorization: <type> <credentials>

// BA
Authorization: Basic 超长token

````



