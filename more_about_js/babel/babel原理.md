## babel转换代码原理

根据输入字符串得到输出，babel转换代码的过程主要为三步：

1. 解析
   使用[babylon](https://github.com/babel/babylon)这个解析器，它会根据输入的javascript代码字符串根据[ESTree](https://github.com/estree/estree)规范生成AST（抽象语法树）。（先词法解析生成token，生产AST，在具体修改AST）
2. 转换
   根据一定的规则转换、修改AST。
3. 生成
   使用[babel-generator](https://github.com/babel/babel/tree/master/packages/babel-generator)工具集将修改后的AST转换成普通代码。

### AST

  > wiki: 抽象语法树（Abstract Syntax Tree，AST）是源代码语法结构的一种抽象表示。它以树状的形式表现编程语言的语法结构
    树上的每个节点都表示源代码中的一种结构。之所以说语法是“抽象”的，是因为这里的语法并不会表示出真实语法中出现的每个细节。
    ----
    和抽象语法树相对的是具体语法树（通常称作分析树）。一般的，在源代码的翻译和编译过程中，语法分析器创建出分析树，然后从分析树生成AST。一旦AST被创建出来，在后续的处理过程中，比如语义分析阶段，会添加一些信息。

AST用途广泛，除了babel，还会在webpack，ESlint等工具中遇到
[the super tiny compiler](https://github.com/starkwang/the-super-tiny-compiler-cn/blob/master/super-tiny-compiler-chinese.js)


### 更多
- [babel插件手册](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md)
- [深入babel](https://juejin.im/post/5c21b584e51d4548ac6f6c99)