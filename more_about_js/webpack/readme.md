# webpack 自动化构建工具

- dist 存放打包后的文件
- src 存放入口文件
- webpack.config.js webpack的配置文件

### 初始化webpack项目
  - `npm i webpack webpack-cli --save-dev`
  - `npm init -y`

## webpack中的常用模块( module )
    module用来决定如何处理项目中的不同类型的模块
    webpack模块支持的语法
    es6 import语句
    Commonjs require() 语法
    AMD define 和 require语句
    css/sass/less 文件中的@import语句
    支持样式（url(...)）或者html文件(<img src="...">)中的图片链接

### 抽取样式 js css html分块压缩打包 
- html打包 (`html-webpack-plugin`)
- js打包  (`uglifyjs-webpack-plugin`)
- css打包 （`optimize-css-assets-webpack-plugin`）

  >SCSS 源代码会先交给 sass-loader 把 SCSS 转换成 CSS；
  >把 sass-loader 输出的 CSS 交给 css-loader 处理，找出 CSS 中依赖的资源、压缩 CSS 等；
  >把 css-loader 输出的 CSS 交给 style-loader 处理，转换成通过脚本加载的 JavaScript 代码；
    sass-loader  -->  css-loader --> style-loader
    
  添加loader插件打包  loader（让webpack支持非js文件）
  npm install style-loader css-loader --save-dev

- npx webpack : 打包命令
- packjson配置打包命令scripts` "build": "npx webpack -c webpack.config.js"`
- `npm i postcss-loader autoprefixer --save-dev` ：`postcss-loader`给css添加前缀，`autoprefixer`进行浏览器部分兼容补全
- `npm i mini-css-extract-plugin --save-dev` 抽取样式 分块打包
- `npm i html-webpack-plugin` 为html文件中引入的外部资源添加hash，创建html入口文件

## webpack 打包优化

#### 为css， js文件添加哈希值，防止缓存影响
```
  output: {
    filement: 'main.[hash].js',
  },
```
#### 清理目录，移除旧文件
- `clean-wenpack-plugin`
  由于修改代码导致最后生产的文件不同，所以需要每次生成文件前清空dist目录，防止无用文件越来越多或者避免手动清除。

#### webpack处理图片打包优化
-  `file-loader`
- `image-webpack-loader`

#### 真 . 插件之王
