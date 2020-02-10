# ES5 和 ES6对象遍历方法
1. for...in
2. for...of
3. Object.keys()
4. Object.getOwnPropertyNames()
5. Reflect.ownKeys()
6. Object.getOwnPropertyDescriptors()


### for...in

用来遍历对象的可枚举的自由属性或继承的属性（包括[[Prototype]]链），不包括 Symbol 属性         
```js
var obj = {
  name: "hello",
  career: "world",
  [Symbol()]: "symbolValue"
};
Object.defineProperty(obj, "age", {
  value: "23",
  enumerable: false
});
Object.prototype.protoPer1 = function() {
  console.log("proto");
};
Object.prototype.protoPer2 = 2;
for (var key in obj) {
  console.log(`key:${key}`);
}
// 输出
// key:name
// key:career
// key:protoPer1
// key:protoPer2
```
**自有属性，自有属性就是非原型链继承的属性。**

### for...of

只能遍历可枚举的自有属性，不能遍历 Symbol 和继承属性。         

>内部实现：for..of循环首先会向被访问对象请求一个迭代器对象，然后通过调用迭代器对象的next()方法来遍历所有的返回值
```js
var obj = {
  name: "hello",
  career: "world",
  [Symbol()]: "symbolValue"
};
Object.defineProperty(obj, "age", {
  value: "23",
  enumerable: false
});
Object.prototype.protoPer1 = function() {
  console.log("proto");
};
Object.prototype.protoPer2 = 2;
// 如何用for of遍历对象
let { keys, values, entries } = Object;
for (let [key, value] of entries(obj)) {
  console.log(key, value);
}
// 输出
// name hello
// career world
```

### Object.keys()

以数组形式返回对象的自有可枚举属性，不包括 Symbol 属性         
```js
var obj = {
  name: "hello",
  career: "world",
  [Symbol()]: "symbolValue"
};
Object.defineProperty(obj, "age", {
  value: "23",
  enumerable: false
});
Object.prototype.protoPer1 = function() {
  console.log("proto");
};
Object.prototype.protoPer2 = 2;
console.log(Object.keys(obj));
Object.keys(obj);
// 输出
// ["name", "career"]
```

### Object.getOwnPropertyNames()

获取对象的属性名称，以数组形式返回对象的自有可枚举或不可枚举属性，不包括 Symbol 属性    

```js
var obj = {
  name: "hello",
  career: "world",
  [Symbol()]: "symbolValue"
};
Object.defineProperty(obj, "age", {
  value: "23",
  enumerable: false
});
Object.prototype.protoPer1 = function() {
  console.log("proto");
};
Object.prototype.protoPer2 = 2;
console.log(Object.getOwnPropertyNames(obj));
// 输出
// ["name", "career", "age"]
```

### Reflect.ownKeys()
以数组形式返回对象的自有可枚举或不可枚举属性，包含 Symbol 属性        
```js
var obj = {
  name: "hello",
  career: "world",
  [Symbol()]: "symbolValue"
};
Object.defineProperty(obj, "age", {
  value: "23",
  enumerable: false
});
Object.prototype.protoPer1 = function() {
  console.log("proto");
};
Object.prototype.protoPer2 = 2;
console.log(Reflect.ownKeys(obj));
// 输出
// ["name", "career", "age", Symbol()]
```

### Object.getOwnPropertyDescriptors()
返回对象的自有属性描述符，包含 Symbol 属性描述符    
```js
var obj = {
  name: "hello",
  career: "world",
  [Symbol()]: "symbolValue"
};
Object.defineProperty(obj, "age", {
  value: "23",
  enumerable: false
});
Object.prototype.protoPer1 = function() {
  console.log("proto");
};
Object.prototype.protoPer2 = 2;
console.log(Object.getOwnPropertyDescriptors(obj));
// 输出
// {age: {value: "23", writable: false, enumerable: false, configurable: false},
// career: {value: "world", writable: true, enumerable: true, configurable: true},
// name: {value: "hello", writable: true, enumerable: true, configurable: true},
// Symbol(): {value: "symbolValue", writable: true, enumerable: true, configurable: true}}
```