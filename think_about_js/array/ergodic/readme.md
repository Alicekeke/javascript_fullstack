# 数组遍历方法的使用及实现

## 常见的数组遍历方法
- 普通 for循环
- forEach
- map
- filter
- reduce
- reduceRight
- some
- every
- indexOf
- lastIndexOf
- find
- findIndex
- for...of 语句
- entries，keys，values

### 普通for循环
```
 /* 1、普通for语句优化
        遍历时只计算一次数组长度
        push(4),并没有改变原来的数组长度，数组也不变
    */
    var a = [1, 2, 3];
     for (let i = 0, len = a.length; i < len; i++){
       console.log(a[i]);
       a.push(4);
     }
```

### forEach
  forEach() 方法对数组的每个元素执行一次提供的函数,没有返回值，对原数组没有影响，不支持IE
  >     value: 当前正在处理的项；index：当前项的索引；arr：正在操作的原始数组；

  - forEach的使用
```
  a.forEach(function(value, index, arr){
      console.log(value)  //1,2,3
      console.log(index)  //0,1,2
      console.log(arr)  //[1,2,3]
    })
```
-  实现一个 myForeach 功能和 forEach 一样
  
把value，index，arr参数抛出 cb是接收到这三值的回调函数
```
    Array.prototype.myForeach = function(cb) {
      var arr = this  //保存作用域
      for (let i = 0; i < arr.length; i++) {
        cb(arr[i], i, arr)
      }
    }
    a.myForeach(function(value, index, arr){
      console.log(value, index, arr);
    } )
```
  注意：foreach会把元素全部暴露抛出，不能中止循环。可以用every，some，find，findIndex，这些方法会先对数组元素做判断

### map
map() 方法创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果。    
map 与 forEach 的区别：map 可以改变当前循环元素的值，最终返回一个改变过值的新数组，且不修改调用它的原数组本身。     
所以 map 用在通过某方法修改数组中每一个元素的值的情况。
- map的使用
```
  var reta = a.map(function(value, index, arr){
      console.log(value)  //1,2,3
      console.log(index)  //0,1,2
      console.log(arr)  //[1,2,3]
      return value * 2
     } )

     console.log(reta)  //[2,4,6]

```
- map的实现
```
 Array.prototype.myMap = function(cb) {
      var arr = this
      var retArr = []
      for (let i = 0; i < arr.length; i++) {
        var cbValue = cb(arr[i], i, arr)
        retArr.push(cbValue)
      }
      return retArr
    }
    var myReta = a.myMap(function(value,index,arr) {
      console.log(value,index,arr);
      return value * 2
    })
    console.log(myReta) //[2,4,6] 新数组
```

### filter
   filter() 方法创建一个新数组, 其包含通过所提供函数实现的测试的所有元素
  返回一个新的、由通过测试的元素（返回true或等价于true的值）组成的数组，如果没有任何数组元素通过测试，则返回空数组。
   return false 过滤掉不符合条件的值

  - filter的使用
```
  var filterA = a.filter(function(value, index, arr) {
     console.log(value)  //1,2,3
      console.log(index)  //0,1,2
      console.log(arr)    //[1,2,3]
      if( value === 2 ) {
        return false
      } 
      return true
    })
    console.log(filterA)  //[1]
```
  - filter的实现
```
 Array.prototype.myFilterA = function(cb) {
      var arr = this;
      var retArr = []
      for(let i = 0; i < arr.length; i++) {
        var cbValue = cb(arr[i],i,arr)
        if(cbValue) { //return false 则不放入新数组
          retArr.push(arr[i])
        }
      }
      return retArr
    }
    var filterA = a.myFilterA(function(value, index, arr) {
      console.log(value)
      console.log(index)
      console.log(arr)
      if( value === 2 ) {
        return false
      } 
      return true
    })
    console.log(filterA)
```

### reduce
  reduce:累加器， 为数组中的每一个元素依次执行回调函数，不包括数组中被删除或从未被赋值的元素，  
    语法：`arr.reduce(callback,[initialValue])`    

     > callback （执行数组中每个值的函数，包含四个参数）

      1、previousValue （上一次调用回调返回的值，或者是提供的初始值（initialValue））
      2、currentValue （数组中当前被处理的元素）
      3、index （ 可选，当前元素在数组中的索引）
      4、array （可选，调用 reduce 的当前数组）

      initialValue （作为第一次调用 callback函数第一个参数的值。）
- reduce的使用
```
 //  reduce实现简单和乘
    var sum = a.reduce((previousValue,value,index,array) => { 
      console.log(previousValue,value,index,array)  
      // 输出 1,2,1,[1,2,3] 这里index从1开始，previousValue是1，循环两次；当指定调用第一个值`initialValue`，则会从0开始(包括累加`initialValue`的值)调用4次
      //      3,3,2,[1,2,3]
      return previousValue+value 
    },4)
      console.log(sum)
```
- 注意：提供初始值通常更安全，如果没有提供initialValue，
         reduce 会从索引1的地方开始执行 callback 方法，跳过第一个索引。如果提供initialValue，从索引0开始

