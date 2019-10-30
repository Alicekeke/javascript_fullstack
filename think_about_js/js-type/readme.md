## js基础之数据类型

#### typeof
- 基本数据类型 除了null 都能判断出来    
- 复杂数据类型 除了 function都不能判断出来    

#### constructor
- constructor只不过是对象上的属性，非常不稳定，很容易被修改   

#### instanceof
- "js一切皆对象" 所以  * instanceof Object  本职就是判断对象是否为类的实例，不适合做类型判断    

#### Object.prototype.toString.call
- 终极解决方法
  Object实例对象的方法        
  Object.prototype.toString用于返回字符串说明对象的类型   
  数组、字符串、函数、Date 对象都分别部署了自定义的toString方法，覆盖了Object.prototype.toString方法。    
  所以这里要拿到toString用于类型判断的方法需要再往下拿，并使用call绑定this指向    
  [Object详解](https://wangdoc.com/javascript/stdlib/object.html#tostring-%E7%9A%84%E5%BA%94%E7%94%A8%EF%BC%9A%E5%88%A4%E6%96%AD%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B)

### 拓展：函数柯里化
>  柯里化：柯里化是一种将使用多个参数的一个函数转换成一系列使用一个参数的函数的技术 
     
函数柯里化参数复用。本质上是降低通用性，提高适用性    

bind 不同于 apply、call就在于它返回一个参数 达到参数柯里化的目的    