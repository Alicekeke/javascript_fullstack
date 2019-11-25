const Koa = require('koa')
const KoaRouter = require('koa-router')
const app = new Koa()
const router = new KoaRouter({prefix: '/api'}) //prefix自定义前缀
// app.use 加载一个中间件
// request -> response
// request -> middleWarel -> middleWare2 ->  response
// ctx: { request, responce}
router.get('/user', async(ctx) => {
  let userInfo = fs.readFileSync('./api/user.json').toString(); //代码在这里阻塞 读取
  ctx.body = {
    data: JSON.parse(userInfo),
    code: 200
  }
})

// 文件读取完自动映射为路由 生成请求的url
const glob = require('glob')
const path = require('path')  //用来做路径检查
glob.sync(path.resolve('./api/', '*.json'))       //api下所有json文件都拿到
.forEach((item, i) => {
  let apiJsonPath = item && item.split('/api')[1];
  // 字符串处理，只需名字
  let apiPath = apiJsonPath.replace('.json', '')
  // 根据名字请求对应文件
  router.get(apiPath, async (ctx) => {
    let fileData = fs.readFileSync(item)
    ctx.body = {
      data: JSON.parse(fileData),
      code: 200
    }
  })
})
// 假数据别写死在代码中 在user.json中将代码抽离
// app.use(async (ctx) => {
//   ctx.body = {
//     code: 200,
//     msg: 'ok'
//   }
// })

//访问api/user  定义自己的路由 区分不同的请求 
app.use(router.routes()).use(router.allowedMethods())

app.listen(3000, ()=>{
  console.log("serer is running http://localhost:3000");
  
})