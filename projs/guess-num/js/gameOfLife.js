'use strict';
console.log('Game Of Life!!!');

var gBoard = createBoard();


// playGameOfLife();

var gGameInterval = setInterval(runTurn, 100)

// function playGameOfLife() {
//     var numOfTurns = 2;
//     for (var i = 0; i < numOfTurns; i++) {
//         runTurn()
//     }
// }

function runTurn() {
    // console.table(gBoard);
    renderBoard(gBoard);
    gBoard = runGeneration(gBoard);
}

function runGeneration(board) {
    console.log('Running Generation');
    var nextBoard = [];
    var allNegsCount = 0;
    for (var i = 0; i < board.length; i++) {
        var row = board[i];
        nextBoard.push([]);
        for (var j = 0; j < row.length; j++) {
            var negsCount = countNegs(board, i, j);
            allNegsCount += negsCount;
            var isLife = (negsCount >= 3 && negsCount <= 5)
            nextBoard[i][j] = isLife;
        }

    }
    if (allNegsCount === 0) {
        console.log('All Dead');
        clearInterval(gGameInterval);
    }

    return nextBoard;

}

function countNegs(board, cellI, cellJ) {
    var count = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {

        if (i < 0 || i >= board.length) continue;

        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            
            if (j < 0 || j >= board[i].length) continue;
            if (i === cellI && j === cellJ) continue;

            if (board[i][j]) count++;
        }
    }
    return count;
}


function createBoard() {
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = false;
            var rand = Math.random();
            if (rand > 0.9) board[i][j] = true;
        }
    }
    return board;
}

function renderBoard(board) {
    var strHtml = ''

    for (var i = 0; i < board.length; i++) {
        var row = board[i];
        strHtml += '<tr>';
        for (var j = 0; j < row.length; j++) {
            strHtml += '<td>'
            strHtml += (board[i][j])? 'X' : ''
            strHtml += '</td>'
        }
        strHtml += '</tr>';
    }


    var elBoard = document.querySelector('#board')
    elBoard.innerHTML = strHtml;
}