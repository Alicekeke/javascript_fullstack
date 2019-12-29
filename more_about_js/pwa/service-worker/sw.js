// console.log('begin');
const CACHE_NAME = 'PWA-1.0'
const cacheList = [
  './service-worker-lifeline.png',
 ]
// cacheStorage
this.addEventListener('install', (event) => {
  // 先安装 再激活 install -> activate 中间过渡等待waitUntil执行(添加缓存)再执行下一个操作
  // 等待一个Promise resolve 才会去到下一个阶段
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(cache => {
      return cache.addAll(cacheList)
    })
  )
})
// 监听请求
this.addEventListener('fetch', (event) => {
  // 判断请求资源是否已经存在缓存中
  event.respondWith(
    // 如果缓存里面有 就从缓存中读取
    caches.match(event.request)
    .then(resp => {
      if(resp) {
        console.log(event.request.url, '有缓存');
        return resp
      }
      else {
        console.log(event.request.url, '没缓存，去请求')
        return fetch(event.request)
        .then(res => {
          // server-work拿到请求的结果
          // 再添加到缓存中
          return caches.open(CACHE_NAME)
          .then(caches => {
            caches.put(event.request, res)
            return res
          })
        })
      }
    }
    )
  )
})