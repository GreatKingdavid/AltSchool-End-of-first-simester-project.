const display = document.getElementById("display");

const appendToDisplay = (inputs) => {
  display.value += inputs;
};

const clearDisplay = () => {
  display.value = "";
};

const calculate = () => {
  try {
    display.value = eval(display.value);
  } catch (error) {
    display.value = "Error";
  }
};
