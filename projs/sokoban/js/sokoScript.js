'use strict';
console.log('Sokoban');

var gMap = generateMap();

var gGamerPos = [2, 2];

var gElMan;

function generateMap() {
    var mat = [];
    var size = 7
    for (var i = 0; i < size; i++) {
        mat[i] = []
        for (var j = 0; j < size; j++) {
            mat[i][j] = ''
            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1) {
                mat[i][j] = 'wall';
            } else {
                mat[i][j] = 'floor';
            }
        }
    }
    mat[3][3] = 'wall';
    // mat[4][5] = 'target';
    mat[5][5] = 'target';


    return mat;
}

function renderMap(map) {
    var strHtml = '';
    for (var i = 0; i < map.length; i++) {
        var row = map[i];
        strHtml += '<tr>';
        for (var j = 0; j < map[0].length; j++) {
            var cell = row[j];
            var tdId = 'cell-' + i + '-' + j;
            strHtml += '<td id="' + tdId + '" class="cell ' + cell + '" onclick="cellClicked(this,' + i + ',' + j + ')"></td>';
        }
        strHtml += '</tr>';
    }

    var elMap = document.querySelector('.gameBoard');
    elMap.innerHTML = strHtml;
}

function addMovable() {
    gElMan = document.querySelector('#cell-' + gGamerPos[0] + '-' + gGamerPos[1])
    gElMan.classList.add('man');
    // document.querySelector('#cell-2-3').classList.add('box');
    document.querySelector('#cell-2-4').classList.add('box');
}


function init() {
    renderMap(gMap);
    addMovable();
}

function cellClicked(elCell, idx, jdx) {
    if (!elCell.classList.contains('wall') &&
    (Math.abs(gGamerPos[0] - idx) === 1 ||
    Math.abs(gGamerPos[1] - jdx) === 1) &&
    gGamerPos[0] - gGamerPos[1] !== idx - jdx &&
    gGamerPos[0] + gGamerPos[1] !== idx + jdx) {
        
        console.log(idx, jdx, ' has been clicked')
        elCell.classList.add('man');
        gElMan.classList.remove('man');
        gElMan = elCell;
        gGamerPos = [idx, jdx];
    }
}

// Oded: did not have time to get into moving the boxes ):