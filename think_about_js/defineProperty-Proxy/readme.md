## 监听对象属性改变

1. defineProperty:  get / set
2. Proxy
    在目标对象之前"拦截"一层，对目标对象的访问都经过这一层拦截

#### 监测数组的改变
劫持
1、push shift pop ...
2、arr[0] = n   //无法检测到数组改变

自己写的push与原来的push(originPush)  代理和劫持   Reflect 代理和反射 恢复 每一个Reflect都与Proxy对应 （java中的代理与反射）

#### definePrototype 与 Proxy的对比
- definePrototype
    只能监测对象属性 并且是用defineProperty定义上去的属性，不能监测"未来"的属性。
- Proxy
    1. 整个对象的拦截 多达13种操作
    2. 可以拦截数组， 包括（arr[0] = 123）

#### 元编程
对语言（js）的再次编程，修改它的默认行为为自己想要的行为
eg : 定义js中的私有属性
1. proxy


