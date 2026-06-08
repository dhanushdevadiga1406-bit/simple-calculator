const display = document.getElementById('display');
let currentValue = '0';
let previousValue = null;
let operator = null;
let shouldReset = false;

function updateDisplay() {
  display.textContent = currentValue;
}

function appendDigit(digit) {
  if (shouldReset || currentValue === '0') {
    currentValue = digit;
    shouldReset = false;
  } else {
    currentValue += digit;
  }
}

function setOperator(nextOperator) {
  if (operator !== null) {
    calculate();
  }
  previousValue = currentValue;
  operator = nextOperator;
  shouldReset = true;
}

function clearCalculator() {
  currentValue = '0';
  previousValue = null;
  operator = null;
  shouldReset = false;
}

function calculate() {
  if (operator === null || previousValue === null) return;

  const prev = parseFloat(previousValue);
  const current = parseFloat(currentValue);
  let result = 0;

  switch (operator) {
    case '+':
      result = prev + current;
      break;
    case '-':
      result = prev - current;
      break;
    case '*':
      result = prev * current;
      break;
    case '/':
      result = current === 0 ? 'Error' : prev / current;
      break;
  }

  currentValue = String(result);
  operator = null;
  previousValue = null;
  shouldReset = true;
}

function handleButtonClick(event) {
  const button = event.target;
  const action = button.dataset.action;
  const value = button.textContent;

  if (!action) return;

  if (action === 'digit') {
    appendDigit(value);
  } else if (action === 'operator') {
    setOperator(value);
  } else if (action === 'equals') {
    calculate();
  } else if (action === 'clear') {
    clearCalculator();
  }

  updateDisplay();
}

const buttons = document.querySelectorAll('.button');
buttons.forEach(button => button.addEventListener('click', handleButtonClick));
updateDisplay();
