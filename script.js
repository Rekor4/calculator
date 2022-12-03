let firstNum = '';
let secondNum = '';

let sign = ''; 
let finish = false;


const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const operation = ['-', '+', 'x', '/'];

const showDisplay = document.querySelector('.calc-display p');


function clearDisplay () {
    firstNum = '';
    secondNum = '';
    sign = '';
    finish = false;
    showDisplay.textContent = 0;
}

document.querySelector('.ac').onclick = clearDisplay;

document.querySelector('.buttons').onclick = (event) => {
    // нажата не кнопка
    if(!event.target.classList.contains('btn')) return;
    // нажата кнопка clearAll ac
    if(event.target.classList.contains('ac')) return;

    showDisplay.textContent = '';
    // получаю нажатую кнопку
    const buttonValue = event.target.textContent;

    // press 0-9 or .
    if (digit.includes(buttonValue)) {
        if (secondNum === '' && sign === '') {
        firstNum = firstNum + buttonValue;
        console.log(firstNum, secondNum, sign);
        showDisplay.textContent = firstNum;
        } 
        else if (firstNum!== '' && secondNum!== '' && finish) {
            secondNum = buttonValue;
            finish = false;
            showDisplay.textContent = secondNum;


        }
        else {
            secondNum = secondNum + buttonValue;
            showDisplay.textContent = secondNum;
        }
        return;
    }

    // press operation
    if (operation.includes(buttonValue)) {
        sign = buttonValue;
        showDisplay.textContent = sign;
        console.log(firstNum, secondNum, sign)
        return;
    }
    // press +/-
    if (buttonValue === '+/-') {
        firstNum = firstNum * (-1);
        console.log(firstNum, secondNum, sign)
        showDisplay.textContent = firstNum;
    }

    if (buttonValue === '%') {
        firstNum = firstNum * 0.01;
        showDisplay.textContent = firstNum
    }

    // press equals
    if (buttonValue === '=') {
        if (secondNum === '') {
            firstNum = secondNum
        }
        switch(sign) {
            case "+":
                firstNum = (+firstNum) + (+secondNum); // ??
                break;
            case "-":
                firstNum = firstNum - secondNum;
                break;
            case "x":
                firstNum = firstNum * secondNum;
                break;
            case "/":
                if (secondNum === '0') {
                    showDisplay.textContent = 'Error';
                    firstNum = '';
                    secondNum = '';
                    sign = '';
                    return;
                }
                firstNum = firstNum / secondNum;
                break;
        }
        finish = true;
        showDisplay.textContent = firstNum;

    }

}