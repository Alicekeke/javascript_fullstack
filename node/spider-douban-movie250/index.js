const https = require('https');
const cheerio = require('cheerio') // cheerio用来解析html
const http = require('http')

// 预想的回调函数
// doubanSpider('https://movie.douban.com/top250', (data) => {
//   // 得到结果 
//   console.log(data)
// })
function doubanSpider(url, cb) {
  https.get(url, (res) => {
    // node语言风格：回调,流的形式传输，不是一次传完,需要每一次得到都进行一次拼接
    let html = '';
    res.on('data', (chunk) => {
      html += chunk
    })
    res.on('end', () => {
      // console.log(html)
      // jquery
      const $ = cheerio.load(html);
      let movies = []
      $('li .item').each(function () {
        // 检查选中元素 循环拿到每一项，回调处理，拿到每一个电影
        const picUrl = $('.pic img', this).attr('src'); // $('.pic img', this)this用来限制，当前电影的pic img
        const title = $('.info .title', this).text();
        const star = $('.star .rating_num', this).text() //审查元素 注意空格
        const inq = $('.inq', this).text();
        // 先将数组拼装
        movies.push({
          picUrl,
          star,
          title,
          inq
        })
        // 这一步踩坑了，movies应该以数组形式存取，直接填入扔给回调字符串格式页面res.json不能解析
        // cb({
        //   picUrl,
        //   star,
        //   title,
        //   inq
        // })
      })
      cb(movies)
    })
  })
}

http.createServer((req, res) => {
    doubanSpider('https://movie.douban.com/top250',
      (data) => {
        console.log('data', data)
        res.writeHead(200, {
          'Content-type': 'application/json',
          'Access-Control-Allow-origin': '*'
        }) //编写响应头
        res.end(JSON.stringify(data)) //正式响应 JSON.stringify,json转为字符串 因为end要求必须为字符串
      }) //监听端口，被发起请求执行
    // 这里监听应该放在createServer创建完成后
  })
  .listen(3000, () => {
    console.log('server is running 3000')
  })