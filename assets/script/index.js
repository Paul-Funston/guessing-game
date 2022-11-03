'use strict';
/*
    JavaScript Basics
    Paul Funston

    Working with Forms
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



let codeNum = '';

function makeCode() {
  while (codeNum.length < 4)
    codeNum += numFrom(0, 9).toString();
}

window.addEventListener('load', () => {
  makeCode();
});

const keypad = select(".keypad");
const keyNums = document.querySelectorAll('.key-num');
const backSpace = select('.back');
const clear = select('.clear');
const submitGuess = select('.guess');
const prevGuess = [];
let curGuess = '';


function makeGuess(n) {
  if (curGuess.length < 4)
    curGuess += n.toString(); 
    console.log(curGuess);
}

keyNums.forEach(num => {
  onEvent('click', num, function() {
    makeGuess(num.value);
  })
});

onEvent('click', clear, function() {
  curGuess = '';
  console.log(curGuess);

})

onEvent('click', backSpace, function() {
  let guessLength = curGuess.length -1;
  curGuess = curGuess.slice(0, guessLength)
  console.log(curGuess);
})