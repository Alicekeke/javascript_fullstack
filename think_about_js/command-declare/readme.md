## 声明式编程与命令式编程

- 类数组
  通过数组的索引获取值，有类似数组的属性、方法的特殊对象(数组也是对象)，如：有length长度
  可通过 `Array.isArray()` 判断是否为数组
  - arguments
    典型的类数组，每一个普通函数都有arguments，不是数组但可以通过下标获取值
  - 类数组转为真正的数组 `Array.from()`
##### arguments  实参列表

##### 解构赋值
map是针对数组的方法，封装了循环的细节
##### reduce  累加器
```
arr1.reduce((a, b) => {
    return ({
      key: a.key + b.key  //必须返回一个回调
    })
  })
```
第二次的pre就是上一次pre + next的结果