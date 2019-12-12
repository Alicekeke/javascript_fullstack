// apply方法传入两个参数，第一个参数就是this的指向，
// 第二个参数就是函数参数组成的数组；而call传入多个参数，
// 第一个参数也是this的指向，之后的参数都是函数的参数
// 手写call函数
Function.prototype.myOwnCall = function(context) {
  // 传入null，this指向window
  context = context || window;
  var uniqueID = "00" + Math.random();
  while (context.hasOwnProperty(uniqueID)) {
    uniqueID = "00" + Math.random();
  }
  context[uniqueID] = this;
  //获取arguement数组 
  var args = [];
  for (var i = 1; i < arguments.length; i++) {  
    args.push("arguments[" + i + "]");
  }
  // eval计算传入的字符串，并执行其中的代码
  var result = eval("context[uniqueID](" + args + ")");
  delete context[uniqueID];
  return result;
}


// 手写apply
Function.prototype.myOwnApply = function(context, arr) {
  context = context || window
  var uniqueID = "00" + Math.random();
  while (context.hasOwnProperty(uniqueID)) {
    uniqueID = "00" + Math.random();
  }
  context[uniqueID] = this;

  var args = [];
  var result = null;
 
  if (!arr) {
    result = context[uniqueID]();
  } else {
    for (var i = 0; i < arr.length; i++) { 
      args.push("arr[" + i + "]");
    }
    result = eval("context[uniqueID](" + args + ")");
  }
  delete context[uniqueID];
  return result;

}
