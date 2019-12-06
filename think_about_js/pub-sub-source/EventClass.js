class Events {
  constructor(){
    this.listener = { //!!! listener在这里收集 on订阅
      'key' : [

      ]
    } 
    // --------------------------------
    const subPub = {
      'price': [
        () => { console.log(3)},
        () => { console.log(4)}
      ],
      'paraer':[]
    } 
    //price对应的方法执行一遍 (添加)
    for (let i=0; i<subPub.price.length; i++) {
      subPub.price[i]()
    }
    //在subPub上面添加一个 value 为数组 key(foo) 把foo方法放进数组中
    function foo(){
      console.log('foo')
    }
    // js是弱类型的语言，可以直接添加属性
    subPub.key = [foo]
    console.log(subPub)
  }
  // --------------------
  on(key, fn) {
    if (!this.listener[key]){
      this.listener[key] = [] // 没有归进新建分类
    }
    this.listener[key].push(fn)
    //this.listener.push(fn)
    //把订阅的收集起来,key用来分类，此时listener应为对象
  }
  emit(key) {
    for (let i=0; i<this.listener[key].length; i++) {
      console.log('---',this.listener[key][i])
      this.listener[key][i]()
    }
    }
  }
const ev = new Events()
// 很多订阅，先不执行，收集起来放在一个数组里，到发布时执行
ev.on(('1'),() => {console.log(1)}) //on通知订阅的函数，该干啥干啥去
ev.on(('1'),() => {console.log(1)})
//发布
ev.emit('1')
// 最后填入发布订阅名
