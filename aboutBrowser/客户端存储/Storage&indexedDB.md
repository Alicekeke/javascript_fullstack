### localStorage

这是一种**持久化的存储方式**，也就是说如果不手动清除，数据就永远不会过期。它也是采用`Key - Value`的方式存储数据，底层数据接口是`sqlite`，按域名将数据分别保存到对应数据库文件里。它能保存更大的数据。

特点：

- 保存的**数据长期存在**，下一次访问该网站的时候，网页可以直接读取以前保存的数据。
- 大小为5M左右。
- **仅在客户端**使用，不和服务端进行通信。
- 存储的信息在**同一域中是共享**的。
- `localStorage`本质上是对字符串的读取，如果存储内容多的话会消耗内存空间，会导致页面变卡。


具体操作
```
设置：localStorage.setItem（'name': 'xs'）
获取：localStorage.getItem('username') 
也可以获取键名：
localStorage.key(0) #获取第一个键名。
删除：localStorage.removeItem('username') 
清楚所有：localStorage.clear()
```

### sessionStorage

和服务器端使用的session类似，是一种会话级别的缓存，关闭浏览器会数据会被清除。不过有点特别的是它的**作用域是窗口级别**的，也就是说不同窗口间的sessionStorage数据不能共享的。使用方法（和localStorage完全相同）

操作：和localStorage操作一样。

sessionStorage和localStorage区别：

- 存储生命不一样
  `localStorage`是永久存储，除非手动删除。`sessionStorage`当会话结束（当前页面关闭的时候，自动销毁）
- 作用域不一样
  `localStorage`只要在相同的协议、相同的主机名、相同的端口下，就能读取/修改到同一份`localStorage`数据。
  `sessionStorage`仅在当前窗口有效可共享 。


### IndexedDB

IndexedDB 就是浏览器提供的本地数据库，它可以被网页脚本创建和操作。IndexedDB 允许储存大量数据，提供查找接口，还能建立索引。这些都是 LocalStorage 所不具备的。就数据库类型而言，IndexedDB 不属于关系型数据库（不支持 SQL 查询语句），更接近 NoSQL 数据库。

特点：

- **键值对储存**。IndexedDB 内部采用对象仓库（object store）存放数据。所有类型的数据都可以直接存入，包括 JavaScript 对象。对象仓库中，数据以“键值对”的形式保存，每一个数据记录都有对应的主键，主键是独一无二的，不能有重复，否则会抛出一个错误。
- **异步**。IndexedDB 操作时不会锁死浏览器，用户依然可以进行其他操作，这与 LocalStorage 形成对比，后者的操作是同步的。异步设计是为了防止大量数据的读写，拖慢网页的表现。
- **支持事务**。IndexedDB 支持事务（transaction），这意味着一系列操作步骤之中，只要有一步失败，整个事务就都取消，数据库回滚到事务发生之前的状态，不存在只改写一部分数据的情况。
- **同源限制**。IndexedDB 受到同源限制，每一个数据库对应创建它的域名。网页只能访问自身域名下的数据库，而不能访问跨域的数据库。
- **储存空间大**。IndexedDB 的储存空间比 LocalStorage 大得多得多得多得多，一般来说不少于 250MB，甚至没有上限。
- **支持二进制储存**。IndexedDB 不仅可以储存字符串，还可以储存二进制数据（`ArrayBuffer` 对象和 `Blob` 对象,这些是js对象）

