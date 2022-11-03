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

const form = select('form');
const numberOne = select('.number-one');
const button = select('.get-result');
const output = select('.output p');

/*
    getElementById and query Selector are the most common methods to connect JS
    to HTML elements

    document.forms returns a collection of forms
// console.log(document.forms['calc']);

    the 'elements' property stores a collection of the form elements
// console.log(form.elements.length);
*/

function isNumber(input) {
    let entry = input.trim();
    if (entry.length > 0 && !isNaN(entry))
        return true; 

    return false;
}

let count = 1;
let myNumber = numFrom(1, 999);

// adding event listener
onEvent('click', button, function() {
    let a = numberOne.value;
    let guess = 0;

    if (isNumber(a)) {
        guess = parseFloat(a);  
        if (guess === myNumber) {
            output.innerText = `You got it in ${count} attempts! Try again?`;
            count = 1;
            myNumber = numFrom(1, 999);
            numberOne.value = '';

        } else if (guess > myNumber) {
            output.innerText = `Too Big! Try a smaller number`;
        } else {
            output.innerText = `Too Small! Try a bigger number`;
        }

    } else 
    output.innerText = `Please enter valid numbers`;
    
    count++;
});

