/**
 * -----------面向过程 (代码难复用)--------------
 * */ 
const canvas = document.getElementById('screen')  //获取到上下文
const ctx = canvas.getContext('2d') //获取2d渲染canvas的上下文
const width = 200, height = 100
ctx.width = width + "px"
ctx.height = height + "px"

// 点击canvas再绘一次
canvas.addEventListener('click', function(){
  ctx.clearRect(0,0,width,height) //清楚canvas，再给宽高
  drawLine()
  drawText()
})

// 画多条绘制直线
function drawLine(){
  for(let i = 0; i < 6; i++){
    var beginX = Math.random() * width
    var beginY = Math.random() * height
    var endX = Math.random() * width
    var endY = Math.random() * height

    ctx.beginPath();  //开始画线
    ctx.moveTo(beginX,beginY) //起点
    ctx.lineTo(endX,endY)  //终点
    ctx.strokeStyle = `rgb( ${ Math.random() * 255},${ Math.random() * 255},${ Math.random() * 255})`
    ctx.stroke(); //绘制图形轮廓
  }
}
drawLine()
drawText()

// 画字母
function drawText(){
  var sourceText = 
  ['a', 'b', 'c', 'd', 'e',
  'f', 'g', 'h', 'i', 'j',
  'k', 'l', 'm', 'o', 'p',
  'q', 'r', 's', 't', 'u',
  'v', 'w', 'x', 'y', 'z']
  // 选四个随机不重复的值
  let result = []
  for(let i = 0; i < 4; i++){
    const idx = Math.floor(Math.random() * sourceText.length)
    //删除选中的防止重复
    result.push(sourceText[idx])
    sourceText.splice(idx,1)
  }
  console.log('result',result)
  for(let i = 0; i < 4; i++){
    ctx.font = '40px arial'
    ctx.fillStyle =  `rgb( ${ Math.random() * 255},${ Math.random() * 255},${ Math.random() * 255})`
    ctx.textBaseLine = 'middle' //基准线 top bottom
    let preWidth = width / 4 -10   //把canvas分成四份，分别放上字母，不能让字超出右边界，所以减10px
    ctx.fillText(result[i], Math.random() * preWidth + i * preWidth, height/2) //填上文本, 后面的字母要减去前面字母所占位
    }
}

