var fs = require('fs')
var AipImageClassifyClient = require('baidu-aip-sdk').imageClassify //引入图片分类功能

var APP_ID = '111111111'
var API_KEY = 'XXXXXXXXXXXXXXXXXX'
var SECRET_KEY = 'VVVVVVVVVVVVVVVVVVVVVVVVV'

var image = fs.readFileSync('../car/car.jpg').toString('base64') //读取完成后 同步执行操作 转换成体积更小的base64

var client = new AipImageClassifyClient(APP_ID, API_KEY, SECRET_KEY)
client.carDetect(image).then(function(result) {
  console.log(result)
})
.catch(function(err) {
  console.log(err)
})