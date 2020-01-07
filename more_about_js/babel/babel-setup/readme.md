# babel入门
js编译器 解决浏览器的自身对于es语言的差异性的工具 在项目中使用最新的语法 babel帮助我们向下兼容

### 需要用到的模块 (babel7后都使用@babel/plugin开头)
- @babel/core (核心库)
- @babel/cli (命令行工具)

- @babel/plugin-transform-[xxx] (提供插件)
    针对不同的功能提供不同的插件[插件详情](https://babeljs.io/docs/en/plugins)
    一个个选择插件再引入很麻烦，提出preset概念，插件包套餐

    presets：预设，把所有的插件结合起来
      @babel/preset-env   

  
- browserslistrc: 指定特定的目标浏览器 设置兼容
  ![browserslistrc](https://github.com/browserslist/browserslist#queries)

- @babel/polyfill (垫片 抹平各个浏览器之间的差异) 
     让目标浏览器支持所有特性,  
  体积很大 按需引入
  ```
  "presets": [["@babel/preset-env", { //套餐 包括很多插件及其单独的功能
    "useBuiltIns": "usage",
    "corejs": 3
  }]]
  ```

- @babel/plugin-transform-runtime (包装公共函数，减少冗余)      
    提供统一模块化的helper，将高度重复的方法做成一个模块来引入到代码中

### 配置命令
```
  "scripts": {
    "complier": "babel src --out-dir dist"
  },
  ```
  编译src目录到dist目录

运行： npm run complier


- 编译箭头函数
- Promise
- Set

### 按需引入
[参考](https://www.jianshu.com/p/cbd48919a0cc)
[文档](https://www.babeljs.cn/docs/)