- reduce的实现
```
  Array.prototype.myReduce = function(cb, initialValue) {
      var arr = this
      for (var i = 0; i<arr.length; i++) {
        var cbValue = cb(initialValue, arr[i], i, arr)
        // 初始值 -> 下一个的值
        initialValue = cbValue
      }
      return initialValue
    }
    var b = a.myReduce(function(previousValue, value, index, arr) {
    console.log(previousValue,value,index,arr);  
    // 输出
    // 4 1 0  [1, 2, 3]
    // 5 2 1  [1, 2, 3]
    // 7 3 2  [1, 2, 3]
      return previousValue + value;
    }, 4);
    console.log(a); //[1,2,3]
    console.log(b); //10
```

###  reduceRight
   reduce是由左往右，reduceRight是由右往左，实现时遍历的`var i=arr.length;i<0;i--`

###   some
  some() 方法测试数组中是不是至少有1个元素通过了被提供的函数测试。返回一个Boolean类型的值。找到符合条件的返回true    

  不会改变原数组，找到符合条件即停止循环，剩余的元素不会再执行检测

- some的使用
```
  var ret = a.some(function(value,index,arr){
      // console.log(value,index,arr)
      return value === 3
    }) 
    console.log(ret)
```
- some的实现
```
    Array.prototype.mySome = function(cb) {
      var arr = this
      var isBool = false
      for(var i=0; i<arr.length; i++) {
        var cbValue = cb(arr[i], i, arr)
        if(cbValue){
          isBool = true
          return isBool //找到即返回，结束循环
        }
      }
      return isBool
    }
    var myRet = a.mySome(function(value,index,arr){
      // console.log(value,index,arr)
      return value === 2
    })
    console.log(myRet)

```

### every
    every 测试数组中所有元素是否都满足 retrun 的条件；返回boolean值，都满足返回true，空数组全返回true

- every的使用
```
  var ret = a.every(function(value,index,arr){
      console.log(value,index,arr)
      return value > 0
    })
    console.log(ret)  //true
```
- every的实现
```
  Array.prototype.myEvery = function(cb) {
      var arr = this;
      var isBool = true;
      for (var i = 0; i < arr.length; i++) {
        var cbValue = cb(arr[i], i, this);
        if (!cbValue) {   //与some相反，不满足条件则false
          isBool = false;
          return isBool;
        }
      }
      return isBool;
    }
    var myRet = a.myEvery(function(value,index,arr){
      console.log(value,index,arr)
      return value > 0
    })
    console.log(myRet)  //true
    console.log(a)
```

###   indexOf
  indexOf()方法返回在数组中可以找到一个给定元素的**第一个索引值**，如果不存在，则返回-1

- indexOf的使用
```
console.log(a.indexOf(3))
```
- indexOf的实现
```
Array.prototype.myIndexOf = function(value) {
      var arr = this;
      var index = -1;
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] === value) {
          index = i;
          return index;
        }
      }
      return index;
    };
    console.log(a.myIndexOf(3))   //下标 2
```

###  find
   find返回数组中满足条件的第一个元素的**值**。否则返回 undefined。

 - find的使用
  ``` 
    console.log(a.find((n) => n > 2))
  ```
- find的实现
  ```
  Array.prototype.myFind = function(cb) {
    for (var i = 0; i < this.length; i++) {
      if (cb(this[i])) {
        return this[i];
      }
    }
    return null;
  };
  console.log(a.myFind((n) => n > 2))   //3
  ```

### findIndex
  findIndex()方法返回数组中满足提供的测试函数的**第一个**元素的**索引**。否则返回-1。

- findIndex的使用
``` 
console.log(a.findIndex((n) => n > 2));
```

- findIndex的实现

```
Array.prototype.myFindIndex = function(cb) {
  for (var i = 0; i < this.length; i++) {
    if (cb(this[i])) {
      return i;
    }
  }
  return null;
};
console.log(a.myFindIndex((n) => n > 2))   //2
```

### for...of
```
  // for of普通遍历
    var a = [1, 2, 3];
    for (var value of a) {
      // console.log(value) // 结果依次为1，2，3
    }
    // for of获取key值
    for (let [index, value] of a.entries()) {
      console.log(index, value);
    }
```

### entries，keys，values

####  keys

  keys() 方法返回一个包含数组中每个**索引键**的Array Iterator对象

  ```
    console.log(["a","b"].keys())
    for (let index of ["a", "b"].keys()) {
      console.log(index);  //0,1
    }
  ```
####  values
  values() 方法返回一个新的 Array Iterator 对象，该对象包含数组每个索引的 **值**
  ```
    for (let elem of ["a", "b","c"].values()) {
      console.log(elem);  //a,b,c
    }
  ```

#### entries
  entries() 方法返回一个新的Array Iterator对象，该对象包含数组中每个**索引的键/值对**
  ```
    for (let [index, elem] of ["a", "b","c"].entries()) {
      console.log(index, elem); //0 a, 1 b, 2 c
    }
  ```