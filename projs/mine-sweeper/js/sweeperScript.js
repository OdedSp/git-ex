'use strict';
console.log('Mine Sweeper');

var gBoard;
var gLevels = [
    { DIF: 'beginner', SIZE: 4, MINES: 2 },
    { DIF: 'Intermediate', SIZE: 6, MINES: 5 },
    { DIF: 'Expert', SIZE: 8, MINES: 15 }
];

var gCurrLevel;

var gState;

function initializeState() {
    gState = {
        isGameOn: false,
        failure: false,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0
    }   
}

var gIntervalClock;


function initGame() {
    renderLevelChoice()
}

function chooseLevel(levelIdx) {
    initializeState();
    gCurrLevel = gLevels[levelIdx];
    gBoard = buildBoard(gCurrLevel);
    renderBoard(gBoard);
    
    var elClock = document.querySelector('.notice');
    elClock.innerHTML = '';
}

function renderLevelChoice() {
    var strHtml = ''
    for (var i = 0; i < gLevels.length; i++) {
        strHtml += '<button onclick="chooseLevel(' + i + ')">' + gLevels[i].DIF + '</button>\n';
    }
    // console.log(strHtml);
    var elChoice = document.querySelector('.levelChoice');
    elChoice.innerHTML = strHtml;
}

// This is the actual function, for tests I will use one with non-arbirary values
function buildBoard(level) {
    var board = [];
    for (var i = 0; i < level.SIZE; i++) {
        board[i] = []
        for (var j = 0; j < level.SIZE; j++) {
            board[i][j] = {
                id: [i, j],
                mine: false,
                shownStatus: false
            }
        }
    }

    //CR: for loop is not good in this case, what happen if you put mine in a place that already contain a mine?    
    for (var m = 0; m < level.MINES; m++) {
        board[Math.floor(Math.random()*level.SIZE)][Math.floor(Math.random()*level.SIZE)].mine = true;
    }
    
    return board;
}

//test1 for buildBoard:
// console.log(buildBoard('expected: 4*4 mat of objects, 2 mines. Received: \n', gLevels[0]));
// console.log(buildBoard('expected: 6*6 mat of objects, 5 mines. Received: \n', gLevels[1]));
// console.log(buildBoard('expected: 8*8 mat of objects, 15 mines. Received: \n', gLevels[2]));

// CR: Realy loved the use Math.max and Math.min!!!
function setMinesNegsCount(board, idx, jdx) {
    if (board[idx][jdx].mine) {
        return '☼';
    }
    
    var minesNegsCount = 0;
    var rowLimit = gBoard.length - 1;
    var colLimit = gBoard[0].length - 1;
    
    for (var i = Math.max(0, idx - 1); i <= Math.min(idx + 1, rowLimit); i++) {
        for (var j = Math.max(0, jdx - 1); j <= Math.min(jdx + 1, colLimit); j++) {
            if (i === idx && j === jdx) {
                continue;
            } else if (board[i][j].mine) {
                minesNegsCount++;
            }
        }
    }
    
    return minesNegsCount;
}

// // test2 for setMinesNegsCount
// console.log('Expected: 0. Received: ',setMinesNegsCount(gBoard,0,3));
// console.log('Expected: 1. Received: ',setMinesNegsCount(gBoard,0,0));
// console.log('Expected: 2. Received: ',setMinesNegsCount(gBoard,1,2));
// console.log('Expected: undefined. Received: ',setMinesNegsCount(gBoard,1,1));

//CR : save all your information in your model! dont based on the DOM!
// The negs count should be saved in a your a matrix with all the detials. 
// the negs count compute place is not in renderBoard func.
function renderBoard(board) {
    var strHtml = '';
    for (var i = 0; i < board.length; i++) {
        var row = board[i];
        strHtml += '<tr>';
        for (var j = 0; j < row.length; j++) {
            var cell = row[j];
            var className = (cell.mine) ? 'mine' : 'nonMine'
            var tdId = cell.id[0] + '-' + cell.id[1];
            strHtml += '<td class="cell ' + className + '" id="cell-' + tdId +
                '" onclick="cellClicked(this, ' + i + ', ' + j + ')" \
                oncontextmenu="cellMarked(this, ' + i + ', ' + j + ')">' +
                setMinesNegsCount(board, i, j) +
                '</td>\n';
        }
        strHtml += '</tr>';
    }
    // console.log(strHtml)
    var elMat = document.querySelector('.gameBoard');
    elMat.innerHTML = strHtml;
}

