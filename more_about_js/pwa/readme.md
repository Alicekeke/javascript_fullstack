## PWA (Progressive Web App) 渐进式web应用

[微博](https://m.weibo.cn/)
打开Chrome Application里Service Workers会存放历史记录

达到以下三个条件即满足pwa
1. 离线访问
2. 发送通知
3. 桌面入口

#### 离线访问 （缓存）
  Service work
#### 发送通知
 Nitification
#### 桌面入口
 mainfest.json

eg: 
```
 // 存在一个超级耗时的任务
    // web worker解决超耗时任务： 开启一个线程单独承载耗时任务 与主线程任务平行
    let worker = new Worker('work.js')
    //onmessage()监听数据
    worker.onmessage = function (e) {
      console.log('接收到结果', e);
    }    
```
```
let sum = 0
for (let i = 0; i < 10000; i++) {
  sum += i;
}
// console.log(sum);
// window.postMessage() 方法可以安全地实现跨源通信
this.postMessage(`${sum}`);
```
### web worker 
一个单独的线程，每次操作完的结果不能被持久的保存下来
Service work 基于web worker 增加了 持久离线缓存的能力
Service work拦下了客户端发出的请求 先进行检查 再返回内容

#### work-box service-work 的一个轮子 

[web worker 使用教程](http://www.ruanyifeng.com/blog/2018/07/web-worker.html)
[webAPI参考 cacheStorage ](https://developer.mozilla.org/zh-CN/docs/Web/API/CacheStorage)


