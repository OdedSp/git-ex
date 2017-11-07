'use strict'
console.log('Balloon Pop');

var gBalloons = [];
var gIntervalBalloons=null;

function createBalloons() {
    var balloon1 = { color: 'red', bottom: 0 };
    var balloon2 = { color: 'blue', bottom: 0 };
    gBalloons.push(balloon1);
    gBalloons.push(balloon2);

    var elBalloons = document.querySelector('.balloons');
    for (var i = 0; i < gBalloons.length; i++) {
        var balloon = gBalloons[i];
        var strHtml = '<div class="balloon balloon' + (i + 1) + '" onclick="popBalloon(this)"></div>';
        console.log('strHtml', strHtml);
        elBalloons.innerHTML += strHtml;
    }
}

function init() {
    createBalloons();
    releaseBalloons();
};

function releaseBalloons() {

    var elBalloons = document.querySelectorAll('.balloon');

    gIntervalBalloons = setInterval(function () {
        for (var i = 0; i < elBalloons.length; i++) {
            var elBalloon = elBalloons[i];
            var balloon = gBalloons[i];
            balloon.bottom += 10;
            elBalloon.style.bottom = balloon.bottom + 'px';

            if (balloon.bottom >= 450) {
                stopBalloons()
            }
        }
    }, 100);
}

function stopBalloons() {
    if (gIntervalBalloons) {
        clearInterval(gIntervalBalloons);
        gIntervalBalloons = null;
    }
}

var popSound = new Audio ("sounds/pop.wav");

function popBalloon(elBalloon) {
    elBalloon.style.opacity = '0';
    elBalloon.style.transition = 'opacity 1s';
    popSound.play();
}