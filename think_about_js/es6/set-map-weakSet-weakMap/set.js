// 类似于数组的数据结构，成员值都是唯一的
var a = new Set() 
Array.from([2,3,4,5,6]).forEach(x => a.add(x))

for (let i of a) {
  console.log(i)
}

const items = new Set([1,2,3,4,5,6])
console.log(item.size);

//Set 也能用于字符串去重 
[...new Set('abcdefg')].join('')

console.log(NaN === NaN); //js中 NaN不等于NaN
/**set 方法： 
 * add() 添加值，返回实例
 * delete() 删除值 返回布尔值
 * has() 检查值
 * */ 
let set = new Set()
let a = NaN
let b = NaN
set.add(a)
set.add(b)
console.log(set);

// 对于set而言 NaN是相等的 {}是不相等的
set.add({})
console.log(set.size);
set.add({})
console.log(set.size);

// 重复的值不算
let s = new Set()
s.add(1).add(2).add(2)
console.log(s.size);

// ------------
let set = new Set(['red', 'green', 'blue'])
for(let item of set.keys()) {
  console.log(item);
}
for(let item of set.values()) {
  console.log(item);
}
// entries条目
for(let item of set.entries()) {
  console.log(item); //数组键值对形式
}

console.log(Set.prototype[Symbol.iterator] === Set.prototype.values);

set.forEach((value, key) => {
  console.log(key + ':' + value);
})

// set也支持es6的解构 解构为数组
let arr = [...set]


// set作为类数组没有filter、map等数组方法 但可以通过解构转为数组 setArr = [...setArr]
let testArr = [1,2,3,4,5]
let unique = [...new Set(testArr)]
// set使用高阶函数要转换
setArr = [...testArr].map(x => x*2)
setArr = [...testArr].filter( x => (x % 2) == 0)
// 并集
let union = new Set([...setArr, ...testArr])
// 交集
let inter = new Set([...setArr, ...testArr])
// 差集
let diff = new Set([...testArr].filter(x => !b.has(x)))
console.log(setArr)









