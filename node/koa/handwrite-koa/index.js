// let http = require('http')

// let server = http.createServer(( req, res ) => {
//   res.end('hello world')
// } )

// server.listen(3000, () => {
//   console.log('server is running localhost3000');
// })

// const Koa = require('koa')
// const app = new Koa()

// app.use((ctx, next) => {
//   ctx.body = 'hello Koa'
// })

// app.listen(3000)


// 对比可知 api使用区别 
// 原生的creatServer封装为use; 
//  res,req => ctx
// 

let myKoa = require('./lib/application')
let app = new myKoa()

app.use((ctx) => {
  // res.end('hello myKoa')
  // 
  console.log(ctx.req.url);
  console.log(ctx.request.req.url);
  console.log(ctx.response.req.url);
  console.log(ctx.response.req.url);
  console.log(ctx.request.url);
  console.log(ctx.response.url);
  console.log(ctx.url);
  console.log(ctx.path);

  ctx.body = {
    name: 'keke',
    age: '18'
  }
  console.log(ctx.body);    //ctx.request.body ==代理==> ctx.body
  
  
})

app.listen(3000)