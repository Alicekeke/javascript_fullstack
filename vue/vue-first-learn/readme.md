## vue - mvvm

## vue的生命周期
- created() {},
- beforeCreate() {},
- mounted() {},
- beforeMount() {},
- updated() {},
- beforeUpdate() {},
- destroyed() {},
- beforeDestroy() {}

----------------------------------------------

## vue中常用指令

#### v-model 
    被封装成一个双向数据绑定, v-model同步到数据源里

#### v-if / v-else: 
    两个dom结构二选一出现，只展示一个dom结构；类似 wx:if / wx:else

#### v-show:
    展示dom结构 为什么看不见？直接display：none; v-if dom结构直接跳过不编译

#### v-for: :key
    循环：list in newsList ==> let(list = 0; list<...; list++>),可自定义变量名

#### v-text
    直接输出内容

#### v-html: 
    解析带标签的内容，不带标签也可以解析，但是能不用就不用，很容易受到xss攻击

#### v-on:
    v-on: ==简写==> on
    绑定事件，类似原生的addEventListener, v-on: click="函数名" ==简写==> @click="函数名"
  
#### v-bind:
    v-bind: ==简写==> :
    绑定属性，动态添加属性，
    v-bind 绑定类名的几种操作：
    设置数据源中某一事件为true或false，来判断要不要在元素中加入类名
    eg  : :class="{good:className}" 可手动添加自己自己想加的类名(good)，但是取决于className是否为true

---------------------------------------------------------------



## Vue属性

  # methods属性
    vue 中全部方法都放在methods属性中，methods是一个包裹方法的属性

  # computed属性
    用来监控自己定义的变量，改变了之后可以直接传到页面里引用
    定义一个方法，return要把数据操作成什么样，最后把该数据再拿到页面上去展示
    方法名(num)相当于数据源里的数据(count)

  # watch属性
    检测某个数据发生变化，根据改变化进行一些怎么样的操作
    直接监听数据源里的数据，例如：temperature: function(newVal, oldVal) {}  
    newVal, oldVal显示新值和旧值的两个参数

  # extends属性
    将并不属于代码当中的对象扩展到Vue代码中来
    当前页面代码过多是可把html和js分开写，再扩展进来
    注意：Methods里面的方法扩展进来是没有用的

  # delimiters属性
    将你挖的坑的格式改掉，例如：{{}} => ${