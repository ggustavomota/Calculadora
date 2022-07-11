const numbersbuttom = document.querySelectorAll('[data-number]')
const operatorsbuttom = document.querySelectorAll('[data-operator]')
const equalbuttom = document.querySelector('[data-equal]')
const deletebuttom = document.querySelector('[data-delete]')
const allclearbuttom = document.querySelector('[data-all-clear]')
const previousshow = document.querySelector('[data-previous-operant]')
const currentshow = document.querySelector('[data-current-operant]')
//Clear e Calculator são só nomes, não possuem função própria nenhuma, foi somente atribuído a esse nome.
class Calculator{
    constructor(previousshow, currentshow){
        this.previousshow = previousshow;
        this.currentshow = currentshow;
        this.clear();
    }

    formatDisplayNumber(number){
        const stringnumber = number.toString()

        const integerDigits = parseFloat(stringnumber.split('.')[0]);
        const decimalDigits = stringnumber.split('.')[1];

        let integerDisplay;

        if(isNaN(integerDigits)){
            integerDisplay = '';
        }
        else{
            integerDisplay = integerDigits.toLocaleString('en', {
            MaximumFractionDigits: 0,
        })}

        if(decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`
        } else{
            return integerDisplay;
        }

    }

    delete(){
        this.currentsh = this.currentsh.toString().slice(0, -1);
    }


    calculate(){
        let result;
        const _previousshfloat = parseFloat(this.previoussh);
        const _currentshfloat = parseFloat(this.currentsh);
        if(isNaN(_previousshfloat) || isNaN(_currentshfloat)) return;
        switch(this.operation){
            case '+':
                result = _previousshfloat + _currentshfloat;
                break;
            case '-':
                result = _previousshfloat - _currentshfloat;
                break;
            case '÷':
                result = _previousshfloat / _currentshfloat;
                break;
            case 'x':
                result = _previousshfloat * _currentshfloat;
                break;
            default:
                return
        }
        
        this.currentsh = result;
        this.operation = undefined;
        this.previoussh = '';
    }



    chooseOperation(operation){

        if(this.currentsh === '') return;
        if(this.previoussh !== ''){
            this.calculate()
        }
        this.operation = operation;
        this.previoussh = this.currentsh;
        this.currentsh = '';
    }

    appersnumberfinal(number){
        //*Primeira linha: impede que haja mais de um ponto.
        if(this.currentsh.includes('.') && number === '.')return;
        this.currentsh = `${this.currentsh}${number.toString()}`
    }

    clear(){
        this.previoussh = '';
        this.currentsh = '';
        this.operation = undefined
    }
//Realiza na tela a ação feita por clear.
updateDisplay(){
    this.previousshow.innerText = `${this.formatDisplayNumber(this.previoussh)} ${this.operation || ''}`;
    this.currentshow.innerText = this.formatDisplayNumber(this.currentsh)
}
}

const calculatorv = new Calculator(
    previousshow,
    currentshow
)

for(const numberbuttom of numbersbuttom){
    numberbuttom.addEventListener('click', () => {
        calculatorv.appersnumberfinal(numberbuttom.innerText)
        calculatorv.updateDisplay()
    })
}
for(const operatorsbuttons of operatorsbuttom){
    operatorsbuttons.addEventListener('click', () => {
        calculatorv.chooseOperation(operatorsbuttons.innerText);
        calculatorv.updateDisplay();
    })
}

allclearbuttom.addEventListener('click', () => {
    calculatorv.clear();
    calculatorv.updateDisplay()
})

equalbuttom.addEventListener('click', () => {
    calculatorv.calculate();
    calculatorv.updateDisplay();
})

deletebuttom.addEventListener('click', () => {
    calculatorv.delete();
    calculatorv.updateDisplay()
})