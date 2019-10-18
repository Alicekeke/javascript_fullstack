let data = [
  { value: '嘿嘿！测试弹幕1', time: 5, color: 'red', speed: 1, fontSize: 22},
  { value: '嘿嘿！测试弹幕2', time: 10, color: 'red', speed: .5, fontSize: 12},
  { value: '嘿嘿！测试弹幕3', time: 2, color: 'yellow', speed: 3, fontSize: 16},
  { value: '嘿嘿！测试弹幕4', time: 7}
]

// 获取到所有需要的dom结构
let canvas = document.querySelector('#canvas')
let video = document.querySelector('#video')
let $txt = document.querySelector('#text')
let $btn = document.querySelector('#btn')
let $color = document.querySelector('#color')
let $range = document.querySelector('#range')

// *CanvasBarrage用作canvas渲染整个屏幕
class CanvasBarrage {
  constructor(canvas, video, opts={}) { //opts没传就为空对象，防止报错 
    //如果video和canvas都没传值
    if(!canvas || !video){
      return
    }
    //增加属性，挂载到this上
    this.video = video
    this.canvas = canvas
    this.canvas.width = video.width
    this.canvas.height = video.height
    //获取画布
    // canvas的应用
    this.ctx = canvas.getContext('2d')//getContext() 方法返回一个对象，该对象提供了用于在画布上绘图的方法和属性。
    // 设置默认参数,在没有传参时使用
    let defOpts = {
      color: '#ffb',
      fontSize: 16,
      speed: 1.5,
      opacity: 0.5,
      data: []
    }
    
    //合并对象全部挂载到this实例上 opts是合并完传给的目标对象
    Object.assign(this, defOpts, opts)
    // 添加属性，用来判断播放状态，默认true是暂停
    this.isPaused = true
    //获取所有的弹幕消息
    this.barrages = this.data.map(item => new Barrage(item, this)) //map遍历数组，foreach
    // 渲染弹幕
    this.render()
  }

render(){
  //先清除原有的画布
  this.clear()
  // 渲染弹幕出现
  this.randerBarrage()
  // 如果没有暂停的话就继续渲染
  if(this.isPaused === false){
    requestAnimationFrame(this.render.bind(this))    //requestAnimationFrame逐帧渲染动画，60hz刷新异步调用
    // bind保证该this作用域不会被修改 递归调用render 保证第一次渲染过后也能取到this作用域
    }
  }
  clear(){
    // 清除画布
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  randerBarrage() {
    // 根据视频播放的时间和弹幕展示的时间做比较，来判断是否展示弹幕
    let time = this.video.currentTime
    this.barrages.forEach(barrage => {
      // 只有在视频播放的时间大于等于弹幕展示的时间，才做处理
      if (!barrage.flag && time >= barrage.time) {
        // 判断当前弹幕是否初始化了
        if (!barrage.isInit) {
          barrage.init()
          barrage.isInit = true
        }

        // 弹幕从右往左渲染，所以X坐标减去当前弹幕的速度speed
        barrage.x -= barrage.speed
        barrage.render()

        //如果当前弹幕的x坐标比自身宽度还小，就表示渲染结束
         if (barrage.x < -barrage.width) {
          barrage.flag = true
         }
      }
    });
  }
  add(obj) {
    this.barrages.push(new Barrage(obj, this)) //每一条弹幕都需要用Barrage构造函数过滤初始化才能推进数组
  }
}
//创建Barrage类，用来实例化每一条弹幕
class Barrage {
  constructor(obj, ctx){
    this.value = obj.value
    this.time = obj.time
    this.obj = obj
    this.context = ctx
  }

  init(){
    // 如果得到的数据中没有涉及到以下值，那就用默认值
    this.color = this.obj.color || this.context.color
    this.speed = this.obj.speed || this.context.speed
    this.opacity = this.obj.opacity || this.context.opacity
    this.fontSize = this.obj.fontSize || this.context.fontSize

    // 因为不能直接操纵canvas画布里的元素，则创建p来绑定每一条弹幕，来计算弹幕的大小与宽度
    let p = document.createElement('p')
    p.style.fontSize = this.fontSize + 'px'
    p.innerHTML = this.value
    document.body.appendChild(p)
    this.width = p.clientWidth //cilentWidth获取当前容器的宽度(不包含padding，margin)
    document.body.removeChild(p) //得到宽度就可以移除p了

    //设置弹幕出现的位置
    this.x = this.context.canvas.width //右边进入，即画布宽度
    this.y = this.context.canvas.height * Math.random()

    // 特殊处理，防止在y轴的位置比自己fontSize还小
    if(this.y < this.fontSize){
      this.y = this.fontSize
    }else if(this.y > this.context.canvas.height - this.fontSize){
      this.y = this.context.canvas.height - this.fontSize
    }
  }

  //渲染每一条弹幕
  render(){
    //设置画布字体
    this.context.ctx.font = `${this.fontSize}px Arial`
    // 设置画布文字颜色
    this.context.ctx.fillStyle = this.color
    // 绘制文字，坐标
    this.context.ctx.fillText(this.value, this.x, this.y)
  }
}

let canvasBarrage = new CanvasBarrage(canvas, video, {data})
video.addEventListener('play', ()=>{ //设置video的play事件来调用CanvasBarrage实例的render方法
  canvasBarrage.isPaused = false
  canvasBarrage.render() //触发弹幕
})

//获取input框值 发送弹幕的方法
function send(){
  let value = $txt.value
  let time = video.currentTime
  let color = $color.value
  let fontSize = $range.value
  let obj = { value, time, color, fontSize } //
  canvasBarrage.add(obj)
  $txt.value = ''; // 清空输入框
}

$btn.addEventListener('click',send)