// #!/usr/bin/env node
// 指明用什么环境来解释执行该文件 这里用node
// shebang (解释伴我行) ，用于启动该文件的一个环境
// 可实现命令行高亮
const commder = require('commander')

commder.version('1.0.0')
// 子命令可以根据文件名自动匹配
.usage('<command> [项目名称]')
.command('init', 'init project')
.command('hello', 'hello')
.parse(process.argv) //解析命令行输入
// node app.js init webpack --version
