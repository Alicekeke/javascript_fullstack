// 原生js获取DOM结构赋值给parent变量
var parent = document.getElementById('content-items');
var send = document.getElementById('send');
    //事件监听(事件名，方法名),点击事件触发一系列添加函数
send.addEventListener('click', function() {
// DOM树上创造一个元素
var li = document.createElement('li')
    // setAttribute()修改标签上的属性
li.setAttribute('class', 'content-item')

var pic = document.createElement('div')
pic.setAttribute('class', 'pic')
li.appendChild(pic)

    //再添加img,detail元素
var img = document.createElement('img')
img.setAttribute('src', './images/tx.jpg')
pic.appendChild(img)

var message = document.createElement('div')
message.setAttribute('class', 'message')
li.appendChild(message)

var p1 = document.createElement('p')
p1.setAttribute('class', 'name')
var p1Text = document.createTextNode('我超级可爱的！')
p1.appendChild(p1Text)
message.appendChild(p1)

var p2 = document.createElement('p')
p2.setAttribute('class', 'detail')
var p2Text = document.createTextNode('今天也是爱你的一天')
p2.appendChild(p2Text)
message.appendChild(p2)
console.log(li)
parent.appendChild(li)
})

