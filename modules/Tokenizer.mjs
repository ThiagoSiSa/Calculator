export class Tokenizer {
  constructor(userInput) {
    this.userInput = userInput;
  }
  token() {
    if (this.userInput.match(/[\/\*][\/\*]/)) {
      throw ('Operação inválida');
    }

    let numbersAndOperators = this.userInput.split(/([\+\-]\d{1,}|[\+\-\*\/])/);
    while (numbersAndOperators.includes('')) {
      let blankIndex = numbersAndOperators.indexOf('');
      numbersAndOperators.splice(blankIndex, 1);
    }
    return numbersAndOperators;
  }
}
