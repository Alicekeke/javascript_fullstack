## vue transition

[详见文档](https://cn.vuejs.org/v2/api/#transition)
[进入，离开，列表过渡](https://cn.vuejs.org/v2/guide/transitions.html)
- 属性
  transition取名 "name"会自动拓展为过渡类名，我们只需提供**类名前缀** .name-enter，.name-enter-active等,再分别根据事件名写css即可       
 `v-on:click="事件" + v-if="条件方法"` 这里结点必回出现用v-if(dom结构二选一展示) 否则用v-show(跳过不编译)     
--------------------------
- 事件
    * before-enter
    * before-leave
    * before-appear
    * enter
    * leave
    * appear
    * after-enter
    * after-leave
    * after-appear
    * enter-cancelled
    * leave-cancelled (v-show only)
    * appear-cancelled


  ##### transition的钩子函数：
    v-enter：定义上半场过渡的初始状态；在过渡开始前被添加，在过渡开始时会被移除   
    v-enter-to：定义上半场过渡的结束状态；在过渡开始时被添加，在过渡完成时会被移除    
    v-enter-active：这里包含了上面的v-enter、v-enter-to两个时间段，在这里可以对上半场过渡定义过渡时间、曲线等   
    v-leave：定义下半场过渡的初始状态；在过渡开始前被添加，在过渡开始时会被移除   
    v-leave-to：定义下半场过渡的结束状态；在过渡开始时被添加，在过渡完成时会被移除    
    v-leave-active：这里包含了上面的v-leave、v-leave-to两个时间段，在这里可以对下半场过渡定义过渡时间、曲线等   
---------------------------------
- 用法
  分别绑定事件并在script中数据源注册事件方法      
  <transition> 元素作为单个元素/组件的过渡效果。<transition> 只会把过渡效果应用到其包裹的内容上，而不会额外渲染 DOM 元素，也不会出现在检测过的组件层级中。    

#### 设置背景遮罩

```
在html中也用transition标签包裹并设置动画属性    
.modal-overlay{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;  //相对于浏览器定位撑满全屏
    background-color: #2e3e50;
    opacity: 0.6;
  }
```
另外，vue也可以选择使用 <transition-group> 包裹，或使用第三方类实现动画   