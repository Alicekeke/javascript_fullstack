## 仿写猫眼电影详情页
  ### HTML
  - 用section标签将页面分割为快
  - 类名采用bem主谓宾的命名规则

  ### css
  - 初始化或重置元素时放在最前
  -  去除浏览器事件效果
  ```
    -webkit-user-select: none 设为不可选中状态
    -webkit-tap-highlight-color: rgba(255,255,255,0) 抵消掉手机自带的点击时高亮的效果 ;
  ```
  - flex=1 时 flex-grow和flex-shrink: 1; flex-basis(伸缩基准值): 0% 即把设置flex：1的容器看做零尺寸，其实际占比由父容器-其他同级容器给出
  -  z-index：属性设置元素的堆叠顺序，越靠近人眼值越大，要使z-index 生效，必须带上绝对或相对定位 ;
  -  电影背景模糊处理
    不能直接在当前容器下设置模糊，会导致整个容器的模糊后代并且还会出现白边，所以要设置一个'伪'父容器设置背景。父容器设置相对定位，并且filter:blur(0);在图片子容器中设置模糊程度，z-index设最小
  - 图片覆盖方式
  ```
  background-size:
              cover:图片扯满铺满容器，但背景图片可能显示不完全。
              contain:其宽高完全适应内容区域,等比尽量扩展到容器最大尺寸
              100%：图片铺满全屏并且使背景图片显示完全,更适用于自适应宽高的网页全屏背景。
  ```
  -   float: left ：脱离文档流：将元素从普通的布局排版中拿走，其他盒子在定位的时候，会当做脱离文档流的元素不存在而进行定位;
  解决办法；放在同一个bfc环境，使用同一个规则。只想要float的特性，不想要浮动流对布局的影响
  - vertical-align 垂直对齐方式：两个元素拦腰对齐
  #### 简介框打开关上
   - 盒子限制行，多行文本溢出打点 
  ```     
   min-height: 65px;
  display: -webkit-box;//必须用，将对象作为弹性伸缩盒子模型显示
  overflow: hidden;// 超出部分隐藏
  -webkit-line-clamp: 3;//限制行数
  -webkit-box-orient: vertical;//必须用 ，设置或检索伸缩盒对象的子元素的排列方式
  word-break: break-all;//强制性换行
  ```
  - 画一个旋转箭头，点击简介框打开显示更多
  ```
  //css
  width: 10px; height: 10px;
  border: 1px solid #aaa;
  display: inline-block; //i标签设行内块级
  transform: rotateZ(45deg);
  border-width: 0 1px 1px 0;
  box-sizing: border-box;
  transition: transform 0.5s;
  //点击打开后添加up类名，箭头旋转
  transform: rotateZ(-135deg);

   //js设置close ，up 标记，添加点击事件 判断当前是否关上(有close) 是则移出close 添加 up，反之添加close，移出up。
   
  ```
  #### 演职人员横向列表/视频和剧照列表
  ```
  //css
  white-space: nowrap;//不换行
  overflow-x: scroll;//x轴方向滚动
  box-sizing: border-box;//
  //注意子容器变行块级

  //js
  //在js中用es6反引号字符串拼接插入整个li的html，遍历数据源内对应数组插入
  function celebrity(e) {
        for (let n of e) {
            }
      }
  使用es6模板${}绑定数据
  ```
  - let...of..
  
  #### weUI实现"想看"toast
  

 


  


  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  text-overflow: ellipsis;可以用来多行文本的情况下，用省略号“...”隐藏超出范围的文本
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;//必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式
  /* 标签内英文换行 */
  word-break: break-all;
  word-wrap:break-word;       
- 双类名无空格 同级选中  
- 弹性布局在移动端兼容很好，在pc端要考虑兼容性 
- a标签是行内标签，无法设置宽高，除非把它设置为块级：display block
-        