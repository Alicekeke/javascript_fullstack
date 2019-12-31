    // 回调的两个经典例子
    function readFile(path, cb) {
      setTimeout(() => {
        // cb('文件不存在')
      }, 3000);
    }
      readFile('./jq.js', (data) => {
        console.log(data)   //3s data === 文件不存在
      })


      
      // 实现一个 myForeach 功能和 forEach 一样
      var arr = [0,1,2,3]
      // forEach接收一个回调函数 在myforEach之前 用for实现循环 基于老api实现新api
      arr.forEach((el, i, ctx) => {
        console.log(el, i, ctx);  //el每一项的值，i数组索引，ctx当前遍历的数组 值每次都是一样的
      })
      // 把el，i，ctx参数抛出 cb是接收到的回调函数
      function myForeach (cb) {
        for (let i = 0; i < arr.length; i++) {
          cb(arr[i], i, arr)
        }
      }
      myForeach( (el, i, ctx) => {
        console.log(el, i, ctx);
      } )
