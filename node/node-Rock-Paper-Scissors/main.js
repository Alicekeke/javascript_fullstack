const playerAction = process.argv[2];
console.log(playerAction);
if (playerAction != 'rock' && playerAction != 'paper' && playerAction != 'scissor') {
    throw new Error('再出一个');
}else{
    let computerAction;
    // [0~1] * 3 => [1~3] 
    let rommand = Math.random() * 3;
    if (rommand<1) {
        computerAction = 'rock';
        console.log('电脑出了石头');
                if (playerAction == 'rock') {
                    console.log('平局');
                }else if(playerAction == 'scissor'){
                    console.log('认输');
                }else{
                    console.log('赢了');
                }
    }else if (rommand > 2){
        computerAction = 'scissor';
        console.log('电脑出了剪刀');
                if (playerAction == 'rock') {
                    console.log('赢了');
                }else if(playerAction == 'scissor'){
                    console.log('平局');
                }else{
                    console.log('输了');
                }
    }else{
        computerAction = 'paper';
        console.log('电脑出了布');
                if (playerAction == 'rock') {
                    console.log('输了');
                }else if(playerAction == 'scissor'){
                    console.log('赢了');
                }else{
                    console.log('平局');
                }
    }
    
}