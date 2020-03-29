# 页面这么卡，是不是出bug了

错误检测可以很好的保护我们代码的健壮性  `FindBug`

## 错误捕获四剑客

- try...catch 
- onerror
- onunhandledrejection: 当Promise 被 reject 且没有 reject 处理器的时候，会触发 unhandledrejection 事件
- uncaughtException

## 前端错误监控

- 可疑区域增加`try-catch`

    try..catch是预料中的错误，处理异常能力有限 异步代码无法捕获，只能捕获同步

- 全局监控**JS**异常 `window.onerror`

  直接全局绑定`window.onerror = function(message, source, lineno, colno, error) { ... }`全局监控js异常

- 全局监控**静态资源**异常 `window.addEventListener`(加载资源时触发的error事件不会向上冒泡到window，所以只能用`addEventListener`无效在捕获阶段监听)

  ```js
  window.addEventListener('error', function(event) { ... })
  ```

- 捕获没有catch的promise异常：window.`unhandledrejection` 监听全局的promise的reject状态

```js
promise().then( () => {throw new Error('123')})
.catch()

window.addEventListener("unhandledrejection", function (e) {
  e.preventDefault();
  console.log(e.reason)
  // return true
})
// Prromise.reject("XXX)
new Promise((resolve) => {
  resolve(123)
}).then(() => {
  throw '这是你的错误'
})
```

## node错误监控

架构师写的

- try-catch
- process.on('uncatchException')
- process.on('unhandledrejection)

