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
    codeNum += toString(numFrom(0, 9));
}

