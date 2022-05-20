export class Calculator {
  constructor(tokenNumbersAndOperators) {
    this.tokenNumbersAndOperators = tokenNumbersAndOperators;
  }

  calculing() {

    while (this.tokenNumbersAndOperators.length !== 1) {

      if (this.tokenNumbersAndOperators.includes('/')) {
        let number = this._aroundNumbers('/');
        let divResult = number.before / number.after;
        this._spliceNumbersAndOperators(divResult, number.operatorPosition);
        continue;
      }

      if (this.tokenNumbersAndOperators.includes('*')) {
        let number = this._aroundNumbers('*');
        let multResult = number.before * number.after;
        this._spliceNumbersAndOperators(multResult, number.operatorPosition);
        continue;
      }

      if (this.tokenNumbersAndOperators.includes('-')) {
        let number = this._aroundNumbers('-');
        let subResult = number.before - number.after;
        this._spliceNumbersAndOperators(subResult, number.operatorPosition);
        continue;

      }
      if (this.tokenNumbersAndOperators.includes('+')) {
        let number = this._aroundNumbers('+');
        let sumResult = number.before + number.after;
        this._spliceNumbersAndOperators(sumResult, number.operatorPosition);
        continue;
      }
      else {
        let result = this.tokenNumbersAndOperators.reduce((acc, curr) => Number(acc) + Number(curr));
        this._spliceNumbersAndOperators(result, 1);
        continue;
      }

    }
    return this.tokenNumbersAndOperators.at(0);
  }
  _aroundNumbers(operator) {
    let operatorPosition = this.tokenNumbersAndOperators.indexOf(operator);
    let numberAfter = Number(this.tokenNumbersAndOperators[operatorPosition + 1]);
    let numberBefore = Number(this.tokenNumbersAndOperators[operatorPosition - 1]);

    if (isNaN(numberAfter) || isNaN(numberBefore)) {
      throw ('Operação inválida');
    }
    if (operator === '/' && numberAfter === 0) {
      throw ('Operação inválida');
    } else {
      let number = { after: numberAfter, before: numberBefore, operatorPosition: operatorPosition };
      return number;
    }
  }
  _spliceNumbersAndOperators(result, operatorPosition) {
    return this.tokenNumbersAndOperators.splice(operatorPosition - 1, 3, result);
  }
}
