
var spaceStuff = ["cosmos", "supernovae", "blackhole", "star"];

const maxTries = 10;
var guessedLetters = [];        // Stores the letters the user guessed
var currentWordIndex;           // Index of the current word in the array
var guessingWord = [];          // This will be the word we actually build to match the current word
var remainingGuesses = 0;       // How many tries the player has left
var gameStarted = false;        // Flag to tell if the game has started
var hasFinished = false;        // Flag for 'press any key to try again'     
// http://danorlovsky.tech/Articles/Javascript-Hangman-Tutorial

document.onkeydown = function(event) {
    if(hasFinished) {
        resetGame();
        hasFinished = false;
    } else {
        if(event.keyCode >= 65 && event.keyCode <= 90) {
            makeGuess(event.key.toLowerCase());
        }
    }
function resetGame() {
        remainingGuesses = maxTries;
        gameStarted = false;
        currentWordIndex = Math.floor(Math.random() * (spaceStuff.length));
        guessedLetters = [];
        guessingWord = [];
    
        for (var i = 0; i < spaceStuff[currentWordIndex].length; i++) {
            guessingWord.push("_");
        }
        updateDisplay();
        };
function updateDisplay() {
        document.getElementById("currentWord").innerText = "";
        for (var i = 0; i < guessingWord.length; i++) {
            document.getElementById("currentWord").innerText += guessingWord[i];
        }
        document.getElementById("remainingGuesses").innerText = remainingGuesses;
        document.getElementById("guessedLetters").innerText = guessedLetters;
        if(remainingGuesses <= 0) {
            hasFinished = true;
        }
        };
function makeGuess(letter) {
        if (remainingGuesses > 0) {
            if (!gameStarted) {
                gameStarted = true;
            }
            if (guessedLetters.indexOf(letter) === -1) {
                guessedLetters.push(letter);
                evaluateGuess(letter);
            }
        } 
        updateDisplay();
        };
function evaluateGuess(letter) {
        var positions = [];
        for (var i = 0; i < spaceStuff[currentWordIndex].length; i++) {
            if(spaceStuff[currentWordIndex][i] === letter) {
                positions.push(i);
            }
        }
        if (positions.length <= 0) {
            remainingGuesses--;
        } else {
            for(var i = 0; i < positions.length; i++) {
                guessingWord[positions[i]] = letter;
            }
        }
    };
};