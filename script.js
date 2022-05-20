'use strict';

// Selecting Elements

// Elements for active state of player
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

// Score Elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');

// Current score of the player1
const current0El = document.getElementById('current--0');
// Current score of the player2
const current1El = document.getElementById('current--1');

// Dice Elements
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Starting Conditions of game
/* Added to init function
score0El.textContent = 0;
score1El.textContent = 0;

diceEl.classList.add('hidden');
*/

// scores are the final scores which will be accumulated and are bassically total scores...
// const scores = [0, 0];
// Adding to init function

// currentScore variable should outside the btnRoll function cause if we should assign it inside each time we click btnRoll button then currentScore will againn resetted to 0.
// let   currentScore = 0;
// Adding to init function

// ActivePlayer variable will be used to keep track on which player is playing right now e.g. When the Dice is Rolled
// let activePlayer = 0;
// Adding to init function

// To keep track if player is playing or not
// let playing = true;
// Adding to init function

let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');

  current0El.textContent = 0;
  current1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;

  diceEl.classList.add('hidden');
};

init();

// When we switch to new player then the score of the previous player should get resetted to 0 and new players score should start adding one by one
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling Dice Functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1.  Generating a random Dice roll
    // We don't want global variable cause every time we click the btnRoll button we want to generate a random number of dice
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2.Display Dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    // 3.Check For rolled 1: if true, switch to next player
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice; // currentScore = currentScore + dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      // current0El.textContent = currentScore; //CHANGE LATER
      //  Changing it dynamically useing string literals
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore; //scores[1] = scores[1] +currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      // Finish the game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // 3. Switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
