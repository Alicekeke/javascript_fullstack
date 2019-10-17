## html5
能够被'分享'并打开的都是h5页面

html5一个很重要的概念就是语义化标签

混合app (hybird) ios andiord 原生页面与自己写的页面融和

[更多关于html5](https://segmentfault.com/a/1190000019321095)

### swiper滑屏运用
- 引入cdn
```
    <link rel="stylesheet" href="https://unpkg.com/swiper/css/swiper.min.css">    
    <script src="https://unpkg.com/swiper/js/swiper.min.js"> </script>
```
[官方文档](https://www.swiper.com.cn/usage/index.html)

- 按需配置好html js css
  
- 把自己的css，js文件放在引入文件的后面，首先加载swiper
  
#### linear-gradient
 ``` background-image: linear-gradient(60deg,#f8ddd1,#faece5 73%, #fad2c0)```

 旋转角度 0deg：经过中点垂直的线，颜色顺着这条线渲染 ; 60deg: 顺时针旋转60度 沿着线的方向进行变换

 颜色：
 73% 被前面的颜色平分了范围

 #### transform

 #### transform-origin 旋转基点
 transform-origin: x-axis y-axis z-axis;

X: (left,center,right,length,%)

Y:  (top,center,bottom,length,%)

 默认在元素的中心点，即X和Y轴的50%处

 #### rotate
    - rotateX   踩着x轴转
    - rotateY   钢管舞一样贴着Y轴转
    - rotateZ == rotate  绕着啥点转
  
#### 解决不同机型适配问题

/* 先把宽高写的很大，根据不同机型尺寸再压缩不同的比例 解决适配问题 (太聪明惹！)*/
```
    width: 750px;
    height: 1334px;
    //移动端压一半
    transform: scale(.5);
```
  
### 常见动画的实现(网易云音乐动画示例)

 - 定位 slide2
 - 
  一个整体拆开，分别用绝对定位设置trbl定上去，按照要动的模块 分别写animation(定义动画keyframes，然后在类中运用动画)

- 帧动画 slide3
- 
  不同位置的帧画    按百分比定位到对应帧的画

  帧画移动      steps(1)一步到位 不用animation默认的过度 瞬间切换
  
### position 的好处

首先明晰 动画：即css属性发生变化

一个元素css发生变化，比如容器消失、塌陷，其他容器会覆盖原来容器占的位置，会对其他元素有影响

浏览器还需要重新绘制受影响的元素

使用position之后，可以将对其他元素的影响降到最小，在浏览器绘制时各在其对应的地方；动画比较多时，多考虑用position

### 简单了解position

元素的位置通过top、right、bottom、left  控制
- absolute: 
1. 向父级查找 对应的设置了 position的 第一个 元素，
            如果没有找到则相对于整个body
2. 相对于父级第一个非 static 定位的元素

- relative: 相对于自己本来应该在的位置进行定位，一般在子元素设置absolute，给父元素设置relative
- fix: 常见于各种广告，不会跟随屏幕滚动
- static：默认 浏览器设置