## nodejs 搜索网易云音乐下载到本地

#### 用到的模块
- request
- events
- inquirer
- fs
  
### request模拟客户端发送请求
基本形式
```
request({
    url: url,//请求路径
    method: "POST",//请求方式，默认为get
    headers: {//设置请求头
        "content-type": "application/json",
    },
    body: JSON.stringify(requestData)//post参数字符串
}, function(error, response, body) {
    if (!error && response.statusCode == 200) {
    }
}); 
```

### events事件

发布订阅：emit与on  
on的作用是对指定事件绑定事件处理函数，emit则是将指定的事件对应的处理函数依次执行    
`ev.on('search', (search) => {}` 绑定搜索事件的处理函数，接受一个字符串event和一个回调函数    
`ev.emit('search', search)` 主函数中对事件执行的监听函数    

### inquirer交互式命令行工具
在命令行与用户交互，提供了丰富的配置参数，包括list、input、comfirm、checkbox、rawlist、expand、edit、password等常用表单交互，[详细](https://blog.csdn.net/qq_26733915/article/details/80461257)   
- 基本用法    
```
const inquirer = require('inquirer');

const promptList = [
    // 具体交互内容
];

inquirer.prompt(promptList).then(answers => {
    console.log(answers); // 返回的结果
})
```

### fs文件系统
文件系统模块，负责文件的读写，提供异步和同步的方法，前端工程化（模块化，组件化，静态资源管理，规范化） 管理合作完成工程化大的项目，node让前端变得工程化 有一点在于node具有文件操作  js则无    
#### pipe
readFile、writeFile按字符读取，读完放在内存中，消耗大。   
pipe （管道）将文件以二进制流（stream）的形式边读边写，效率高、适用于文件较大的情况。类似于java中I/O流的读写（InputStream/OutputStream）    


### node进程模块 （process）    
process对象是一个全局变量，用来与当前进程互动
`process.argv`
返回一个数组，这个数组包含了启动Node.js进程时的命令行参数。第一个元素为process.execPath(启动路径，默认nodejs所在路径)。第二个元素为当前执行的JavaScript文件路径。剩余的元素为其他命令行参数，在这里用获取命令行输入的歌名
