
# Objects will never die
  JavaScript与其他许多语言一样，具有许多技巧，可以完成简单和困难的任务。让我们看一下2020年使用JavaScript对象的九种方法。注意：这是我认为可以很好地使用对象的方法的清单。有些很有趣，有些是众所周知的，有些只是为了提供信息。
  
###  怎么创建一个真正的空对象？
   都知道在 JavaScript 怎么创建对象，那么你知道怎么在创建真正的空对象吗？

   或许是这样？

   > const myEmptyObject = {}

   这是一个普通空对象，但是，这种方法创建出的对象在内部不是真正的空对象，实际上这条语句是这样`Object.create(Object.prototype)`这将创建一个内部属性可访问的对象`Object.prototype`,这就是原型链的顶部。

   这时也许你就会用到想`myEmptyObject.toString()`去检测这个是不是真正的空对象

   其实，要真正创建一个空对象，你只需要在使用它时传递 null 即可, 因为 null 是一个很特殊的对象，它指示变量未指向任何对象，经常作为参数传入。

   > const myTrulyEmptyObject = Object.create(null)

   使用这种方法创建对象时，实际上没有任何属性，除非你自己添加，但我不推荐这样做，因为没有理由不使用基本的属性方法。

###  拷贝对象（object.assign）
   当使用 Object.assign 方法时，你需要一个目标对象作为该对象，以将其他对象和/或属性拷贝到该对象上。

   ```js
   const keke = { username: "keke", level: 10, hp: 100 };
   function transform(target) {
     return Object.assign(target, {
       fireBolt(player) {
         player.hp -= 15;
         return this;
       }
     });
   }
   const sorceress = transform(user);
   const xixi = { username: "xixi", level: 5, hp: 100 };
   sorceress.fireBolt(xixi);
   // keke: username: "keke", level: 10, hp: 100, fireBolt
   // xixi: username: "xixi", level: 5, hp: 85
   ```

   目标对象是 Object.assign 的第一个参数。之后的所有参数最终都将从第二个参数开始拷贝到目标对象中。

### 拓展运算符拷贝对象

   ```js
   const keke = { username: "keke", level: 10, hp: 100 };

   function transform(target) {
     return {
       ...target,
       fireBolt(player) {
         player.hp -= 15;
         return this;
       }
     };
   }

   const sorceress = transform(keke);
   const xixi = { username: "xixi", level: 5, hp: 100 };
   sorceress.fireBolt(xixi)

   ```


### 可选链检查属性是否存在

可选链改变了从深层对象访问属性的方式。这个新的运算符采用`.？`形式。允许读取位于连接对象链深处的属性的值，而不必明确验证链中的每个引用是否有效。
这意味着，如果你有任何深度嵌套的对象结构，例如以下结构：

```js
const food = {
  fruits: {
    apple: {
      dates: {
        expired: "2020-03-02"
      }
    }
  }
};
```

以前我们会这样写

```js
function getAppleExpirationDate(obj) {
  if (food.fruits && food.fruits.apple && food.fruits.apple.dates) {
    return food.fruits.apple.dates.expired;
  }
}
```

现在我们这样写

```js
function getAppleExpirationDate(obj) {
  return food?.fruits?.apple?.dates?.expired;
}
```

这样会让我们的代码看起来更加干净整洁。

举个例子，这有个 function

```js
function findFatDogs(dog, result = []) {
  if (dog && dog.children) {
    return dog.children.reduce((acc, child) => {
      if (child && child.weight > 100) {
        return acc.concat(child);
      } else {
        return acc.concat(findFatDogs(child));
      }
    }, result);
  }
  return result;
}
```

可以很容易地变成这种形式 ，同时保持其可读性

```js
function findFatDogs(dog, result = []) {
  if (dog?.children) {
    return dog.children.reduce((acc, child) => {
      return child?.weight > 100
        ? acc.concat(child)
        : acc.concat(findFatFrogs(child));
    }, result);
  }
  return result;
}
```

   但要注意的是，这是一个实验中的功能，并非所有的现代浏览器都支持该功能[可选链](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/%E5%8F%AF%E9%80%89%E9%93%BE)

