var fs = require('fs')
var AipOcrClient = require('baidu-aip-sdk').ocr //图片识别 从图片中提取文字 较复杂 所以另外开一个ocr

var image = fs.readFileSync('../car/car.jpg').toString('base64')  //文件本身就是二进制
var APP_ID = '111111111'
var API_KEY = 'XXXXXXXXXXXXXXXXXX'
var SECRET_KEY = 'VVVVVVVVVVVVVVVVVVVVVVVVV'

var client = new AipOcrClient(APP_ID, API_KEY, SERCRET_KEY)
var options = {}
client.licensePlate(image, options).then(function(result) {
  console.log(result)
})
.catch(err => {
  console.log(err)
})
