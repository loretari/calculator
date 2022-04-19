const numberButton = document.querySelectorAll('.number');
const operationButtons = document.querySelectorAll('.operation');
const equalsButton = document.querySelector('.equal');
const deleteButton = document.querySelector('.delete');
const allClearButton = document.querySelector('.all_clear');
const valueEnteredTextElement = document.querySelector('.value-entered');
const valueResultTextElement = document.querySelector('.value-result');
const changeSignButton = document.querySelector('.sign');
const squareRootButton = document.querySelector('.squareRoot');

class Calculator {
    constructor(valueEnteredTextElement, valueResultTextElement) {
        this.valueEnteredTextElement = valueEnteredTextElement;
        this.valueResultTextElement = valueResultTextElement;
        this.clear();
    }

    clear() {
        this.valueEntered = '';
        this.valueResult = '';
        this.operation = undefined
    }

    delete() {
		if (this.valueResult === 'Error') return;
        this.valueResult = this.valueResult.toString().slice(0, -1);
    }

    appendNumber(number) {
        if ((number === '.' && this.valueResult.includes('.')) || this.valueResult === 'Error') return;
		if (this.valueResult.length > 10 && this.valueResult.includes('.')) return;
		if (this.valueResult.length > 9 && !this.valueResult.includes('.')) return;
		this.valueResult = this.valueResult.toString() + number.toString();

    }

    chooseOperation(operation) {
        if (this.valueResult === '') {
            this.valueResult = '0';
        }
        if (this.valueEntered !== '') {
            this.compute();
        }
        if (operation === '^') {
            this.operation = '^';
        } else {
            this.operation = operation;
        }

        this.valueEntered = this.valueResult;
        this.valueResult = '';
    }

    root() {
        let computation
        const result = parseFloat(this.valueResult)
        computation = Math.sqrt(result)
        if (isNaN(computation)) {
            this.valueResult = 'Error'
        } else {
            this.valueResult = computation;
        }

        this.operation = undefined;
        this.valueEntered = '';
    }

    changeSign() {
        if (this.valueResult === '') return
        let computation
        const result = parseFloat(this.valueResult)
        computation = result * (-1)
        this.valueResult = computation;
    }

    compute() {
        let computation;
        const entered = parseFloat(this.valueEntered);
        const result = parseFloat(this.valueResult);
        if (isNaN(entered) || isNaN(result)) return;

        switch (this.operation) {
            case '+':
                computation = entered + result;
                break;
            case '-':
                computation = entered - result;
                break;
            case '*':
                computation = entered * result
                break;
            case '÷':
                if (result === 0) {
                    computation = 'Error'
                } else {
                    computation = entered / result
                }
                break;
				case '/':
                if (result === 0) {
                    computation = 'Error'
                } else {
                    computation = entered / result
                }
                break;
            case '√':
                computation = Math.sqrt(entered)
                break;
            case '^':
                computation = entered ** result
                break;
            default: return
        }

        if (typeof computation !== 'number') {
            this.valueResult = 'Error';
        }

        if (computation.toString().length > 10 && computation.toString().includes('.')) {
            let divider = 10 - ((computation.toString().split('.'))[0].length)
            computation = Math.round(computation * (10 ** divider)) / (10 ** divider)
        } else if (computation.toString().length > 10) {
            let divider = computation.toString().length - 10
            computation = Math.round(computation / (10 ** divider))
        }

        this.valueResult = computation;
        this.operation = undefined;
        this.valueEntered = '';

    }

    updateDisplay() {
        this.valueResultTextElement.innerText = this.valueResult;
        if (this.operation != undefined) {
            this.valueEnteredTextElement.innerText = `${this.valueEntered} ${this.operation}`
        } else {
            this.valueEnteredTextElement.innerText = this.valueEntered;
        }
    }
}

const calculator = new Calculator(valueEnteredTextElement, valueResultTextElement);

numberButton.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

squareRootButton.addEventListener('click', () => {
    calculator.root();
    calculator.updateDisplay();
})

changeSignButton.addEventListener('click', () => {
    calculator.changeSign();
    calculator.updateDisplay();
})

equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
})

allClearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})

document.addEventListener('keypress', (e) => {
    if (e.key === '1' ||
        e.key === '2' ||
        e.key === '3' ||
        e.key === '4' ||
        e.key === '5' ||
        e.key === '6' ||
        e.key === '7' ||
        e.key === '8' ||
        e.key === '9' ||
        e.key === '0' ||
        e.key === '.') {
       calculator.appendNumber(e.key)
    } else if (e.key === '+' ||
        e.key === '-' ||
        e.key === '*' ||
        e.key === '/' ||
		e.key === '^' ){
       calculator.chooseOperation(e.key);
    }

	calculator.updateDisplay();
   
})

document.addEventListener('keydown', function (e) {
	if (e.key === 'Backspace') {
		calculator.delete();
		calculator.updateDisplay;
	} else if (e.key === 'Delete') {
		calculator.clear();
		calculator.updateDisplay();
	}
});

document.addEventListener('keydown', function (e) {
	if (e.key === 'Enter') {
		e.preventDefault();
		calculator.compute();
		calculator.updateDisplay();
	}
});
//window.addEventListener('keydown', (e) => {
//    switch (e.key) {
//        case 'Enter':
//            calculator.compute();
//            break;
//        case 'Delete':
//            calculator.clear();
//            break;
//        case 'Backspace':
//            calculator.delete();
//            break;
//    }
//    calculator.updateDisplay();
//})



