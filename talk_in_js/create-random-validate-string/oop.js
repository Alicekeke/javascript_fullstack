/**
 *  ------------面向对象--------三大特征(封装；继承；多态) js没有多态
 * 用面向对象的方法改写
 * 
 */

const width = 200, height = 100

class Gcode{
  // 抽象的，不知道指向谁，但构造函数把共有的需要属性添加
  constructor(el){
    this.$el = document.getElementById(el)
    this.ctx = this.$el.getContext('2d')
    // 初始化操作都放构造函数中
    this.ctx.width = width + "px"
    this.ctx.height = height + "px"
    this.drawLine()
    this.drawText()
   /**这里不改this指向报错了
    *  this知识点啊！朋友! 
    * 原因：this谁调用指向谁，普通函数this这里指向调用者（$el）作用域而非类(Gcode)作用域
    * 解决方法：1：在外部保存this作用域
    *          2：function改成箭头函数，箭头函数this指向外面一层作用域
    */

    // let that = this
    this.$el.addEventListener('click',()=>{
      this.ctx.clearRect(0,0,width,height)
      this.drawLine()
      this.drawText()
    })
  } 
  drawLine(){
    for(let i = 0; i < 6; i++){
      var beginX = Math.random() * width
      var beginY = Math.random() * height
      var endX = Math.random() * width
      var endY = Math.random() * height
  
     this.ctx.beginPath();  //开始画线
     this.ctx.moveTo(beginX,beginY) //起点
     this.ctx.lineTo(endX,endY)  //终点
     this.ctx.strokeStyle = `rgb( ${ Math.random() * 255},${ Math.random() * 255},${ Math.random() * 255})`
     this.ctx.stroke(); //绘制图形轮廓
    }
  }
  drawText(){
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
     this.ctx.font = '40px arial'
     this.ctx.fillStyle =  `rgb( ${ Math.random() * 255},${ Math.random() * 255},${ Math.random() * 255})`
     this.ctx.textBaseLine = 'middle' //基准线 top bottom
      let preWidth = width / 4 -10   //把canvas分成四份，分别放上字母，不能让字超出右边界，所以减10px
     this.ctx.fillText(result[i], Math.random() * preWidth + i * preWidth, height/2) //填上文本, 后面的字母要减去前面字母所占位
      }
  }
}
// new时才知道$el具体指向谁
// 具体的，生成类的实例
let obj1 = new Gcode('screen')
let obj2 = new Gcode('screen1')
let obj3 = new Gcode('screen2')
