var spaceStuff = ["cosmos", "supernova", "blackhole", "star", "dust", "comet", "universe"];

let answer = "";
let mistakes = 0;
let guessed = [];
let wins = 0;
let loses = 0;
let gameDone = false;
let guessesRemaining = 10;


function wordRandom() {
    answer = spaceStuff[Math.floor(Math.random() * spaceStuff.length)];
};

document.onkeypress = function (event) {
    var userGuess = event.key;
    userGuess = userGuess.toLowerCase();
    checkGuess(userGuess);
    drawUnderScore();
};

function checkGuess(userGuess) {
    if (gameDone === true) {
        reset();
        return;
    }
    var theLetter = false;
    var alphabetArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    for (i = 0; i < alphabetArray.length; i++) {
        if (userGuess === alphabetArray[i]) {
            theLetter = true;
        }
    }
    if (theLetter === false) {
        alert("No letter like that in space!");
        return;
    }
    var letterMatch = false;
    for (i = 0; i < answer.length; i++) {
        if (userGuess === answer[i]) {
            letterMatch = true;
            wordSpace[i] = userGuess;
        }
    }
    var didWeWin = true;
    for (i = 0; i < answer.length; i++) {
        if (wordSpace[i] != answer[i]) {
            didWeWin = false;
        }
    }
    if (didWeWin === true) {
        winnerFunction();
        return;
    }
    for (i = 0; i < guessed.length; i++) {
        if (userGuess === guessed[i]) {
            return;
        }
    }
    if (!letterMatch) {
        guessesRemaining--;
        mistakes++;
        updateMistake();
        guessesRemainingFunction();
        guessed.push(userGuess);
        alreadyGuessedFunction();
    }
    if (guessesRemaining === 0) {
        loserFunction();
        reset();
        return;
    }
}
function alreadyGuessedFunction() {
    document.getElementById("guessed").innerHTML = guessed;
}
function guessesRemainingFunction() {
    document.getElementById("guessesLeft").innerHTML = guessesRemaining;
}
function updateMistake() {
    document.getElementById("mistakes").innerHTML = mistakes;
}

document.getElementById("currentWord").innerHTML = wordSpace;

function underScore() {
    var underscoreArray = [];
    for (i = 0; i < answer.length; i++) {
        underscoreArray.push("_");
    }
    return underscoreArray;
}

var wordSpace = underScore();

function drawUnderScore() {
    for (i = 0; i < wordSpace.length; i++) {
        document.getElementById("currentWord").innerHTML = wordSpace.join(" ");
    }
}

function winnerFunction() {
    wins++
    winsFunction();
}
function winsFunction() {
    document.getElementById("wins").innerHTML = wins;
    gameDone = true;
}
function loserFunction() {
    loses++
    losFunction();
}
function losFunction() {
    document.getElementById("loses").innerHTML = loses;
    gameDone = true;
}
function reset() {
    mistakes.length = 0;
    updateMistake();
    guessed.length = 0;
    alreadyGuessedFunction();
    guessesRemaining = 10;
    guessesRemainingFunction();
    answer = spaceStuff[Math.floor(Math.random() * spaceStuff.length)];
    wordSpace = underScore();
    gameDone = false;
}

