// JavaScript source code

    let currentInput = '0';
    let previousInput = '';
    let opertion = null;
    let memory = 0;

    const display = document.getElementById('display');

    function updateDisplay() {
        display.value = currentInput;
        }

    function appendNumber(number) {
            if (currentInput === '0' || currentInput === 'Error') {
        currentInput = number;
            } else {
        currentInput += number;
            }
    updateDisplay();
        }

    function appendDot() {
            if (!currentInput.includes('.')) {
        currentInput += '.';
            }
    updateDisplay();
        }

    function chooseOperation(operator) {
            if (currentInput === 'Error') return;
    if (previousInput !== '') {
        compute();
            }
    operation = operator;
    previousInput = currentInput;
    currentInput = '0';
        }

    function compute() {
            if (operation === null || previousInput === '' || currentInput === '') return;
    let result;
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);
    switch (operation) {
                case '+': result = prev + curr; break;
    case '-': result = prev - curr; break;
    case '*': result = prev * curr; break;
    case '/':
    if (curr === 0) {result = 'Error'; break }
    result = prev / curr;
    break;
            }
    currentInput = String(result);
    opertion = null;
    previousInput = '';
    updateDisplay();
        }

    function clear() {
        currentInput = '0';
    updateDisplay();
        }

    function clearAll() {
        currentInput = '0';
    previousInput = '';
    opertion = null;
    updateDisplay();
        }

    function backspace() {
            if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
            } else {
        currentInput = '0';
            }
    updateDisplay();
        }

    function minusSign() {
            if (currentInput !== '0') {
        currentInput = currentInput.startsWith('-') ? currentInput.slice(1) : '-' + currentInput;
            }
    updateDisplay();
        }

    function square() {
            const value = parseFloat(currentInput);
    if (value < 0) {
        currentInput = 'Error';
            } else {
        currentInput = String(Math.sqrt(value));
            }
    updateDisplay();
        }

    function percent() {
            const value = parseFloat(currentInput);
    currentInput = String(value / 100);
    updateDisplay();
        }

    function inverse() {
            const value = parseFloat(currentInput);
    if (value === 0) {
        currentInput = 'Error';
            } else {
        currentInput = String(1 / value);
            }
    updateDisplay();
        }

    // память
    function memoryClear() {
        memory = 0;
        }
    function memoryRecall() {
        currentInput = String(memory);
    updateDisplay();
        }
    function memoryStore() {
        memory = parseFloat(currentInput);
        }
    function memoryAdd() {
        memory += parseFloat(currentInput);
        }

function highlightButton(key) {
    const button = document.querySelector(`button[data-key="${key}"]`);
    if (button) {
        button.classList.add('active');
        setTimeout(() => {
            button.classList.remove('active');
        }, 150);
    }
}

document.addEventListener('keydown', function (event) {
    const key = event.key;

    // подсвечивание клавиш
    highlightButton(key);

    if (!isNaN(key)) {
        appendNumber(key);
    } else if (key === '.') {
        appendDot();
    } else if (['+', '-', '*', '/'].includes(key)) {
        chooseOperation(key);
    } else if (key === 'Enter' || key === '=') {
        highlightButton('=');
        compute();
    } else if (key === 'Escape') {
        highlightButton('C');
        clearAll();
    } else if (key === 'Backspace') {
        highlightButton('Backspace');
        backspace();
    } else if (key === 'Delete') {
        highlightButton('AC');
        clear();
    } else if (key === '%') {
        highlightButton('%');
        percent();
    } else if (key === 's') {
        highlightButton('√');
        square();
    } else if (key === 'i') {
        highlightButton('1/x');
        inverse();
    } else if (key === '-') {
        highlightButton('±');
        minusSign();
    }
});
    

    document.getElementById('close-button').addEventListener('click', () => {
    window.close();
    });
