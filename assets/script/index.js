'use strict';
/*
    JavaScript Basics
    Paul Funston

    Code-Breaker
*/

// util functions
function onEvent(event, selector, callback) {
    return selector.addEventListener(event, callback);
}

function getElement(selector, parent = document) {
    return parent.getElementById(selector);
}

function select(selector, parent = document) {
    return parent.querySelector(selector);
}

function numFrom(a, b) {
    return Math.floor(Math.random() * (b - (a + 1)) + a);
}

function isNumber(input) {
  let entry = input.trim();
  if (entry.length > 0 && !isNaN(entry))
      return true; 

  return false;
}


// Make the Number to be found
let codeNum = '';
let victory = false;

function makeCode() {
  while (codeNum.length < 3)
    codeNum += numFrom(0, 9).toString();
    codeNum = parseInt(codeNum);
    console.log(codeNum);
}

window.addEventListener('load', () => {
  makeCode();
});

// Testing input and creating a history of guesses
const prevGuess = [];
let curGuess = '';
const guessNum = select('.guess-num');
const makeGuess = select('.make-guess');
const feedback = select('.feedback');
const history = select('.guess-hist')
let count = 0;

onEvent('click', makeGuess, () => {
  let a = guessNum.value;
  let guess = 0;
  
  if (isNumber(a)) {
      count++;
      guess = parseInt(a);  
      if (guess === codeNum) {
          feedback.innerText = `You got it!`;
          addHistory(guess);
          victory = true;
          askStartOver(victory);

      } else if (guess > codeNum) {
          feedback.innerText = `Too Big! ${10 - count} tries left`;
          addHistory(guess);
      } else {
          feedback.innerText = `Too Small! ${10 - count} tries remain`;
          addHistory(guess);

      }

  } else 
  feedback.innerText = `Enter a valid number`;
  
  if (count >= 10) {
    addHistory(codeNum)
    askStartOver();
  }

});

function addHistory(guess) {
  const div = document.createElement('div');
  div.classList.add('row');
  const p = document.createElement('p');
  p.textContent = guess;
  div.append(p);
  const arrow = document.createElement('i')
  arrow.classList.add("fa-solid");
  if (guess > codeNum)
    arrow.classList.add("fa-arrow-down");
  if (guess < codeNum)
    arrow.classList.add("fa-arrow-up");
  if (guess === parseInt(codeNum))
    arrow.classList.add("fa-circle-check");

  if (proximity(guess) < 10)
    arrow.classList.add('green');
  if (proximity(guess) < 100)
    arrow.classList.add('yellow');
  if (proximity(guess) >= 100)
    arrow.classList.add('red');

  div.append(arrow);
  history.append(div);
}

function proximity(guess, target = codeNum) {
  return Math.abs(target - guess);
}

// Reset button and restart game popup
const confirmRestart = select('.restart');
const denyRestart = select('.close')
const retry = select ('.reset');
const playAgain = select('.play-again');
const confirmBox = select('.confirm-box');
const toDelete = document.querySelectorAll('.delete-me');

onEvent('click', retry, () => {
  askStartOver(victory);
})

onEvent('click', confirmRestart, () => {
  restart();
});

onEvent('click', denyRestart, () => {
  playAgain.classList.remove('active');
});

function askStartOver(outcome = false) {
  const toDelete = document.querySelectorAll('.delete-me');
  toDelete.forEach(item => {
    item.remove();
  });

  playAgain.classList.add('active');
  let message = 'Restart';
  let messageTwo = 'Are you sure?';

  if (outcome) {
    message = "You Win!";
    messageTwo = 'Play again?';
  }

  if (count >= 10) {
      message = "Try again?";
      messageTwo = `The number was ${codeNum}`;
    }

  const h2 = document.createElement('h2');
  h2.classList.add('delete-me');
  h2.textContent = message;
  let p = document.createElement('p');
  p.textContent = messageTwo;
  p.classList.add('delete-me');
  confirmBox.prepend(p);
  confirmBox.prepend(h2);
}

function restart() {
  count = 0;
  guessNum.value = '';
  codeNum = '';
  makeCode();
  history.innerHTML = '';
  feedback.innerText = 'Guess a number from 1-999';
  playAgain.classList.remove('active');
  victory = false;
}




