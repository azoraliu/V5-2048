var board = new Array();
var score=0;
var hasConflicted = new Array();

//触控
var startx;
var starty;
var endx;
var endy;


$(document).ready(function(){
    prepareForMobile();
    newgame();
});
function prepareForMobile(){
    if(documentWidth>500){
        gridContainerWidth=500;
        cellSpace=20;
        cellSideLength=100;
    }
    $('#container').css('width',gridContainerWidth-2*cellSpace);
    $('#container').css('height',gridContainerWidth-2*cellSpace);
    $('#container').css('padding',cellSpace);
    $('#container').css('border-radius',0.02*gridContainerWidth);

    $('.cell').css('width',cellSideLength);
    $('.cell').css('height',cellSideLength);
    $('.cell').css('border-radius',0.02*cellSideLength);
}

function newgame(){
    init();//初始化
    //随机生成数字
    generateOneName();
    generateOneName();
}


function init(){
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){

            var gridCell=$("#cell-"+i+"-"+j);
            gridCell.css("top",getPosTop(i,j));
            gridCell.css("left",getPosLeft(i,j));
            //不同的i和j偏离左上角0,0位置的数值不同
        }
    }
    for(var i=0;i<4;i++){
        board[i]=new Array();//变为二维数组
        hasConflicted[i]=new Array();
        for(var j=0;j<4;j++){
            board[i][j]=0;//0表示没有东西在格子里
            hasConflicted[i][j]=false;
        }
    }
    updateBoardView();
    score=0;
    $('#score').text(score);
}

function updateBoardView(){
    $(".number-cell").remove();
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            $("#container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
            
            var theNumberCell = $('#number-cell-'+i+'-'+j);

            if(board[i][j]==0){
                theNumberCell.css('width','0px');
                theNumberCell.css('height','0px');

                theNumberCell.css('top',getPosTop(i,j)+cellSideLength/2);
                theNumberCell.css('left',getPosLeft(i,j)+cellSideLength/2);
            }else{
                theNumberCell.css('width',cellSideLength);
                theNumberCell.css('height',cellSideLength);
                theNumberCell.css('top',getPosTop(i,j));
                theNumberCell.css('left',getPosLeft(i,j));
                theNumberCell.css('background-color',getNumberBackgroundColor(board[i][j]));
                theNumberCell.css('color',getNumberColor(board[i][j]));
                theNumberCell.text(nameList(board[i][j]));
            }
            hasConflicted[i][j]=false;
        }
    }
    $('.number-cell').css('line-height',cellSideLength+'px');
    $('.number-cell').css('font-size',0.4*cellSideLength+'px');
}

function generateOneName(){
    if(nospace(board)){
        return false;
    }
    var randx=parseInt(Math.floor(Math.random()*4));
    var randy=parseInt(Math.floor(Math.random()*4));
    
    var times = 0;
    while( times < 50 ){
        if( board[randx][randy] == 0 )
            break;

        randx = parseInt( Math.floor( Math.random()  * 4 ) );
        randy = parseInt( Math.floor( Math.random()  * 4 ) );

        times ++;
    }

    if( times == 50 ){
        for( var i = 0 ; i < 4 ; i ++ )
            for( var j = 0 ; j < 4 ; j ++ ){
                if( board[i][j] == 0 ){
                    randx = i;
                    randy = j;
                }
            }
    }
    
    var randNumber=Math.random()<0.5 ? 2:4;
    board[randx][randy]=randNumber;

    showNameWithAnimation(randx,randy,randNumber);
    return true;    
}

//按键操作
$(document).keydown(function(event){
    
    switch(event.keyCode){
        case 37://left
            event.preventDefault();
            if(moveLeft()){
                setTimeout("generateOneName()",210);
                setTimeout("isgameover()",300);
            }
            break;
        case 38://up
            event.preventDefault();
            if(moveUp()){
                setTimeout("generateOneName()",210);
                setTimeout("isgameover()",300);
            }
            break;
        case 39://right
            event.preventDefault();
            if(moveRight()){
                setTimeout("generateOneName()",210);
                setTimeout("isgameover()",300);
            }
            break;
        case 40://down
            event.preventDefault();
            if(moveDown()){
                setTimeout("generateOneName()",210);
                setTimeout("isgameover()",300);
            }
            break;
        default:
            break;
    }
});
//屏幕操作
document.addEventListener('touchstart',function(event){
    startx=event.touches[0].pageX;
    starty=event.touches[0].pageY;
});
//避免bug
/*
document.addEventListener('touchmove',function(event){
    event.preventDefault();
});
$("body").bind("touchmove",function(event){event.preventDefault;//code
});*/
/******************************************/
document.body.addEventListener('touchmove', (e) => {
    e.preventDefault();
}, { passive: false });
/*****************************************/


