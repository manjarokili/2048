var board = new Array();
var score = 0;
var hasConflicted = new Array();



$(document).ready(function(){
    newgame();
});

function newgame(){
    //初始化棋盘格
    init();
    //随机两个格子生成数字
    generateOneNumber();
    generateOneNumber();
}


// 初始化棋盘格
function init(){
    for(var i=0;i<4;i++)
     for(var j=0;j<4;j++){
        var gridCell = $("#grid-cell-"+i+"-"+j);
        gridCell.css('top',getPosTop(i,j));
        gridCell.css('left',getPosLeft(i,j));
    }
 for(var i=1;i<4;i++){ 
 board[i]= new Array();
 //hasConflicted[i] = new Array();
 for(var j=0;j<4;j++)
board[i][j]=0;
//hasConflicted[i][j] = false;
 
}
updateBoradView();
score=0;
}

//更新棋盘内容
function updateBoradView(){
    $(".number-cell").remove();//按键new game时，应该清除界面数据，开始一个新游戏
    for(var i = 0;i<4; i++)
     for(var j = 0;j<4; j++){
         $("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'" > </div>')
         var theNumberCell = $("'#number-cell-'+i+'-'+j")
         
         if(board[i][j]==0)
         {
            theNumberCell.css('width','0px');
            theNumberCell.css('height','0px');
            theNumberCell.css('top',getPosTop(i,j)+50);
            theNumberCell.css('left',getPosLeft(i,j)+50);
         }
         else{
            theNumberCell.css('width','0px');
            theNumberCell.css('height','0px');
            theNumberCell.css('top',getPosTop(i,j));
            theNumberCell.css('left',getPosLeft(i,j));
            theNumberCell.css('background-color',getNumberBackgroundColor(borad[i][j]));
            theNumberCell.css('color',getNumberColor(board[i][j]))
            theNumberCell.text(board[i][j]);
            }
            hasConflicted[i][j] = false;
     }
}

//在随机一个位置随机生成一个2或4并显示
function generateOneNumber(){
    if (nospace(board))
    return false;
//随机一个位置
var randx = paraseInt(Math.floor(Math.random()*4));
var randy = paraseInt(Math.floor(Math.random()*4));
while(true){
    if(board[randx][randy]==0)
    break;
    randx = paraseInt(Math.floor(Math.random()*4));
    randy = paraseInt(Math.floor(Math.random()*4));
}
//随机一个数字
var randNumber = Math.random()<0.5 ? 2:4;
//随机显示
board[randx][randy]=randNumber;
showNumberWithAnimation(randx,randy,randNumber)
    return true;
}


//按键事件
$(document).keydown(function(event){
    switch(event.keydown){
        case 37://left
            if (moveLeft()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
            break;
        case 38://up
            if (moveUp()){
            setTimeout("generateOneNumber()",210);
            setTimeout("isgameover()",300);
            }
            break;
        case 39://right
           if (moveRight()){
            setTimeout("generateOneNumber()",210);
            setTimeout("isgameover()",300);
            }
            break;
        case 40://down
            if (moveDown()){
            setTimeout("generateOneNumber()",210);
            setTimeout("isgameover()",300);
            }
            break;
        default:
            break;
    }
});

//判断是否结束游戏，没有空间并且不能移动
function isgameover(){
    if (nospace(board) && nomove(board)){
        alert('gameover!');
    }
}


//真实的向左移动操作
function moveLeft(){
    if(!canMoveLeft(board))
    return false;
    //moveleft
    for(var i=0;i<4;i++)
    for(var j=1;j<4;j++){
    if(board[i][j] !=0){
        for(var k=0;k<j;k++){
            if(board[i][k] == 0 && noBlockHorizontal(i,k,j,board) ){
               //move，只移动，没有数字相加
               showNumberWithAnimation(i,j,i,k);
               board[i][k]=board[i][j];
               board[i][j]=0;
               continue;
            }
            else if(board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board) && !hasConflicted[i][k]){
                //move，移动且相加
                showMoveAnimation(i,j,i,k);
                //add
                board[i][k] +=board[i][j];
                board[i][j] = 0;
                //add score
                score +=board[i][j];
                updateScore(score);
                hasConflicted[i][k] = true; 
                continue;
            }
        }
    }
}
setTimeout("updateBoardView()",200);
return true;
}



function moveRight(){
    
}


function moveUp(){

}


function moveDown(){

}

