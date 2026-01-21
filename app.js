//tergeted the the display
const display = document.getElementById("display");
let isResultShown = false;
let isHistoryShown = false;
let history = [];


const adjustFontSize = () => {
  const length = display.value.length;
  
  if (length > 14) {
    display.style.fontSize = "1.2rem";
  } else if (length > 10) {
    display.style.fontSize = "1.8rem";
  } else if (length > 7) {
    display.style.fontSize = "2.2rem";
  } else {
    display.style.fontSize = "2.5rem"; // Original size
  }
};

//this is so that more than two numbers can be displayed at the same time
const appendToDisplay = (inputs) => {
  if ((isResultShown || isHistoryShown) && !isNaN(inputs)) {
    display.value = inputs;
    isResultShown = false;
    isHistoryShown = false;
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
  adjustFontSize()
  // isResultShown = false;
  isHistoryShown = false;
};

//this clears all the display value and make it an empty string if it is a result and just removes the last nummber if it's not a result
const backspace = () => {
  if (isResultShown || isHistoryShown) {
    clearDisplay();
  } else {
    display.value = display.value.slice(0, -1);
    adjustFontSize()
  }
};

//this clears all the display value
const clearDisplay = () => {
  display.value = "";
  isResultShown = false;
  isHistoryShown = false;
  adjustFontSize()
};

//this function calculate what ever is in the display area
const calculate = () => {
  if (display.value !== "") {
    try {
      //history.push(display.value);
      displayHistory();
      display.value = String(eval(display.value));
      adjustFontSize()
      isResultShown = true;
      isHistoryShown = false;
    } catch (error) {
      display.value = "Error";
      isResultShown = true;
    }
  }
};

const displayHistory = () => {
  if (display.value !== "" && display.value !== "Error") {
    history.push(display.value);
  }
};

const showHistoryOnScreen = () => {
  if (history.length > 0) {
    display.value = history[history.length - 2]; 
    isHistoryShown = true;  
    isResultShown = false;
  }
};
