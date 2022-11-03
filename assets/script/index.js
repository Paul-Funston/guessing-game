'use strict';
/*
    JavaScript Basics
    Paul Funston

    Code-Breaker
*/

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



let codeNum = '';

function makeCode() {
  while (codeNum.length < 3)
    codeNum += numFrom(0, 9).toString();
    codeNum = parseInt(codeNum);
    console.log(codeNum);
}

window.addEventListener('load', () => {
  makeCode();
});


const prevGuess = [];
let curGuess = '';
const guessNum = select('.guess-num');
const makeGuess = select('.make-guess');
const feedback = select('.feedback');
let count = 0;

console.log(makeGuess);

onEvent('click', makeGuess, () => {
  let a = guessNum.value;
  let guess = 0;
  
  if (isNumber(a)) {
      count++;
      guess = parseInt(a);  
      if (guess === codeNum) {
          feedback.innerText = `You got it in ${count} attempts! Try again?`;
          count = 1;
          // codeNum = '';
          // makeCode();
          // numberOne.value = '';

      } else if (guess > codeNum) {
          feedback.innerText = `Too Big! Try a smaller number`;
      } else {
          feedback.innerText = `Too Small! Try a bigger number`;
      }

  } else 
  feedback.innerText = `Please enter valid numbers`;
  
});








