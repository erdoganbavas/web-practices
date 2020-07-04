import Word from './word.js';
import helper from './helper.js';

const maxWordCount = 5; // maximum word count attacking

// word database
const wordList = ['door', 'pen', 'half', 'hotel', 'run', 'rush', 'zero'];

const words = [];
let score = 0;
let scoreElement = document.getElementById("score");

// holds word index got hit until word dies
let activeWordIndex = null;

for (let i=0; i<maxWordCount; i++) {
    const word = new Word(randomWord());
    
    // bind events
    word.onDie = onWordDies;
    word.onHit = onWordHits;

    words[i] = word;

    setTimeout(function(){
        word.attack();
    }, 1000 * i);
}

document.addEventListener("keyup", heroAttack);


function randomWord(){
    return wordList[ helper.random(0, wordList.length) ];
}

// callled when a word dies
function onWordDies(word) {
    activeWordIndex = null;

    word.reset(randomWord());
}

// called when a word reaches to hero
function onWordHits(word) {
    for (let i = 0; i < words.length; i++) {
        // stop every words animations
        words[i].stop();
    }

    // animations needs time to stop
    setTimeout(function() {
        alert(`GAME OVER! SCORE ${score}`)
    }, 10);
}

function heroAttack(e) {
    const letter = String.fromCharCode(e.keyCode).toLowerCase();

    if(activeWordIndex === null) {
        for (let i = 0; i < words.length; i++) {
            if(words[i].letters[0] === letter) {
                incrementScore();

                activeWordIndex = i;
                words[i].damage(letter);

                return;
            }
            
        }
    } else {
        if(words[activeWordIndex].letters[0] === letter) {
            incrementScore();
            words[activeWordIndex].damage(letter);
        }
    }
}

function incrementScore() {
    score++;

    scoreElement.innerText = score;
}