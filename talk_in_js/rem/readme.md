- js是极具表现力的语言    
    中台概念    node + vue/react  
- {} 对象字面量 {key:value,...} 
  string number boolean   
### 图片容器
  background-size: cover|contain|100%;    
  - cover是以容器为主；等比例缩放，背景图像完全覆盖北京区域；图片大小和盒子不一样，会剪裁多余的部分(减小图像变形的风险)   
  - contains是以图片为主；在一个方向上等比例缩放图片    
  - background-size:100% ;  可以使图片铺满全屏并且使背景图片显示完全，相对于cover来说，更适合用来设置全屏背景，尤其是自适应宽高的网页中。   
  
### 相对像素比rem
- rem (font size of the root element）相对于HTML根元素font-size的大小来等比例计算的。可用于分栏布局 layout    
- 适配原理：动态修改html的font-size适配；rem是通过不同屏幕的大小设置html根元素的font-size的属性大小来实现适配。   
> em相对于父元素字体大小    
> vw / vh	(Viewport Width 和 Viewport Height) 相对于视口的宽/高度， 视口被均分为 100 单位的vw / vh    
    row 行  
    column 列  .col-${n}    
    rem 做 10rem等分    

    Q:如何纯css响应式地布局十分之一   
    A:更据rem 利用fontSize大小定位的特性 js计算控制css的fontSize大小    
    ```
         function init() {
            var width=document.documentElement.clientWidth;
            // js控制css驼峰命名
            document.documentElement.style.fontSize=width / 10 + 'px';
            }
            init();
            window.onresize= function(){
            init();
            }
    ```
### 实现居中的各种方法
1. flex：弹性布局居中 父元素设置flex 水平垂直居中   
```
        display:flex;
        justify:center;
        align-item:center;
```
2. position:absolute|relative 定位居中，父元素设置relative，子元素设置absolute    
```
.parent {
  position: relative;
}
 .chilren {
   /* 不知道父容器宽高的情况下，让容器去浏览器的正中间 */
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);  */
}
``` 
3. positon: absolute; && display: flex && translate  垂直居中   
```
.parent {
  position: relative;
}
.chilren {
  position: absolute;
  left: 50%;  
  top: 50%;//向下偏移 50%，然后相对自身向上偏移 50%   
  transform: translate3d(-50%, -50%, 0);
}
```
4. grid网格布局
```
 display: grid;
 place-items: center;
```
> 注意：设置为网格布局后，容器子元素（项目）的float、display:inline-block、display:table-cell、vertical-align和column-*等设置都会失效。   
5. margin: 0 auto 给自身设置实现x轴上居中 (对于浮动的盒子失效)    
6. text-align: center   针对行内元素的水平居中    
7. line-height 实现文字的垂直居中   
    
### 旋转
    eg: css+js 做一个时钟 

    transform-origin:旋转的基点 
    
    transform:rotate()
### 熟悉DOM操作
    querySelect()

    setAttribute()

    box-sizing: border-box;