## 怎样在浏览器优雅的渲染十万条数据？


#### 同步与异步在浏览器的处理方式不同
- 引入前思考：
```
  let start = Date.now()
  //执行同步代码
  let end = Date.now()
  console.log('时间：', end - start)
```
  这里在页面渲染完成前显示时间 ，应该在页面渲染完成后才能显示时间。解决办法就是将结束时间戳放在回调函数中，就能在页面渲染完成后再显示渲染时间     

js是单线程语言，无论如何，js执行的时候都是只有一条流水线（单线程），同步和异步的差别就在于这条流水线上各个流程的执行顺序不同。 **js执行队列**   

- 同步
怎样维护同步代码与异步代码 两个栈   
```
document.body.style.backgroundColor = 'red';
document.body.style.backgroundColor = 'yellow';
```
只能看到yellow，同步被合在一起执行，浏览器只能拿到覆盖后的结果    
执行setTimeout之前会发生一次渲染    

- 异步
  可以改变程序正常执行顺序的操作就可以看成是异步操作
```
document.body.style.backgroundColor = 'red';
setTimeout(() => {
 document.body.style.backgroundColor = 'yellow';
}, 0);
```
先看到red，在看到yellow，说明在setTimeout之前会发生一次样式计算，浏览器再渲染它，red执行完再执行它    

#### 方法一：分批渲染

给一个once，在setTimeout内传参，在回调函数中 减去once 再递归调用。这样大大减轻了浏览器负担    
