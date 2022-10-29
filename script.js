const symbols = {
    divide : '÷',
    multiply: '×',
    add: '+',
    subtract: '-',
    remainder: '%',
    result: ''
};

const allClear = document.querySelector('#button_clear');

allClear.addEventListener('click', ()=> {calculator.resetAll()});

const backspace = document.querySelector('#button_backspace');
backspace.addEventListener('click',() => {
    if(bottomValue.textContent === 0){
        return;
    }
    else{
        bottomValue.textContent = bottomValue.textContent.slice(0, bottomValue.textContent.length - 1)
        if(bottomValue.textContent === '') bottomValue.textContent = 0;
    }
})

const calculator = {
    resultValue : 0,
    operandValue : 0,
    currentOperator: 'result',
    calculate : function (operator){
        this.operandValue = parseFloat(bottomValue.textContent);
        if(this.currentOperator === 'result'){
            this.resultValue = this.operandValue;
            this.currentOperator = operator;
            setDisplay(this.operandValue,this.resultValue, this.currentOperator);
            flagReset = true;
            flagInput = true;
            flagDecimal = false;
        }
        else{
            switch (this.currentOperator) {
                case 'divide':
                    this.resultValue = this.resultValue / this.operandValue;
                    break;
            
                case 'multiply':
                    this.resultValue = this.resultValue * this.operandValue;
                    break;
                case 'add':
                    this.resultValue = this.resultValue + this.operandValue;
                    break;
                case 'subtract':
                    this.resultValue = this.resultValue - this.operandValue;
                    break;
                case 'remainder':
                    this.resultValue = this.resultValue % this.operandValue;
                    break;
                default:
                    break;
            }
            console.log(this.resultValue)
            this.operandValue = 0;
            this.currentOperator = operator;
            if(operator === 'result'){
                setDisplay('', this.resultValue, this.currentOperator);
                flagReset = true;
                flagInput = true;
                flagDecimal = false;
            }
            else{
                setDisplay(this.resultValue, this.resultValue, this.currentOperator);
                flagReset = true;
                flagInput = false;
                flagDecimal = false;
            }
        }
    },
    resetAll : function (){
        setDisplay(0,0,'result')
        this.resultValue = 0;
        this.operandValue = 0;
        this.currentOperator = 'result';
        flagReset = false;
        flagInput = false;
        flagDecimal = false;
    }
}

function setDisplay(a, b, currentOperator){
    bottomValue.textContent = b;
    topValue.textContent = `${a} ${symbols[`${currentOperator}`]}`;
}


const bottomValue = document.querySelector("#bottom_value");
const topValue = document.querySelector('#top_value');
let flagReset = false;
let flagInput = false;
let flagDecimal = false;

const digits = document.querySelectorAll(".digit");
digits.forEach((digit) => {
    digit.addEventListener('click', () => {
        if(digit.value === '.') {
            if(flagDecimal == false) return; 
            else flagDecimal = false;
        };
        if(bottomValue.textContent === '0' || flagReset === true)   {
            bottomValue.textContent = digit.value;
            flagDecimal = true;
        } 
        else {
            bottomValue.textContent =  bottomValue.textContent.toString() + digit.value.toString()
        }
        flagReset = false; 
        flagInput = true;

    })
})

const operators = document.querySelectorAll('.operator');

operators.forEach((operator) => {
    operator.addEventListener('click', () => {if(flagInput === true)  calculator.calculate(operator.value) });
})

