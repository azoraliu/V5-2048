//获取设备屏幕宽度
documentWidth=window.screen.availWidth;
gridContainerWidth=0.92*documentWidth;//大方块宽度
cellSideLength=0.18 * documentWidth;//小方块边长
cellSpace=0.04 * documentWidth;//小方块间距
function getPosTop(i,j){
    return cellSpace+i*(cellSpace+cellSideLength);
}
function getPosLeft(i,j){
    return cellSpace+j*(cellSpace+cellSideLength);
}

function getNumberBackgroundColor(number){
    switch( number ){
        case 2:return "#0c1c38";break;
        case 4:return "#B0E0E6";break;
        case 8:return "#ffff00";break;
        case 16:return "#9AC73C";break;
        case 32:return "#620317";break;
        case 64:return "#00e8ff";break;
        case 128:return "#FE9B96";break;
        case 256:return "#ff2d51";break;
        case 512:return "#00aaff";break;
        case 1024:return "#6bffe6";break;
        case 2048:return "#EE82EE";break;
        case 4096:return "#FFA500";break;
    }
    return "black";
}

function getNumberColor(name){
    if(name<=4){
        return "white";
    }
    return "#776e65";
}

function nospace(board){
    for(var i=0; i<4;i++){
        for(var j=0;j<4;j++){
            if(board[i][j]==0){
                return false;
            }
        }
    }
    return true;
}
function canMoveLeft(board){
    for(var i=0;i<4;i++){
        for(var j=1;j<4;j++){
            if(board[i][j]!=0){
                if(board[i][j-1]==0 || board[i][j-1]==board[i][j]){
                    return true;
                }
            }
        }
    }
    return false;
}
function canMoveRight(board){
    for(var i=0;i<4;i++){
        for(var j=2;j>=0;j--){
            if(board[i][j]!=0){
                if(board[i][j+1]==0 || board[i][j+1]==board[i][j]){
                    return true;
                }
            }
        }
    }
    return false;
}
function canMoveUp(board){
    for(var j=0;j<4;j++){
        for(var i=1;i<4;i++){
            if(board[i][j]!=0){
                if(board[i-1][j]==0 || board[i-1][j]==board[i][j]){
                    return true;
                }
            }
        }
    }
    return false;
}
function canMoveDown(board){
    for(var j=0;j<4;j++){
        for(var i=2;i>=0;i--){
            if(board[i][j]!=0){
                if(board[i+1][j]==0 || board[i+1][j]==board[i][j]){
                    return true;
                }
            }
        }
    }
    return false;
}
function noBlockHorizontal(row,col1,col2,board){
    for( var i = col1 + 1 ; i < col2 ; i ++ )
        if( board[row][i] != 0 )
            return false;
    return true;
}
function noBlockVertical(col,row1,row2,board){
    for(var i=row1+1; i<row2;i++){
        if(board[i][col]!=0){
            return false;
        }
    }
    return true;
}

function nameList(number){
    switch(number){
        case 2:return '南南';break;
        case 4:return '洛洛';break;
        case 8:return '嘉嘉';break;
        case 16:return '光光';break;
        case 32:return '姚琛';break;
        case 64:return '小闻';break;
        case 128:return '齐齐';break;
        case 256:return '雅雅';break;
        case 512:return '任豪';break;
        case 1024:return '磊磊';break;
        case 2048:return '让让';break;
        case 4096:return 'R1SE';break;
    }
    return "you win";
}

function nomove(board){
    if(canMoveDown(board)||canMoveLeft(board)||canMoveRight(board)||canMoveUp(board)){
        return false;
    }
    return true;
}