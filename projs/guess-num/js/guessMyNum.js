'use strict';
console.log('Guess My Number');

var akrai = Math.ceil(Math.random() * 5);

function runGuessGame(num) {
    var elResult = document.querySelector('.text');
    var uGuess = +prompt('Guess my number');
    if (uGuess > akrai) {
        console.log(uGuess, ' is bigger than my number');
        elResult.innerText = uGuess + ' is bigger than my number \
            try a smaller number'
    } else if (uGuess < akrai) {
        console.log(uGuess, ' is smaller than my number');
        elResult.innerText = uGuess + ' is smaller than my number, \
            try a bigger number'
    } else {
        console.log('Success! You guessed it. ', uGuess, ' was my number');
        elResult.innerText = 'Success! You guessed it. ' + uGuess + ' was my number.';
    }
}
