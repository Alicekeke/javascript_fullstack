### 性能优化-网络

### CDN
用户和数据中心之间的缓存机制，通过这个缓存机制动态获取IP地址根据地理位置，让用户到最近的服务器访问。缓解数据中心的压力。      
更快，更可靠地将文件发送给用户分发网路

cdn尽早拿到资源，就尽早将页面呈现给用户，减少首屏白屏时间

#### CDN的优点

- 提速：会给用户指派较近、较顺畅的服务器节点，将数据传输给用户
- 低成本
    服务器也是需要土地放的，考虑地价，挑便宜的地区（eg: 亚马逊AWS宁夏数据中心），减少互联的流量，也降低了带宽成本
- 高可用度：当某个服务器故障时，自动调用临近地区的服务器

### CDN 回源
回源是指浏览器访问 CDN 集群上静态文件时，文件缓存过期，CDN结点找不到资源，直接穿透 CDN 集群
而访问源站机器的行为。

cookies： 你请求的url在cookies生效范围内，cookies则自动添加到请求头里

### CDN缓存

三级缓存：浏览器本地缓存、CDN 边缘节点缓存、CDN 源站缓存

缓存设置：缓存时间设置的过短，CDN 边缘节点缓存经常失效，导致频繁回源，增大了源站负载，访问也慢；
缓存时间设置的过长，文件更新慢，用户本地缓存不能及时更新；所以结合业务情况而定

不同静态资源类型缓存时间：根据更新频率而定
- HTML：3分钟
- JS、CSS：10分钟、1天、30天

### DNS
#### 域名解析流程

```
 浏览器缓存 -> 操作系统 host 文件 -> 路由器缓存 -> ISP DNS 服务器 -> 根服务器递归/迭代查询
```
> 
任意环节命中就直接返回服务器对应的 IP 地址，若没能在缓存中查找到，则最终会到根 DNS 服务器中递归/迭代查询。
递归查询性能低，多采用迭代查询


> 迭代查询：当根域名服务器收到本地域名服务器发出的迭代查询请求报文时，要么给出所要查询的 IP 地址，要么告诉本地域名服务器：你下一步应当向哪一个域名服务器进行查询。然后让本地域名服务器进行后续的查询，而不是替本地域名服务器进行后续的查询。


### 优化DNS性能

1. 浏览器并发数限制，**分布**设置成多个域名，引流到不同的接口上

  -  用户访问：Java、PHP 等 API 接口    api.com
  - 页面和样式：HTML/JS/CSS  css.com
  - 图片：jpg、png、gif 等     image.com

2. 尽最大可能利用各种DNS缓存，防止DNS的递归/迭代查询
3. 使用`keep-alive`特性，避免多次创建http请求从而减少DNS查询频率
4. DNS预解析

#### DNS缓存
 服务器可以设置 TTL（Time-to-Live） 值来表示 DNS 记录的存活时间，本机 DNS 缓存会根据这个 TTL 值判断 DNS 记录什么时候应该被抛弃并重新查询。

一般情况下，TTL 的值都不会设置太长，这样做的目的是当服务器发生故障时，能够快速转移服务以减少故障带来的损失。但是，当我们的服务并不是那么庞大的时候，我们应该尽量增大 TTL 值，尽量使用 DNS 的缓存来减少 DNS 查询。

浏览器 DNS 缓存也有自己的过期时间，这个时间是独立于本机 DNS 缓存的，相对较短。例如 Chrome 只有 1 min 左右。不仅有自己的过期时间，还有一定的数量限制。如果在短时间内访问了大量不同域名的网站，那么早些时间的 DNS 记录将会被覆盖，必须重新查找。

#### 利用keep-alive特性
服务器的 IP 地址在建立 TCP 连接的时候才会使用到。那么，使用一个 TCP 连接来发送和接受多个 HTTP 请求/应答就可以有效避免 DNS 查询

#### DNS预解析
可以通过meta标签配置，来告知浏览器当前页面需要做DNS预解析
```html
<meta http-equiv="x-dns-prefetch-control" content="on" />
```

或者使用link标签来强制对DNS做预解析
```html
<link rel="dns-prefetch" href="http://baidu.com" />
```

### 减少http请求数

减少http请求数量：就是资源的合并；减少http请求大小：就是资源的压缩

- 使用缓存
- 减少cookies使用，请求体积减小
- 升级http2
- 图片使用DataURL, Web Font
- 接口存储localStroge
- 避免空src/href
- 升级ipv6


### 开启和配置gzip压缩

减少传输体积，对文本，图片等静态资源进行压缩

除了常见的grunt，gulp，webpack打包工具，gzip能在这些打包工具压缩后再压缩50%以上


不是每个浏览器都支持gzip，请求头中有Accept-Encoding字段可以判断是否支持gzip压缩方式

如何启用gzip？

> node：加上commpress模块
> Nginx 配置：定义在Nginx.conf：http() -- gzip: on
 






