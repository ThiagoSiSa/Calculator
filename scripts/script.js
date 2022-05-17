let lightTheme = "styles/light.css";
let darkTheme = "styles/dark.css";

//adding event handler on the document to handle keyboard inputs
document.addEventListener("keydown", keyboardInputHandler);

//function to handle keyboard inputs
function keyboardInputHandler(e) {
  //grabbing the liveScreen
  let res = document.getElementById("result");

  //numbers
  if (e.key === "0") {
    res.value += "0";
  } else if (e.key === "1") {
    res.value += "1";
  } else if (e.key === "2") {
    res.value += "2";
  } else if (e.key === "3") {
    res.value += "3";
  } else if (e.key === "4") {
    res.value += "4";
  } else if (e.key === "5") {
    res.value += "5";
  } else if (e.key === "6") {
    res.value += "6";
  } else if (e.key === "7") {
    res.value += "7";
  } else if (e.key === "7") {
    res.value += "7";
  } else if (e.key === "8") {
    res.value += "8";
  } else if (e.key === "9") {
    res.value += "9";
  }

  //operators
  if (e.key === "+") {
    res.value += "+";
  } else if (e.key === "-") {
    res.value += "-";
  } else if (e.key === "*") {
    res.value += "*";
  } else if (e.key === "/") {
    res.value += "/";
  }

  //decimal key
  if (e.key === ".") {
    res.value += ".";
  }

  //press enter to see result
  if (e.key === "Enter") {
    e.preventDefault();

    res.value = calculate(res.value || null);
  }

  //backspace for removing the last input
  if (e.key === "Backspace") {
    let resultInput = res.value;

    //remove the last element in the string
    res.value = resultInput.substring(0, res.value.length - 1);
  }
}

// Clears the screen on click of C button.
function clearScreen() {
  document.getElementById("result").value = '';
}

// Displays entered value on screen.
function liveScreen(value) {
  let res = document.getElementById("result");
  if (!res.value) {
    res.value = '';
  }
  res.value += value;
}

// Swaps the stylesheet in order to  achieve dark mode.
function changeTheme() {
  let darkMode = document.getElementById("dark-mode");
  let theme = document.getElementById("theme");
  if (theme.getAttribute("href") === lightTheme) {
    theme.href = darkTheme;
    darkMode.innerHTML = "Light Mode 🌞";
  } else {
    theme.href = lightTheme;
    darkMode.innerHTML = "Dark Mode 🌙";
  }
}

// 1+2-3*4/3
class Tokenizer {
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

class Calculator {
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
    return this.tokenNumbersAndOperators.at(0)
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

function calculate(input) {
  try {
    const tokenNumbersAndOperators = new Tokenizer(input).token();
    const result = new Calculator(tokenNumbersAndOperators).calculing();
    return result;
  } catch (error) {
    return error;
  }
}
