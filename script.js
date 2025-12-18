document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    let currentOperand = '';
    let previousOperand = '';
    let operation = undefined;

    const updateDisplay = () => {
        display.innerText = currentOperand || '0';
    };

    const appendNumber = (number) => {
        if (number === '.' && currentOperand.includes('.')) return;
        currentOperand = currentOperand.toString() + number.toString();
        updateDisplay();
    };

    const chooseOperation = (op) => {
        if (currentOperand === '') return;
        if (previousOperand !== '') {
            compute();
        }
        operation = op;
        previousOperand = currentOperand;
        currentOperand = '';
    };

    const compute = () => {
        let computation;
        const prev = parseFloat(previousOperand);
        const current = parseFloat(currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        switch (operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '/':
                computation = prev / current;
                break;
            default:
                return;
        }
        currentOperand = computation;
        operation = undefined;
        previousOperand = '';
        updateDisplay();
    };

    const clear = () => {
        currentOperand = '';
        previousOperand = '';
        operation = undefined;
        updateDisplay();
    };

    document.querySelector('.buttons').addEventListener('click', (event) => {
        if (!event.target.matches('button')) return;

        const button = event.target;
        
        if (button.classList.contains('operator')) {
            if (button.innerText === 'C') {
                clear();
            } else {
                chooseOperation(button.innerText);
            }
            return;
        }

        if (button.classList.contains('equals')) {
            compute();
            return;
        }

        appendNumber(button.innerText);
    });
});
