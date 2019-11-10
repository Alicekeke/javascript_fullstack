// // 简单值 通过值复制的方式赋值
let a = 2
let b = a // b是a的值的副本
a ++
console.log(b)   /* 2 浅拷贝：基础数据类型，不会改变原始值*/    

// 复合值 通过引用复制的方式赋值
let a = {
  name: 'keke',
  book: {
    title: "You Don't Know JavaScript",
    price: '45'
  }
}
let b = a
a.name = 'xixi'
a.book.price = '55'
console.log(b)    /* 引用类型执行的复制操作叫浅拷贝*/
console.log(a)  /* xixi, 55 */


// // -------------assign() 对象的拼接
let a = {
  name: 'keke',
  book: {
    title: "You Don't Know JavaScript",
    price: '45',
  }
}

// let b = Object.assign({}, a)
let b = {...a}    /* 解构既不是深拷贝也不是浅拷贝 */

a.name = '珂珂'
a.book.price = '55'
console.log(b)    /* keke, 55 *//* Object.assign既不是深拷贝也不是浅拷贝，看值的数据类型 会把a中的一级属性都拷贝到｛｝中， */

// -------------------------JSON.parse(JSON.stringify())深拷贝
let a = {
  name: 'keke',
  book: {
    title: 'hi',
    price: '11',
  }
}
let b = JSON.parse(JSON.stringify(a)) //典型的深拷贝 对象转成字符串，在转换为对象
console.log(b)
a.name = 'xixi'
a.book.price = '22'
console.log(b)  //前后输出相同

let a = [
  {name: 'keke'},
  {book: {
    title: 'javascript',
    price: '55' }
  }
]
let b = a.slice()   
b[0].name = '珂珂';
b[1].book.price= '45'
console.log(b); //{'珂珂' ,'45'}
