let display = document.getElementById('display');  // The display screen
let buttons = document.querySelectorAll('button'); // All the buttons

let currentInput = ''; // Stores the current input
let operator = ''; // Stores the operator
let previousInput = ''; // Stores the previous input (for calculations)

buttons.forEach(button => {
    button.addEventListener('click', function() {
        let value = button.innerText; // Get the button value

        // If the value is a number or dot, append it to the current input
        if (value >= '0' && value <= '9' || value === '.') {
            currentInput += value;
            display.value = currentInput;
        }

        // If the "C" button is clicked, clear the input
        else if (value === 'C') {
            currentInput = '';
            operator = '';
            previousInput = '';
            display.value = '';
        }

        // Handle addition, subtraction, multiplication, and division
        else if (value === '+' || value === '-' || value === '*' || value === '/') {
            if (currentInput !== '') {
                previousInput = currentInput; // Store the current input
                currentInput = ''; // Clear the current input for the next number
                operator = value; // Set the operator
                display.value = ''; // Clear the display
            }
        }

        // Handle the equals (=) button to calculate the result
        else if (value === '=') {
            if (operator && previousInput && currentInput) {
                let result;
                if (operator === '+') {
                    result = parseFloat(previousInput) + parseFloat(currentInput);
                } else if (operator === '-') {
                    result = parseFloat(previousInput) - parseFloat(currentInput);
                } else if (operator === '*') {
                    result = parseFloat(previousInput) * parseFloat(currentInput);
                } else if (operator === '/') {
                    if (currentInput === '0') {
                        result = 'Error'; // Handle division by zero
                    } else {
                        result = parseFloat(previousInput) / parseFloat(currentInput);
                    }
                }
                display.value = result; // Show the result in the display
                previousInput = result; // Store the result for future calculations
                currentInput = '';
                operator = '';
            }
        }
    });
});