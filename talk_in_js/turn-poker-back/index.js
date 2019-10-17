// var变量声明提升，但不赋值

const wrap = document.getElementById('wrap');
let images = [
        './images/cat1.jpg',
        './images/cat2.jpg',
        './images/cat3.jpg',
        './images/cat4.jpg',
        './images/cat5.jpg',
        './images/cat6.jpg',
        './images/cat1.jpg',
        './images/cat2.jpg',
        './images/cat3.jpg',
        './images/cat4.jpg',
        './images/cat5.jpg',
        './images/cat6.jpg',     
]
//count限制翻开次数
let count = 0

images.sort((a,b) => 0.5 - Math.random())   
//循环生成插入，初始化之后选中之后再选择器选出
init();
const allImg = document.querySelectorAll('#wrap img');


function init(){
    for(let i = 0; i < 12; i++){
        // js操作dom树
        let img = document.createElement('img');
        img.src = "./images/bg.jpg";
        img.onclick = function (){
            changeIMG(img,i);
        }
        wrap.appendChild(img);
    }
}
let firstCard = null;
let firstID = null;
function changeIMG(imgNode,i){
    if(count === 0){
            // imgNode.src = './images/1.jpg'
            firstCard = images[i];//firstCard 存放图片地址
            console.log(firstCard);
            firstID = i;//firstID 放对应图片下标
            imgNode.src = images[i];
            imgNode.classList.add('rotate-animation')
            count ++;

    }
    if(count === 1 & i === firstID) return;
    if(count === 1){
            imgNode.src = images[i];
            imgNode.classList.add('rotate-animation')
            setTimeout(()=>{
                //图片旋转后开始判断  start
                // if(firstID === i) 错误，不会执行remove，因为i有12个
                if(firstCard === images[i]){
                    wrap.removeChild(allImg[firstID]);
                    wrap.removeChild(allImg[i]);
                }else{
                    allImg[firstID].className = '';
                    allImg[firstID].src = './images/bg.jpg';
                    allImg[i].className = '';
                    allImg[i].src = './images/bg.jpg';
                }
                //再次初始化
                count = 0;
                firstID = null;
                firstCard =null;
            },1100)
            
            //end
        }
            count ++;
}

// sort() 方法可以接受一个方法为参数 ，该方法有两个参数。分别代表每次排序比较时的两个数组项。
// sort()排序时每次比较两个数组项都会执行这个参数，并把两个比较的数组项作为参数传递给这个函数。
// 当函数返回值为1的时候就交换两个数组项的顺序，否则就不交换。

// var arr = [1,2,3,4,5];

// function sortby(arr) {
//     arr.sort(function () {
//        return Math.random() - 0.5;
//     });
//  }

// 更简洁的es6写法
// function sortby(arr) {
//     arr.sort((a,b) => 0.5 - Math.random())
// }在(0~1)取中位数与0.5比较 随机返回值 随机决定是否交换数组项参数位置参数


// //升序
// arr.sort((a,b) => a - b);
// console.log(arr)

// //降序
// arr.sort((a,b) => b - a)
// console.log(arr)

// //乱序 伪随机 并不能真正的打断数组
// arr.sort((a,b) => 0.5 - Math.random())
// console.log(arr)