document.addEventListener('touchend',function(event){
    endx=event.changedTouches[0].pageX;
    endy=event.changedTouches[0].pageY;
    //判断
    var deltax=endx-startx;
    var deltay=endy-starty;
    if(Math.abs(deltax)<0.3*documentWidth && Math.abs(deltay)<0.3*documentWidth){
        return;
    }
    if(Math.abs(deltax)>=Math.abs(deltay)){//x
        if(deltax>0){
            if(moveRight()){
                setTimeout("generateOneName()",210);
                setTimeout("isgameover()",300);
            }
        }else{
            if(moveLeft()){
                setTimeout("generateOneName()",210);
                setTimeout("isgameover()",300);
            }
        }
    }else{//y
        if(deltay>0){
            if(moveDown()){
                setTimeout("generateOneName()",210);
                setTimeout("isgameover()",300);
            }
        }else{
            if(moveUp()){
                setTimeout("generateOneName()",210);
                setTimeout("isgameover()",300);
            }
        }

    }
});

function isgameover(){
    if(nospace(board)&&nomove(board)){
        gameover();
    }
}
function gameover(){
    alert("gameover!你的分数是："+score);
}

function moveLeft(){
    if(!canMoveLeft(board)){
        return false;
    }
    for(var i=0;i<4;i++){
        for(var j=1;j<4;j++){
            if(board[i][j]!=0){
                for(var k=0;k<j;k++){
                    if(board[i][k]==0 && noBlockHorizontal(i,k,j,board)){
                        showMoveAnimation(i,j,i,k);
                        board[i][k]=board[i][j];
                        board[i][j]=0;
                        continue;
                    }else if(board[i][k]==board[i][j] && noBlockHorizontal(i,k,j,board)){
                        showMoveAnimation(i,j,i,k);
                        board[i][k]+=board[i][j];
                        board[i][j]=0;

                        score+=board[i][k];
                        updateScore(score);

                        hasConflicted[i][k]=true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()",200);
    return true;
}

function moveRight(){
    if(!canMoveRight(board)){
        return false;
    }
    for(var i=0;i<4;i++){
        for(var j=2;j>=0;j--){
            if(board[i][j]!=0){
                for(var k=3;k>j;k--){
                    if(board[i][k]==0 && noBlockHorizontal(i,j,k,board)){
                        showMoveAnimation(i,j,i,k);
                        board[i][k]=board[i][j];
                        board[i][j]=0;
                        continue;
                    }else if(board[i][k]==board[i][j] && noBlockHorizontal(i,j,k,board)){
                        showMoveAnimation(i,j,i,k);
                        board[i][k]+=board[i][j];
                        board[i][j]=0;

                        score+=board[i][k];
                        updateScore(score);

                        hasConflicted[i][k]=true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()",200);
    return true;
}
function moveUp(){
    if(!canMoveUp(board)){
        return false;
    }
    for(var j=0;j<4;j++){
        for(var i=1;i<4;i++){
            if(board[i][j]!=0){
                for(var k=0;k<i;k++){
                    if(board[k][j]==0 && noBlockVertical(j,k,i,board)){
                        showMoveAnimation(i,j,k,j);
                        board[k][j]=board[i][j];
                        board[i][j]=0;
                        continue;
                    }else if(board[k][j]==board[i][j] && noBlockVertical(j,k,i,board)){
                        showMoveAnimation(i,j,k,j);
                        board[k][j]+=board[i][j];
                        board[i][j]=0;

                        score+=board[k][j];
                        updateScore(score);

                        hasConflicted[k][j]=true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()",200);
    return true;
}
function moveDown(){
    if(!canMoveDown(board)){
        return false;
    }
    for(var j=0;j<4;j++){
        for(var i=2;i>=0;i--){
            if(board[i][j]!=0){
                for(var k=3;k>i;k--){
                    if(board[k][j]==0 && noBlockVertical(j,i,k,board)){
                        showMoveAnimation(i,j,k,j);
                        board[k][j]=board[i][j];
                        board[i][j]=0;
                        continue;
                    }else if(board[k][j]==board[i][j] && noBlockVertical(j,i,k,board)){
                        showMoveAnimation(i,j,k,j);
                        board[k][j]+=board[i][j];
                        board[i][j]=0;

                        score+=board[k][j];
                        updateScore(score);

                        hasConflicted[k][j]=true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()",200);
    return true;
}