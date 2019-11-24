/*
函数防抖（debounce）：当持续触发事件时，一定时间段内没有再触发事件，
事件处理函数才会执行一次，如果在delay结束之前，又一次触发了事件，
新触发防抖函数就会导致计时器重置，要重新等待delay时长之后才能执行。
*/

// 防抖
export function debounce (func, delay) {
  let timer
  return function (...args) {  // 有没有参数都可以写arguments
    if (timer) {  //settimeout的时间还没过
      clearInterval(timer) //重复执行延时器，规避一直点击的情况
    } 
    // 经过delay的时间没有输入，再执行被防抖保护的func方法
    // 可以避免用户不断向服务器发送请求
    timer = setTimeout(() => {
      func.apply(this, args) //绑定自己的this作用域不被别人影响而修改 call/apply 同样可以实现
    }, delay);
  }
}

// 节流
/*
函数节流（throttle）：当持续触发事件时，保证一定时间段内只调用一次事件处理函数。
就像为了不浪费，调小水龙头
原理是通过判断是否到达一定时间来触发函数
*/
export function throttle (func, delay) {
  var timer = null;
  var startTime = Date.now();
  return function() {
          var curTime = Date.now();
          var remaining = delay - (curTime - startTime);  //计算剩余时间remaining
          var context = this;
          var args = arguments;
          clearTimeout(timer);
        // 如果在remaining这段时间中如果又一次触发事件，那么会取消当前的计时器，并重新计算一个remaining来判断当前状态。
           if (remaining <= 0) {  //剩余时间<0 表面该执行既定函数了
                 func.apply(context, args);   
                 startTime = Date.now();
           } else {
                 timer = setTimeout(func, remaining); //没到时间就在剩余时间后触发
           }
   }
}

/*
区别： 函数节流不管事件触发有多频繁，都会按delay间隔连续执行，都会保证在规定时间内一定会执行一次真正的事件处理函数，
而函数防抖只在最后一次判断有效的触发执行。
*/