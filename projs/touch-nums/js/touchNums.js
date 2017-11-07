'use strict'
console.log('Touch Nums');

var gPossibleNums = getPossibleNums();
var gCurrNum = 1;
var MAX_NUM = 16;

var intervalClock;
var elClock;

function getPossibleNums() {
    var nums = [];
    for (var i = 0; i < MAX_NUM; i++) {
        nums.push(i + 1);
    }
    return nums;
}

function drawNum() {
    return gPossibleNums.splice(Math.floor(Math.random() * gPossibleNums.length), 1)[0];

}

function renderBoard() {
    var elBoard = document.querySelector('#board');
    var strHtml = '';

    for (var i = 0; i < 4; i++) {
        strHtml += '<tr>\n';
        for (var j = 0; j < 4; j++) {
            strHtml += '<td class="cell" onclick="changeTouchStatus(this)">';
            strHtml += drawNum();
            strHtml += '</td>';
        }
        strHtml += '\n</tr>\n';
    }
    elBoard.innerHTML = strHtml;
    console.log(strHtml);
}

function runTouchGame() {
    elClock = document.querySelector('.clock');
    gPossibleNums = getPossibleNums();
    renderBoard();
    startClock();
}

function changeTouchStatus(elCell) {
    console.log(elCell.innerText);
    if (+elCell.innerText === gCurrNum) {
        elCell.classList.add('touched');
        gCurrNum++
    }
}


function startClock() {
    elClock.style.display="block";
    var secondsCount = 0;
    var strHtml = '';
    function renderTime() {
        elClock.innerHTML = '<p>Seconds passed: '+secondsCount+'</p>';
        secondsCount++ 
        if (gCurrNum > MAX_NUM) {
            clearInterval(intervalClock);
            noticeWin(secondsCount);
        }      
    }
    intervalClock = setInterval(renderTime, 1000);
}

function noticeWin (score) {
    elClock.innerHTML = '<p>Way to go! it took you '+score+' seconds to touch all of deez nums</p>';
}