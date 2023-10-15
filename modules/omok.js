const BOARD_SIZE = 15;
const board = Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(''));
let turn = Math.random() < 0.5 ? 2 : 1;


const game = {

set:(xpos,ypos,player1,player2)=>{

x=xpos
y=ypos
if(board[x][y]==""){
    board[x][y]=turn
    turn = 3-turn
return true;
} else {

console.log('돌있다 아그야 ')
return false;
}

},

load:()=>{
    return board
}


}

module.exports=game;