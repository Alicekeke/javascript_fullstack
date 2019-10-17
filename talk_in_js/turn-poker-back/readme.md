### turn-poker-back 猫猫连连看
- sort随机排序
- animation旋转动画
- 原生js操作dom树
- setTimeout 延迟判断 异步操作
- 连连看逻辑实现



#### sort排序
 sort() 方法可以接受一个方法为参数 ，该方法有两个参数。分别代表每次排序比较时的两个数组项。

 sort()排序时每次比较两个数组项都会执行这个参数，并把两个比较的数组项作为参数传递给这个函数。

 当函数返回值为1的时候就交换两个数组项的顺序，否则就不交换。
```
 var arr = [1,2,3,4,5];

 function sortby(arr) {
     arr.sort(function () {
        return Math.random() - 0.5;
     });
  }
```
 更简洁的es6写法
 ```
 function sortby(arr) {
     arr.sort((a,b) => 0.5 - Math.random())
 }在(0~1)取中位数与0.5比较 随机返回值 随机决定是否交换数组项参数位置参数
```

```
// 升序
 arr.sort((a,b) => a - b);
 console.log(arr)

// 降序
 arr.sort((a,b) => b - a)
 console.log(arr)

// 乱序 伪随机 并不能真正的打断数组
 arr.sort((a,b) => 0.5 - Math.random())
 console.log(arr)
 ```