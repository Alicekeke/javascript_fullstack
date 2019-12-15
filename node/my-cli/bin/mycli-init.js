// #!/usr/bin/env node

const command = require('commander')
const path = require('path')
const fs = require('fs')
const ora = require('ora') //命令行loading图标
const glob = require('glob')  //匹配各种文件路径
const inquirer = require('inquirer')
// 静态站点生成 eg:hexo markdown -> hcj 不需要数据库 就可以直接访问
const metalSmith = require('metalsmith')
const handlebars = require('handlebars')
const downLoadRepo = require('download-git-repo')

const args = command.parse(process.argv).args
let projectName = args[0]
let list = glob.sync('*')
if (list.length) {
  // 过滤出来有结果，证明存在相同的文件
  if(list.filter(fileName => {
  }).length !==0) {
    console.log(`项目已经存在${projectName}`)
    return
  }
}
// 开始下载
go() ;
function go() {
  const loading = ora('正在下载项目').start();
  download()
  .then(() => {
    loading.succeed()
    // prompt 一问一答 需要配置
    return inquirer.prompt([
      {
        name: 'projectName',
        message: '项目名称',
        default: projectName
      },
      // 单选类型
      {
        name: 'css',
        message: '使用css预处理器',
        choices: ['less', 'stylus'],
        default: 'less',
        type: 'list'
      },
      // 确认类型
      {
        name: 'router',
        message: '使用router',
        type: 'confirm'
      }
    ])
  })
  .then(meta => {
    // meta用户输入的内容 对象形式
    console.log(meta);
    return new Promise((resolve, reject) => {
      // current work dir
      metalSmith(process.cwd()).metadata(meta).clean(false)
      // 文件源应该被配置 但这里写死
      .source(`${projectName}/.temp`)
      // 最终编译好的文件存放地址
      .destination(`${projectName}`)
      .use((file, metas,done) => {
        // console.log(file);
        const fileNames = Object.keys(file)
        // 遍历替换模板 -> 下载的模板文件mustache替换为用户输入
        fileNames.forEach( fname => {
          const content = file[fname].contents.toString()
          // handlebars.compile提前转换为字符串
          const compliedContent = handlebars.compile(content)(meta)
          // 替换 编译完的同时转回去
          file[fname].contents = Buffer.from(compliedContent)
        })
        // 编译功能完成 文件生成后删除临时文件
        done()
      })
      .build((err) => {
        rm('source')  //删除下载下来的临时文件
        if(!err) { resolve() } else { reject() }
      })
    })
  })
  .catch(() => {
    loading.fail()
  })
}
function download() {
  return new Promise((resolve, reject) => {
    // url写法特殊，并且要接主分支
    downLoadRepo('github:MengZhaoFly/my-cli-test#master', 
    `${projectName}/.temp`,{ clone: true}, (err) => {
      if (err) {
        reject(err)
      } else {
        resolve(`${projectName}/.temp`);
      }
    })
  })
}



