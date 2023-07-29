'use strict';

// FUNCTIONS
// TO UPDATE UI
const displayTitle = function (title) {
  document.querySelector('.title').textContent = title;
};
const setBackgroundColor = function (color) {
  document.querySelector('body').style.backgroundColor = color;
};
const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};
const setMessageColor = function (color) {
  document.querySelector('.message').style.color = color;
};
const displaySecretNumber = function (number) {
  document.querySelector('.secret-number').textContent = number;
};
const displayScore = function (value) {
  document.querySelector('.score').textContent = value;
};
const displayScoreMessage = function (scoreMessage) {
  document.querySelector('.score-message').textContent = scoreMessage;
};

// TO MODIFY FUNCTIONALITY WHEN GAME IS WON OR LOST
const changeFunctionalityEndOfSubGame = function () {
  // clear input field and remove focus
  document.querySelector('.guess').value = '';
  document.querySelector('.guess').blur();
  // hide check button
  document.querySelector('.check').style.display = 'none';

  // show play again btn
  document.querySelector('.play-again').style.display = 'block';
};

// generate a random number between 1-100
let secretNumber = Math.trunc(Math.random() * 100) + 1;
console.log(`Secret number: ${secretNumber}`); // don't cheat ;)

// score = number of attempts the player has (max score if player finds number on first attempt)
let score = 10; // will decrement at each failed attempt
let highScore = 0; // highscore will update to equal score after each round if score is higher
displayScore(score); // start value: number of attempts the player has

// --- GAME STARTS ---
// EVENT LISTENERS
// CHECK BUTTON
// check player input against secret random number
document.querySelector('.check').addEventListener('click', function () {
  // keep focus on input by default
  document.querySelector('.guess').focus();

  // player guess
  const guess = Number(document.querySelector('.guess').value);

  // keep track of how many attemps player has had
  let numAttempt = 10 - score + 1;
  console.log('attempt ', numAttempt);

  // when no input from the player
  if (!guess) {
    displayMessage('No input! Enter a number:');
    setMessageColor('#c50d0d');

    // when guess = secret number, player wins
  } else if (guess === secretNumber) {
    // update UI to success
    displayTitle('You win!');
    setBackgroundColor('#60b347');
    displayMessage('Correct!');
    setMessageColor('#eee');
    displaySecretNumber(secretNumber);
    displayScore(score);
    displayScoreMessage(`Well done! You found it on try ${numAttempt}! Can you do even better?`);

    // player can play indefinitely while highscore is less than 10 (max score):
    changeFunctionalityEndOfSubGame();

    // and highscore updates after each round if score is higher than previous round
    if (score > highScore) {
      highScore = score;
      document.querySelector('.highscore').textContent = highScore;
      // if highscore = 10 (max), game over, must refresh browser to reset game
      if (highScore === 10) {
        displayScoreMessage(`Well done! You found it on the first try! You've reached the highest possible score! Refresh your browser to reset the game.`);
        // hide play again button
        document.querySelector('.play-again').style.display = 'none';
      }
    }
    // When guess is wrong, player keeps having another go until score = 0 (not 1, but we need 1 in code),
  } else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(guess > secretNumber ? 'Too high, try again!' : 'Too low, try again!');
      setMessageColor('#60b347');
      score--; // decrement num of attempts left on each try
      displayScore(score);

      // score = 0, no more attempts, game over for this round, but can play again until highscore reaches 10
    } else {
      // update UI to epic failure
      displayTitle('You lose!');
      setBackgroundColor('#c50d0d');
      displayMessage('You lost the game!');
      setMessageColor('#fff');
      displaySecretNumber(secretNumber);
      displayScore('0');

      // remove functionality:
      changeFunctionalityEndOfSubGame();
    }
  }
});

// PLAY AGAIN BUTTON
// generate new random number, reset values, UI and functionality
document.querySelector('.play-again').addEventListener('click', function () {
  secretNumber = Math.trunc(Math.random() * 100) + 1;
  console.log(`New secret number: ${secretNumber}`); // don't cheat ;)
  score = 10;
  displayTitle('Guess the number!');
  setBackgroundColor('#222');
  displayMessage('Start guessing...');
  setMessageColor('#eee');
  displaySecretNumber('?');
  displayScore(score);
  displayScoreMessage('');

  // show check button
  document.querySelector('.check').style.display = 'block';
  // hide play again button
  document.querySelector('.play-again').style.display = 'none';
});
