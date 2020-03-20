# OAuth授权方式

开放授权（OAuth）是一个开放标准，允许用户让第三方应用访问该用户在某一网站上存储的私密的资源（如照片，视频，联系人列表），而无需将用户名和密码提供给第三方应用。

服务端会要求客户端访问携带已认证的token，未认证则返回401，
返回含有401的响应必须包含一个适用于被请求资源的WWW-Authenticate首部用以质询用户信息。
当浏览器初次接收到401响应，会弹出认证用的对话窗口；
与之类似，403响应标识请求被服务端拒绝，拒绝原因即未认证或没有权限。

## 用微博账号登录掘金
掘金 要 通过你，把你的微博账号授权给他登录，
这个时候我们肯定不会把自己账号密码给掘金
OAuth 就是这样一套机制，一个规范

## 几个角色
- Third-party application：第三方应用程序，本文中又称"客户端"（client），掘金
- HTTP service：HTTP服务提供商，本文中简称"服务提供商"，微博
- Resource Owner：资源所有者，你。
- User Agent：用户代理，本文中就是指浏览器。
- Authorization server：认证服务器，即微博专门用来处理认证的服务器（https://api.weibo.com）。
- Resource server：资源服务器，即服务提供商存放用户生成的资源的服务器。它与认证服务器，可以是同一台服务器，也可以是不同的服务器。（tva1.sinaimg.cn）

## 授权流程
- 用户打开客户端以后，客户端要求用户给予授权(掘金登录选项：微博登录)。
- 用户同意给予客户端授权（我点击微博登录，登录通过）。
- 客户端使用上一步获得的授权，向认证服务器申请令牌（掘金申请 access_token）。
- 认证服务器对客户端进行认证以后，确认无误，同意发放令牌（微博给他 access_token）。
- 客户端使用令牌，向资源服务器申请获取资源（掘金拿着access_token 去换资源）。
- 资源服务器确认令牌无误，同意向客户端开放资源（微博校验通行）。

## 授权码模式（authorization code）
你的网站需要获得服务器的授权，要现在对应的开发者申请账号、秘钥、重定向地址
- client_id：掘金去微博那里注册的
- response_type：需要你给我一个 code
- state：任意值，规范规请求和返回时都是一样的值
- redirect_uri：认证服务器把客户端重定向去的一个 url

给授权，认证服务器先将用户导向注册时事先指定的redirect_url，在后面连接上授权码
`https://gold.xitu.io/oauth/login?state=weibo&code=somecode`

客户端收到授权码，附上早先的"重定向URI"，向认证服务器申请令牌(token)。
这一步是在客户端的后台的服务器上完成的，对用户不可见。

这个时候掘金已经拿到 code 了，该码与客户端ID和重定向URI，是一一对应关系，
需要 掘金再拿 code，重定向URI，自己的client_id，再去请求 认证服务器，
掘金发出请求的时候：


#### 认证服务器核对了授权码和重定向URI，确认无误后，向客户端发送访问令牌（access token）和更新令牌（refresh token）。

拿到授权码acess_token后，每次向浏览器请求资源，请求头都会加上Authorization字段

access_token到了过期时间就不可再用了，这时请求服务器会返回401状态码，这个时候就要用refresh token来更新token

# token
token相当于一个通行证，有了token就可以拥有响应操作和查看的权限，这些权限是服务器知道你是谁（authentication）后赋予你的。

OAuth的请求头标准
```
Authorization: <type> <credentials>

// Oauth
Authorization: Bearer 超长token

````

[详细的验证情况](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Authentication)