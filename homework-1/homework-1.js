class Calculator {
    constructor (firstNumber, secondNumber) {
        this.firstNumber = firstNumber;
        this.secondNumber = secondNumber;
    }

    add () {
        return this.firstNumber + this.secondNumber;
    }

    minus () {
        return this.firstNumber - this.secondNumber;
    }

    multiply() {
        return this.firstNumber * this.secondNumber;
    }

    division() {
        return this.firstNumber / this.secondNumber;
    }

    percentage() {
        return (this.firstNumber / this.secondNumber) * 100;
    }

}

// Test
const calculator = new Calculator(2, 5);
console.log(calculator.add());
console.log(calculator.minus());
console.log(calculator.multiply());
console.log(calculator.division());
console.log(calculator.percentage());