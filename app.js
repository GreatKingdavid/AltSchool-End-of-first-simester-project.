//tergeted the the display
const display = document.getElementById("display");
let isResultShown = false;
let history = [];

//this is so that more than two numbers can be displayed at the same time
const appendToDisplay = (inputs) => {
  if (isResultShown && !isNaN(inputs)) {
    display.value = inputs;
    isResultShown = false;
    return;
  }

  const lastChar = display.value.slice(-1);
  const operators = ["+", "-", "*", "/", "%"];

  //  Prevent double decimals in one number
  if (inputs === ".") {
    const parts = display.value.split(/[\+\-\*\/\%]/);
    const lastNumber = parts[parts.length - 1];
    if (lastNumber.includes(".")) return;
  }

  //  Prevent double operators (e.g., ++, */)
  if (operators.includes(inputs) && operators.includes(lastChar)) {
    // here i replace the old operator with the new one if two where typed at the same time
    display.value = display.value.slice(0, -1) + inputs;
    return;
  }

  display.value += inputs;
  isResultShown = false;
};

//this clears all the display value and make it an empty string if it is a result and just removes the last nummber if it's not a result
const backspace = () => {
  if (isResultShown) {
    clearDisplay();
  } else {
    display.value = display.value.slice(0, -1);
  }
};

//this clears all the display value
const clearDisplay = () => {
  display.value = "";
  isResultShown = false;
};

//this function calculate what ever is in the display area
const calculate = () => {
  if (display.value !== "") {
    try {
      //history.push(display.value);
      displayHistory()
      display.value = String(eval(display.value));
      isResultShown = true;
    } catch (error) {
      display.value = "Error";
      isResultShown = true;
    }
  }
};

const displayHistory = () => {
 history.push(display.value);
};

//displayHistory()
