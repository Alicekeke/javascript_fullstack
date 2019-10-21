#### css
- 基本的结构套路
  #app>.page

- css的解析也是要花时间的  *{}费时

- 要对浏览器有认识
  |浏览器|内核|备注|
  --|:--:|--:
  IE|Trident|IE、360极速、百度
  firefox|	Gecko	| Chrome老对手
  Safari	|webkit	|Webkit的鼻祖其实是 Safari。
  chrome	|webit/Blink	|Blink核心内置于Chrome，是 WebKit 的分支。大部分国产浏览器都采用Blink内核。二次开发

Opera	blink	现在跟随chrome用blink内核。
  -webkit Google浏览器内核 手机端多以它为主
  -ms PC端因为有Windows操作系统，其内容是微软的
  test-size-adjust: 100% 该属性比较新，浏览器可能不支持，但是在实验式的支持
  以加前缀的方式，-webkit- 让浏览器使用该属性

- 响应式编程，自适应的考点 rem, em是相对单位  px是像素单位，靠不住，不同的手机像素密度不一样
  weui  em

  16px  .16rem
  span标签无法设置宽高

  float会把浮动元素变成块级元素

  绝对定位脱离了文档流

- css考点

  -webkit-text-size-adjust: 100%  //禁止字体或在移动端横屏时变化。还有另一种解决办法transform:scale(0.XX)

  -webkit-tap-highlight-color: transparent;   //禁用浏览器自带点击高亮

  -webkit-overflow-scrolling: touch;    //使用具有回弹效果的滚动

  html {font-size: 100px} || {font-size:62.5%}    //移动端适配问题，相对于根字体大小 页面width：1920 1rem=100px

 
  .quick-login .quick-type

  stylus 的嵌套

  只写一个类名很容易冲突 同级多类名更加灵活

  模块化，命名空间，在BEM无法满足我们的时候，命名空间可以帮助你创建一个结构来控制CSS属性的写入

#### base64
  更小 任何一张图片都是编码，传输更快，完全在css中，不需要发送http请求(性能开销的核心)http请求数应该减少
   ** 编码**
        例utf-8, ascII码
        base64:以64个可打印的字符组成，含有欧a~z,A~Z,0~9,+,