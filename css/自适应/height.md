## 场景一： CSS高度如何铺满全屏(考虑兼容)

### planA: 利用css百分比实现

原理1: 子元素通过父元素的 指定宽高，设定百分比继承父元素的宽高。    
原理2: Web浏览器在计算有效宽度的时候会考虑浏览器窗口的打开高度，如果不给宽度设定任何缺省值，则浏览器自动铺满横向宽度。但高度计算方法不一样。浏览器根本不计算内容的高度 换句话说。浏览器：`width:100%;height:auto;`

1.怪异模式 (没有`<!DOCTYPE html>`)下，body 可以作为根元素。2.标准模式下，html 才是根节点。

### B.css vh(相对视口高度) 实现

原理：vh是相当于视窗的高度(满高是100vh)。vw是相当于视窗的宽度(满宽是100vw)。 浏览器内部可视区域。`window.innerWidth`

[张鑫旭大佬的css博客]

## 场景二 自适应高度 自动填充剩余高度

### planA
```html
<div class="outer">
    <div class="A"> 头部DIV </div>
    <div class="B">下部DIV </div>
</div>
```
```css
html,
body { height: 100%; padding: 0; margin: 0; }
.outer { height: 100%; padding: 100px 0 0; box-sizing: border-box ; position: relative; }
.A { height: 100px; background: #BBE8F2; position: absolute; top: 0 ; left: 0 ; width: 100%; }
.B { height: 100%; background: #D9C666; }
```

### planB
```html
<div class="outer">
    <div class="A">头部DIV</div>
    <div class="B">下部DIV</div>
</div>
```
```css
html,
body { height: 100%; padding: 0; margin: 0; }
.outer { height: 100%; padding: 100px 0 0; box-sizing: border-box ; }
.A { height: 100px; margin: -100px 0 0; background: #BBE8F2; }
.B { height: 100%; background: #D9C666; }
```