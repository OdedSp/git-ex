'use strict';
console.log('In Picture');

var gQuests = [
    { id: 1, opts: ['France', 'Netherlands'], correctOptIndex: 0 },
    { id: 2, opts: ['Luxembourg', 'Russia'], correctOptIndex: 1 },
    { id: 3, opts: ['Netherlands', 'Luxembourg'], correctOptIndex: 1 }
];

var gCurrQuestIdx = 0;

function init() {
    renderQuest(gCurrQuestIdx)
}

function renderQuest(idx) {
    var elQuiz = document.querySelector('.quiz');
    var quest = gQuests[idx];
    var strHtml = ''
    console.log(quest)
    strHtml += '<div class="quest' + quest.id + '">' +
        '\n<img src="img/' + quest.id + '.png" />'
    for (var o = 0; o < quest.opts.length; o++) {
        strHtml += '\n<br/><button onclick="checkAnswer(' + o + ')">' + quest.opts[o] + '</button>'
    }
    strHtml += '\n</div>'
    console.log(strHtml);
    elQuiz.innerHTML = strHtml;
}

function checkAnswer(optIdx) {
    var currQuest = gQuests[gCurrQuestIdx]
    var correctOpt = currQuest.correctOptIndex
    var userOpt = optIdx
    
    if (gCurrQuestIdx+1===gQuests.length) {
        if (userOpt===correctOpt) {
            document.querySelector('.quiz').innerHTML = 'You know your flags!'    
        } else {
            document.querySelector('.quiz').innerHTML = 'Sorry, that was the wrong answer'
            console.log('wrong');
        }
    } else if (userOpt===correctOpt) {
        gCurrQuestIdx++;
        renderQuest(gCurrQuestIdx);
    } else {
        document.querySelector('.quiz').innerHTML = 'Sorry, that was the wrong answer'
        console.log('wrong');
    }
}