const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
const equals = document.getElementById("equals");
const backspace = document.getElementById("backspace");

let expression = "";

// Loop through all buttons
buttons.forEach(button => {
  const value = button.getAttribute("data-value");

  // Ignore equal and backspace — they're handled separately
  if (button.id !== "equals" && button.id !== "backspace") {
    button.addEventListener("click", () => {
      if (value === "AC") {
        expression = "";
        display.textContent = "0";
      } else {
        expression += value;
        display.textContent = expression;
      }
    });
  }
});

// Equals (=) button
equals.addEventListener("click", () => {
  try {
    const result = eval(expression);
    display.textContent = result;
    expression = result.toString();
  } catch (err) {
    display.textContent = "Error";
    expression = "";
  }
});

// Backspace (⌫) button
b
