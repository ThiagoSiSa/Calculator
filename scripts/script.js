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
function calculate(input) {
  try{
  if (input.match(/[\/\*][\/\*]/)){
      throw ('Operação inválida')
    }
  }catch(error){
    return error;
  }
  const numbersAndOperators = input.split(/([\+\-]\d{1,}|[\+\-\*\/])/);
  while(numbersAndOperators.includes('')){
    let blankIndex = numbersAndOperators.indexOf('')
    numbersAndOperators.splice(blankIndex,1);
  }
 

  function aroundNumbers(operator){
    let operatorPosition = numbersAndOperators.indexOf(operator);
    let numberAfter = Number(numbersAndOperators[operatorPosition+1]);
    let numberBefore = Number(numbersAndOperators[operatorPosition-1]);

    if (isNaN(numberAfter) || isNaN(numberBefore)){
      throw ('Operação inválida')
    }
    if( operator ==='/' && numberAfter === 0 ){
      throw ('Operação inválida')
    }else{
      let number = {after : numberAfter, before: numberBefore, operatorPosition: operatorPosition};
      return number;
    }
  }      

  function spliceNumbersAndOperators(result, operatorPosition){
    return numbersAndOperators.splice(operatorPosition-1,3,result);
  }
  
  
  while (numbersAndOperators.length !== 1){

    try{
   
      if (numbersAndOperators.includes('/')){
        let number = aroundNumbers('/');
        let divResult = number.before / number.after;
        spliceNumbersAndOperators(divResult, number.operatorPosition); 
        continue;        
      }

      if (numbersAndOperators.includes('*')){
        let number = aroundNumbers('*');
        let multResult = number.before * number.after;
        spliceNumbersAndOperators(multResult, number.operatorPosition); 
        continue;         
      }

      if (numbersAndOperators.includes('-')){
        let number = aroundNumbers('-')
        let subResult = number.before - number.after
        spliceNumbersAndOperators(subResult, number.operatorPosition)
        continue;
      
      }
      if (numbersAndOperators.includes('+')){
        let number = aroundNumbers('+');
        let sumResult = number.before + number.after;
        spliceNumbersAndOperators(sumResult, number.operatorPosition);
        continue;
      }
      else{
        let result =numbersAndOperators.reduce((acc, curr) => Number(acc)+Number(curr));
        spliceNumbersAndOperators(result, 1);
        continue;
      }
    }catch(error){
      return error;
    }

  }
  return numbersAndOperators.at(0) 
}

