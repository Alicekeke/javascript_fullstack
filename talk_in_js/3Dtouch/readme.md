#### 3Dtouch 树懒图 结合http基础
移动端与PC端

触屏 重力感应 陀螺仪  移动端手指触屏API（touchstart    touchmove  touchend）力度作用到图片
- 雪碧图    
  
  往右，下走都是负值
  bcakground-position-x|y;
  
  background-size = 400%;

- 软硬件综合调试
  ipconfig live-server 得到本地局域IP地址 草料二维码生成二维码
  手机电脑相连，确认在同一wifi下
  gitbash windows输入ipconfig  Mac输入ifconfig  找到ip地址
  网址输入ip地址+端口号 电脑可查看
  将网址输入草料二维码


- http live-server
  res: respone 回答对象

  req: require 请求对象

  node 内建http模块
  ```
  快速自建  http.creatServer(() => {
      console.log(request.url),携带个人信息 否则默认首页
  }),listen(1314)
  ```
  在1314端口上一直伺服状态，一台电脑通过端口提供不同服务 

- http fs path node的内置模块
  .html .png... 
  对网站来说一切皆是资源 远程访问用url表示（资源在那个路径上）
  区别：req.url  文件类型不一样text/html | image/png
  res.readHead(200,'Content-type':'text/html;charset=utf-8')==>（状态码，文件类型，字符集）
