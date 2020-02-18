// 手写一个promise

 let p1 = Promise.resolve(1)
 let p2 = Promise.resolve(2)
 let p3 = new Promise((resolve, reject) => {
   setTimeout(() => {
     resolve(3)
   }, 2000)
 })

 Promise.myall([p1, p2, p3]).then(console.log)

 /**
 * 首先了解promise.all
 * 接收一个promise数组，在resolve都执行完毕后 返回一个新的promise实例，
 * 当reject执行则整个promise都会reject, 等多个promise回调返回后进行下一步操作。
 */

 Promise.myall = function(promiseProps) {
  //  需要一个数组接收所有promise返回的reslove
  let result = []
  return new Promise((resolve, reject) => {
    promiseProps.forEach(promise => {
      // 拿到他们的resolve
      promise.then(res => {
        result.push(res)
        // 数组组装好 返回全部reslove的结果
        if(result.length === promiseProps.length) {
          resolve(result)
        }
      }).catch(err => {    // 在执行过程中出现错误 reject捕获返回
        reject(err)
      })
    })
  })
 }