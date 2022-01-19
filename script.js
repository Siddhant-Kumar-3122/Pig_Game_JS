'use strict';
//Selecting Elements
let Score0El = document.querySelector('#score--0'); //Upper Score 0
let Score1El = document.querySelector('#score--1'); //Upper Score 1

let current0El = document.querySelector('#current--0'); //current Score 0
let current1El = document.getElementById('current--1'); //current Score 1

let player0El = document.querySelector('.player--0');
let player1El = document.querySelector('.player--1');

let diceEl = document.querySelector('.dice'); //Dice

const btnNew = document.querySelector('.btn--new'); //Button New
const btnRoll = document.querySelector('.btn--roll'); //Button Roll
const btnHold = document.querySelector('.btn--hold'); //Button Hold
const btnInstructions = document.querySelector('.btn--instructions'); //Button Instructions

const modalEl = document.querySelector('.modal');
const overlayEl = document.querySelector('.overlay');

//State Declaration
let playing, scores, currentScore, activePlayer;

//New Game Function

const init = function () {
    //Reset State Variables and classes
    Score0El.textContent = 0;
    Score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
    playing = true;
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;


    //Event Handlers
    btnRoll.addEventListener('click', rollDice);
    btnHold.addEventListener('click', holdScore);
};
init();


//Starting Conditions
Score0El.textContent = 0;
Score1El.textContent = 0;
diceEl.classList.add('hidden');

//Rolling Dice Function
function rollDice() {
    gameEnd();
    //1. Generating a random dice roll
    const diceRolled = Math.trunc(Math.random() * 6 + 1);

    //2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${diceRolled}.png`;

    //3. Check for rolled 1: 
    if (diceRolled !== 1) {
        //Add diceRolled to the Score0El
        currentScore += diceRolled;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
        switchPlayer();
    }
}

//Hold button Function
function holdScore() {
    gameEnd();
    //1. Add current score to active player's score and display it
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[`${activePlayer}`]
    //2. Check if the player won (Score > 100)
    if (scores[activePlayer] >= 100) {
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        playing = false;
        diceEl.classList.add('hidden');
        gameEnd();
    }
    //3.Switch Player
    switchPlayer();
}

//Switching Player Visual and values Function
function switchPlayer() {
    //Reset currentScore
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    //Switch to next player
    activePlayer = activePlayer === 0 ? 1 : 0;
    //Change active player visuals
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

//Instructions Modal
function showInstructions() {
    console.log('Button Clicked');
    modalEl.classList.remove('hidden');
    overlayEl.classList.remove('hidden');
}

//Close Modal
function closeModal() {
    modalEl.classList.add('hidden');
    overlayEl.classList.add('hidden');
}
document.querySelector('.close-modal').addEventListener('click', closeModal);
overlayEl.addEventListener('click', closeModal);
document.addEventListener('keydown', function (e) {
    console.log(e);
    if (e.key === 'Escape' && !modalEl.classList.contains('hidden')) {
        closeModal();
    }
});

//Event Handlers
btnNew.addEventListener('click', init);
btnInstructions.addEventListener('click', showInstructions);

//Game Finished function
function gameEnd() {
    if (!playing) {
        btnRoll.removeEventListener('click', rollDice);
        btnHold.removeEventListener('click', holdScore);
    }
}