#### 拖拽日程表
a image标签自带拖放功能   html新增拖放属性
像广告打折活动页，不用考虑到后续维护的h5页面用jq写还是很方便    
  ##### 提供的事件
- ondragstart：对象开始被拖动   
- ondrag：对象被拖动过程中(鼠标可能在移动也可能未移动)    
- ondragend：对象被拖动结束   

  拖动对象可以进入到上方的目标对象可以触发的事件：    
- ondragenter：目标对象被对象拖动着进入   
- ondragover：目标对象被对象拖动着悬停在上方   注意：必须阻止dragover事件的默认行为，才可能触发drop事件，不然dragover一直被触发  e.preventDefault();    
- ondragleave：对象拖动着离开了目标对象   
- ondrop：对象拖动着在目标对象上方释放/松手   
  ##### 数据传递
在源事件对象和目标事件对象之间传递数据 `dataTransfer`   
源事件对象保存数据`event.dataTransfer.setData('text', $(event.target).html())`    
目标事件拿到数据 `event.dataTransfer.getData('text')`   

### 浏览器network
浏览器收到html，会解析为dom   
遇到css 解析为cssom   
把dom csson合在一起生成一颗渲染树   
根据 样式 计算位置 开始渲染 布局    
jq中的domContentloaded 就是当 html 解析完成之后发生的   

有一些标签 img link script 会引入外部资源，会在解析完HTML 之后 就开始请求资源   

每一个请求都是一条线 在控制台network中可以看到    

### svg
可伸缩矢量图形 (Scalable Vector Graphics)   
#### 矢量图，位图
做一个圆形进度条    

矢量图 （掘金logo）：是由基本的点线圆等基本图形组成的   
位图 (百度logo): 对于位图而言，是由很多个很小的像素点组成的，   

    svg预定义基本图形，点、线、圆、矩   
    按照w3c中例子设置圆的各项属性：cx，cy 圆心坐标，r半径   
    带stroke的属性都是与边框，轮廓有关的    

   >  stroke-dasharray="282.7"刚好是整个圆的周长，如果不是就会被分成不同的虚线切割   
   >  strocke-dashoffset="80"：按百分比模拟出进度条效果    



> 思考：用div画一个这样的进度条
画一个半圆边框，放在遮罩下，半圆旋转模拟进度条旋转