### 通过覆盖调用对象.toString()
   当将对象分配为对象文字的键时，它们将被字符串化。这带来了一些不错的使用场景。比如
   ```js
    function Command(name, execute) {
  this.name = name
  this.execute = execute
   }
   // 这里本该报错add/execute is not a function，之所以没有报错，
   // 是因为在定义Command构造函数时，我们还覆盖了toString原型方法
   Command.prototype.toString = function() {
     return this.name
   }

   const createCommand = function() {
     const commands = {}
     return {
       add(command) {
         // 本不允许这样添加键值
         commands[command.name] = command
       },
       execute(command, ...args) {
         return commands[command].execute(...args)
       },
     }
   }

   const cmds = createCommand()
   // 具体的功能函数
   const talkCommand = new Command('talk', function(wordsToSay) {
     console.log(wordsToSay)
   })
   const destroyEverythingCommand = new Command('destroyEverything', function() {
     throw new Error('Destroying everything')
   })

   // 将函数作为键值传递
   cmds.add(talkCommand)
   cmds.add(destroyEverythingCommand)

   cmds.execute(talkCommand, 'This is the word to Say')  //This is the word to Say
   console.log(cmds) // add [function: add]， excute: [Function: excute]
   ```
  
 JavaScript对象键值仅有string和symbol两种，当将非原始类型的值(command = {})分配为对象的属性时，JavaScript会先尝试对其进行字符串转化(toString)，然后再将其退回到原型上的.toString方法，以将其函数名附加为键。

 reduxjs也是使用此技巧允许直接将传递的具体功能函数直接作为键传递。例如，它们可以直接用作键，从而映射分配给`action`的`.type`值。

### 对象解构

   ```js
   const obj = {
     foods: {
       apples: ["orange", "apple"]
     }
   };
   const { foods } = obj;
   console.log(foods); // apples: ["orange", "apple"]
   ```

### 解构属性重命名
   ```js
   const obj = {
        foods: {
          apples: ['orange', 'apple'],
        },
      }
      const { foods: myFoods } = obj
      console.log(myFoods) // apples: ["orange", "apple"]
   ```

###  for...in 遍历对象键值

    ```js
    const obj = {
      foods: {
        apples: ["orange", "apple"]
      },
      water: {
        f: ""
      },
      more: function() {
        return this.name;
      }
    };

    const { foods } = obj;

    for (let k in obj) {
      console.log(k);
    }
    /*
    result: 
      "foods"
      "water"
      "more"
    */
    ```

### Object.key() 遍历对象键值变化

    Object.keys 返回一个所有元素为字符串的数组，其元素来自于从给定的 object 上面可直接枚举的属性。这些属性的顺序与手动遍历该对象属性时的一致。

    ```js
    const obj = {
      foods: {
        apples: ["orange", "apple"]
      },
      water: {
        f: ""
      },
      more: function() {
        return this.name;
      }
    };
    const { foods } = obj;
    console.log( Object.keys(obj)); //["foods", "water", "more"]
    ```

  这在当想对数组进行一些额外操作时非常有帮助，例如可选链操作并转化为更加具有结构化的数据

    ```js
    const people = {
      bob: {
        age: 15,
        gender: "male"
      },
      jessica: {
        age: 24,
        gender: "female"
      },
      lucy: {
        age: 11,
        gender: "female"
      },
      sally: {
        age: 14,
        gender: "female"
      }
    };

    const { males, females } = Object.keys(people).reduce(
      (acc, name) => {
        const person = people[name];
        if (person.gender === "male") {
          acc.males.push(name);
        } else {
          acc.females.push(name);
        }
        return acc;
      },
      { males: [], females: [] }
    );

    console.log(males); // ["bob"]
    console.log(females); // ["jessica", "lucy", "sally"]
    ```
