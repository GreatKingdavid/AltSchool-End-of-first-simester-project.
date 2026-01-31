//tergeted the the display
const display = document.getElementById("display");
let isResultShown = false;
let isHistoryShown = false;
let history = [];

//this is so that more than two numbers can be displayed at the same time
const appendToDisplay = (inputs) => {
  // added the visual operators and exponent symbols to this list
  const operators = ["+", "-", "*", "/", "%", "×", "÷", "^", "**"];

  // here i check if it is a result and i want to add an operation to it
  if (isResultShown && operators.includes(inputs)) {
    isResultShown = false;
  } 
  // if it is a result or history and i click a number it starts fresh
  else if ((isResultShown || isHistoryShown) && !isNaN(inputs)) {
    display.value = inputs;
    isResultShown = false;
    isHistoryShown = false;
    adjustFontSize();
    return;
  }

  const lastChar = display.value.slice(-1);

  // Prevent double decimals in one number
  if (inputs === ".") {
    // added visual operators to the split logic
    const parts = display.value.split(/[\+\-\*\/\%\×\÷\^]/);
    const lastNumber = parts[parts.length - 1];
    if (lastNumber.includes(".")) return;
  }

  // Prevent double operators (e.g., ++, */)
  if (operators.includes(inputs) && operators.includes(lastChar)) {
    // here i replace the old operator with the new one if two where typed at the same time
    display.value = display.value.slice(0, -1) + inputs;
    return;
  }

  display.value += inputs;
  isHistoryShown = false;
  adjustFontSize();
};

//this clears all the display value if it is a result or history and just removes the last number if it's not
const backspace = () => {
  if (isResultShown || isHistoryShown || display.value === "Error") {
    clearDisplay();
  } else {
    display.value = display.value.slice(0, -1);
    adjustFontSize();
  }
};

//this clears all the display value
const clearDisplay = () => {
  display.value = "";
  isResultShown = false;
  isHistoryShown = false;
  adjustFontSize();
};

//this function calculate what ever is in the display area
const calculate = () => {
  if (display.value !== "" && display.value !== "Error") {
    try {
      displayHistory();
      // i use String here so that the result can be sliced later if needed
      let displayValue = display.value.replace(/×/g, '*').replace(/÷/g, '/').replace(/\^/g, '**');
      display.value = String(eval(displayValue));
      isResultShown = true;
      isHistoryShown = false;
      adjustFontSize();
    } catch (error) {
      display.value = "Error";
      isResultShown = true;
    }
  }
};

//this saves the current display to the history array
const displayHistory = () => {
  if (display.value !== "" && display.value !== "Error") {
    history.push(display.value);
  }
};

//this shows the last history on the display area
const showHistoryOnScreen = () => {
  if (history.length > 0) {
    display.value = history[history.length - 1];
    isHistoryShown = true;
    isResultShown = false;
    adjustFontSize();
  }
};

//this make the font size smaller so the numbers dont overflow
const adjustFontSize = () => {
  const length = display.value.length;
  if (length > 14) {
    display.style.fontSize = "1.2rem";
  } else if (length > 10) {
    display.style.fontSize = "1.8rem";
  } else if (length > 7) {
    display.style.fontSize = "2.2rem";
  } else {
    display.style.fontSize = "2.5rem";
  }
};

// Listen for keyboard input
window.addEventListener("keydown", (e) => {
  const key = e.key;

  // Numbers and most Operators
  if (!isNaN(key) || ["+", "-", "%", ".", "^"].includes(key)) {
    appendToDisplay(key);
  }
  
  // Mapping multiplication
  if (key === "*") {
    appendToDisplay("×");
  }

  // Mapping division
  if (key === "/") {
    e.preventDefault(); 
    appendToDisplay("÷");
  }
  
  // Enter key for calculate
  if (key === "Enter") {
    e.preventDefault(); 
    calculate();
  }

  // Backspace key
  if (key === "Backspace") {
    backspace();
  }

  // Escape key to clear
  if (key === "Escape") {
    clearDisplay();
  }
});