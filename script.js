let firstNum = '';
let secondNum = '';

let sign = '';
let finish = false;

const maxLength = 9;

const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const operation = ['-', '+', 'x', '/'];

const showDisplay = document.querySelector('.calc-display p');

function showTextForFirstNum() {
  if (showDisplay.textContent = Number.isInteger(firstNum)) {
    showDisplay.textContent = firstNum;
  } else {
    showDisplay.textContent = Number(firstNum).toFixed(8);
  }
}

function showTextForSecondNum() {
  if (showDisplay.textContent = Number.isInteger(secondNum)) {
    showDisplay.textContent = secondNum;
  } else {
    showDisplay.textContent = Number(secondNum).toFixed(8);
  }
}

function clearDisplay() {
  firstNum = '';
  secondNum = '';
  sign = '';
  finish = false;
  showDisplay.textContent = 0;
}

document.querySelector('.ac').onclick = clearDisplay;

document.querySelector('.buttons').onclick = (event) => {
  if (!event.target.classList.contains('btn')) return;
  if (event.target.classList.contains('ac')) return;

  showDisplay.textContent = '';
  const buttonValue = event.target.textContent;

  // press 0-9 or .
  if (digit.includes(buttonValue)) {
    if (secondNum === '' && sign === '') {
      if (buttonValue === '.' && firstNum === '') {
        firstNum = '0.';
      } else if (buttonValue !== '.' || !firstNum.includes('.')) {
        if (firstNum.length < maxLength) {
          firstNum += buttonValue;
        }
      }

      showDisplay.textContent = firstNum;
    } else if (firstNum !== '' && secondNum !== '' && finish) {
      secondNum = buttonValue;
      finish = false;
      showDisplay.textContent = secondNum;
    } else {
      if (buttonValue === '.' && secondNum === '') {
        secondNum = '0.';
      } else if (buttonValue !== '.' || !secondNum.includes('.')) {
        if (secondNum.length < maxLength) {
          secondNum += buttonValue;
        }
      }
      showDisplay.textContent = secondNum;
    }
    return;
  }

  if (operation.includes(buttonValue)) {
    sign = buttonValue;
    showDisplay.textContent = sign;
    return;
  }
  if (buttonValue === '+/-') {
    if (sign !== '') {
      secondNum *= (-1);
      showTextForSecondNum();
    } else {
      firstNum *= (-1);
      showDisplay.textContent = firstNum;
    }
  }
  if (buttonValue === '%') {
    if (sign !== '') {
      secondNum *= 0.01;
      showDisplay.textContent = secondNum;
    } else {
      firstNum *= 0.01;
      showTextForFirstNum();
    }
  }

  if (buttonValue === '=') {
    if (secondNum === '') {
      firstNum = secondNum;
    }
    switch (sign) {
      case '+':
        firstNum = (+firstNum) + (+secondNum); 
        break;
      case '-':
        firstNum -= secondNum;
        break;
      case 'x':
        firstNum *= secondNum;
        break;
      case '/':
        if (secondNum === '0') {
          showDisplay.textContent = 'Error';
          firstNum = '';
          secondNum = '';
          sign = '';
          return;
        }
        firstNum /= secondNum;
        break;
    }
    finish = true;
    showTextForFirstNum();

  }
};