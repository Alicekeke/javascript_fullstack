const a = () => {
  console.log(123);
}

a()
  //arrow-func.js
class M {}
new M();

let p = new Promise((reslove, reject) => {
  reslove('success')
})
p.then(r =>{
  console.log('then.success');
  
})

const set = new Set([1,2])