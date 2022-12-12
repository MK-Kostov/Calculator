const mainSection = document.querySelector('.main-section');
const operateClear = document.querySelector('.button-clear');
const display = document.querySelector('.display');
const numberButtons = document.querySelectorAll('.button');
const operationButtons = document.querySelectorAll('.button-operation');
const resultButton = document.querySelector('.button-result');
const clearButton = document.querySelector('.button-clear');


let action = {
  '+': add,
  '-': subtract,
  '*': multiply,
  '/': divide,
  'clear': clear,
};

let displayValue = '';
let operator;
let firstNumber = '';
let secondNumber = '';



function clear() {
  displayValue = '';
  operator = undefined;
  firstNumber = '';
  secondNumber = '';
  populateDisplay();
}

function add(num1, num2) {
  return num1 + num2
}

function subtract(num1, num2) {
  return num1 - num2
}

function multiply(num1, num2) {
  return num1 * num2
}

function divide(num1, num2) {
  return num1 / num2
}

function operate(operator, num1, num2) {
  return action[operator](num1, num2);
}


function populateDisplay() {
  if (displayValue === 'Infinity' || displayValue === '-Infinity') {
    display.textContent = 'Invalid Operation'
  } else if (displayValue.length > 15) {
    displayValue = parseFloat(displayValue).toFixed(1)
    display.textContent = displayValue;
  } else if (displayValue.includes('NaN')) {
    clear()
  } else {
    display.textContent = displayValue || 0;
  }
}

function numberButtonClick(ev) {
  const clickedNumber = ev.target.textContent;

  buttonPress(clickedNumber);
}

function operatorButtonClick(ev) {
  const clickedOperator = ev.target.textContent;
  operatorClick(clickedOperator)
}


function buttonPress(clickedNumber) {
  let checkDecimal = displayValue
  if (firstNumber !== '') checkDecimal = checkDecimal.replace(firstNumber, '')
  if (clickedNumber === '.' && checkDecimal.includes('.')) return;

  displayValue += clickedNumber;
  populateDisplay()
}

function operatorClick(clickedOperator) {
  if (displayValue === '') return;
  if (firstNumber !== '' && operator !== '') {
    secondNumber = +displayValue.replace(firstNumber + operator, '');

    displayValue = operate(operator, firstNumber, secondNumber).toString();
    populateDisplay();

    secondNumber = '';
  }
  firstNumber = +displayValue;

  displayValue += clickedOperator;
  operator = clickedOperator;
  populateDisplay();
}

function resultPress(){
  if (firstNumber !== '') {
    secondNumber = +displayValue.replace(firstNumber + operator, '');

    displayValue = operate(operator, firstNumber, secondNumber).toString();
    populateDisplay();
    
    firstNumber = +displayValue;
    secondNumber = '';
    operator = '';
  }
}


  numberButtons.forEach(btn => btn.addEventListener('click', numberButtonClick))
  
  operationButtons.forEach(btn => btn.addEventListener('click', operatorButtonClick))
  
  resultButton.addEventListener('click', resultPress)
  
  clearButton.addEventListener('click', clear)
  
  // On keyboad number press
  document.addEventListener('keypress', function (ev) {
    if (!+ev.key && ev.key !== '.' && ev.key !== '0') return;
    const clickedNumber = ev.key;
    buttonPress(clickedNumber);
  
  })
  
  // On keyboad operator press
  document.addEventListener('keypress', function (ev) {
    const operatorKeys = '-+*/'
    if (!operatorKeys.includes(ev.key)) return;
  
    const clickedOperator = ev.key;
    operatorClick(clickedOperator)
  })
  
  // On keyboard enter press
  
  document.addEventListener('keypress', function (e) {
    if (e.key == 'Enter') resultPress();
    })