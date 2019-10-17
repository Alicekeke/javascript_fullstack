var http = require('http');//引入node底层 核心库 构建http访问能力
var fs = require('fs');//引入文件库，文件读写
var path = require('path');//路径
// console.log(http);
// web服务本质 有很多人来访问网站 request
// 网站的开发者，响应用户的请求 respone
http.createServer(function (req,res) {//创建一个web服务,接受一个回调函数
    console.log(req.url);
    if (req.url == '/images/sloth.png') {
        console.log('图片');
        //将图片资源返回给用户
        res.writeHead(200,{'Content-Type':'image/png'});
        let imgStream = fs.createReadStream(path.join(__dirname,'sloth.png'));
        imgStream.pipe(res);
        return;
    }
    // res.writeHead(200, {"Content-Type":"text/html;charset=utf-8"})
    // res.write("回家啦~");
    let fileStream = fs.createReadStream(path.join(__dirname,'index.html'));
    fileStream.pipe(res);
})//创建web服务
//创建端口号
.listen(1314);
