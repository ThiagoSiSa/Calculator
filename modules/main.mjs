import { Tokenizer } from "./Tokenizer.mjs";
import { Calculator } from "./Calculator.mjs"; 

function calculate(input) {
  try {
    const tokenNumbersAndOperators = new Tokenizer(input).token();
    const result = new Calculator(tokenNumbersAndOperators).calculing();
    return result;
  } catch (error) {
    return error;
  }
}
console.log(calculate('-6-6'))