function cellClicked(elCell, idx, jdx) {
    // console.log(idx,jdx, ' was clicked')

    if (gState.shownCount === 0) {
        gState.isGameOn = true;
        startClock();
    }

    var elMines = document.querySelectorAll('.mine');
    if (gBoard[idx][jdx].mine) {
        gState.failure = true;
        for (var i = 0; i < elMines.length; i++) {
            elMines[i].classList.add('shown');
        }
    } else if (!elCell.classList.contains('shown')) {
        gState.shownCount++;
        elCell.classList.add('shown');
        expandShown(gBoard, elCell, idx, jdx);
    }
    checkGameOver();
    console.log(gState);
}

function cellMarked(elCell, idx, jdx) {
    // console.log(idx,jdx, ' was right-clicked')
    if (!elCell.classList.contains('shown') && !elCell.classList.contains('marked')) {
        elCell.classList.add('marked');   
        gState.markedCount++;
    } else if (!elCell.classList.contains('shown') && elCell.classList.contains('marked')) {
        elCell.classList.remove('marked');
        gState.markedCount--;
    }
}


//CR :Avoid excessive HTML inside JS.
function checkGameOver() {
    var elNotice = document.querySelector('.notice');

    if (gState.shownCount >= gCurrLevel.SIZE * gCurrLevel.SIZE - gCurrLevel.MINES) {
        stopClock();
        elNotice.innerHTML = '<p>You sweeped those mines! and it took you '+gState.secsPassed+
        ' seconds </p>';
        gState.isGameOn = false;
    } else if (gState.failure) {
        stopClock();
        elNotice.innerHTML = '<p>You failed! A mine blew up and now your leg is missing</p>';
        gState.isGameOn = false;
    }
}

function expandShown(board, elCell, idx, jdx) {
    var rowLimit = board.length - 1;
    var colLimit = board[0].length - 1;

    if (elCell.innerText == 0) {
        for (var i = Math.max(0, idx - 1); i <= Math.min(idx + 1, rowLimit); i++) {
            for (var j = Math.max(0, jdx - 1); j <= Math.min(jdx + 1, colLimit); j++) {

                var elNeg = document.querySelector('#cell-' + i + '-' + j);
                var elVal = elNeg.innerText;

                if (i === idx && j === jdx) {
                    continue;
                } else if (elVal == 0 && !elNeg.classList.contains('shown')) {
                    elNeg.classList.add('shown');
                    expandShown(board, elNeg, i, j);
                    gState.shownCount++;
                } else if (!elNeg.classList.contains('shown')) {
                    elNeg.classList.add('shown');
                    gState.shownCount++;
                }

            }
        }
    }
}

function startClock() {
    gIntervalClock = setInterval (function(){ displayTime() }, 1000);

    function displayTime () {
        var elClock = document.querySelector('.notice');
        elClock.innerHTML = '<p> seconds passed: '+gState.secsPassed+'</p>';
        gState.secsPassed++;
    }
}

function stopClock() {
    clearInterval(gIntervalClock);
}


//function for testing with mine locations set:
// function buildBoard(level) {
//     var board = [];
//     for (var i = 0; i < level.SIZE; i++) {
//         board[i] = []
//         for (var j = 0; j < level.SIZE; j++) {
//             board[i][j] = {
//                 id: [i, j],
//                 mine: false,
//                 shownStatus: false
//             }
//         }
//     }
//     board[1][1].mine = true;
//     board[2][2].mine = true;

//     return board;
// }