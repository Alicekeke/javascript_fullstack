
# 制作并发布一个vue组件的npm包
- npm init        
   初始化项目，生成package.json文件，指明添加的依赖 再npm install下载这些依赖     

- dist: 发布时的目录，src开发目录     
 cnpm i 安装默认的依赖      
 -D => --save-dev 开发环境 /src       
 -S => --save 生产环境  /dist         
 npm run build => 会生成一个dist文件        
 
- vue 需要一个app入口文件         

  ## 写一个vue指令 vue插件      
- 使用 Vue.component 注册组件       
- template定义返回的模板字符串        

## vue是怎么导出的              
index.js 要把所有方法export出去         
通用 js的模块化方案 UMD       

## 发布npm    
npmjs.com     

npm login     
npm publish     