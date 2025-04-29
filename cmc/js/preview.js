/**
 * preview.js - Demo animations for preview page
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize math demo
    initMathDemo();

    // Initialize morse demo
    initMorseDemo();
});

/**
 * Initialize math demo with automatic animations
 */
function initMathDemo() {
    // Elements
    const expressionElement = document.querySelector('#math-preview .preview-expression');
    const inputElement = document.querySelector('#math-preview .preview-input');
    const correctElement = document.querySelector('#math-preview .preview-stat.correct span');
    const incorrectElement = document.querySelector('#math-preview .preview-stat.incorrect span');
    const timeElement = document.querySelector('#math-preview .preview-stat.time span');

    // Math expressions to cycle through
    const mathExpressions = [
        { expression: '47 + 7', answer: '54', correct: true },
        { expression: '12 × 3', answer: '36', correct: false },
        { expression: '100 - 25', answer: '75', correct: true },
        { expression: '64 ÷ 8', answer: '8', correct: true },
        { expression: '9²', answer: '81', correct: true }
    ];

    let correctCount = 0;
    let incorrectCount = 0;
    let currentTime = 0;
    let currentIndex = 0;
    let timerInterval;

    // Start timer
    timerInterval = setInterval(() => {
        currentTime++;
        timeElement.textContent = formatTime(currentTime);
    }, 1000);

    // Function to cycle through expressions
    function showNextExpression() {
        const item = mathExpressions[currentIndex];

        // Update expression
        expressionElement.textContent = item.expression;

        // Simulate typing the answer
        setTimeout(() => {
            typeAnswer(inputElement, item.answer);
        }, 1500);

        // Update stats after "submission"
        setTimeout(() => {
            if (item.correct) {
                correctCount++;
                correctElement.textContent = correctCount;
                correctElement.parentElement.classList.add('animate');
                setTimeout(() => correctElement.parentElement.classList.remove('animate'), 300);
            } else {
                incorrectCount++;
                incorrectElement.textContent = incorrectCount;
                incorrectElement.parentElement.classList.add('animate');
                setTimeout(() => incorrectElement.parentElement.classList.remove('animate'), 300);
            }

            // Clear input after a delay
            setTimeout(() => {
                inputElement.value = '';
                inputElement.setAttribute('placeholder', 'Resultado...');

                // Move to next expression
                currentIndex = (currentIndex + 1) % mathExpressions.length;

                // Show next after a delay
                setTimeout(showNextExpression, 1000);
            }, 1000);
        }, 3000);
    }

    // Start the demo cycle
    showNextExpression();
}

/**
 * Initialize morse demo with automatic animations
 */
function initMorseDemo() {
    // Elements
    const morseElement = document.querySelector('#morse-preview .preview-morse');
    const inputElement = document.querySelector('#morse-preview .preview-input');
    const correctElement = document.querySelector('#morse-preview .preview-stat.correct span');
    const incorrectElement = document.querySelector('#morse-preview .preview-stat.incorrect span');
    const timeElement = document.querySelector('#morse-preview .preview-stat.time span');

    // Morse codes to cycle through
    const morseCodes = [
        { morse: '• — • —', answer: 'rr', correct: true },
        { morse: '• • •   — — —   • • •', answer: 'sos', correct: true },
        { morse: '— • • —', answer: 'y', correct: false },
        { morse: '• — — •', answer: 'p', correct: true },
        { morse: '• • • •   • •', answer: 'hi', correct: true }
    ];

    let correctCount = 0;
    let incorrectCount = 0;
    let currentTime = 0;
    let currentIndex = 0;
    let timerInterval;

    // Start timer
    timerInterval = setInterval(() => {
        currentTime++;
        timeElement.textContent = formatTime(currentTime);
    }, 1000);

    // Function to cycle through morse codes
    function showNextMorse() {
        const item = morseCodes[currentIndex];

        // Update morse code
        morseElement.textContent = item.morse;

        // Simulate typing the answer
        setTimeout(() => {
            typeAnswer(inputElement, item.answer);
        }, 1500);

        // Update stats after "submission"
        setTimeout(() => {
            if (item.correct) {
                correctCount++;
                correctElement.textContent = correctCount;
                correctElement.parentElement.classList.add('animate');
                setTimeout(() => correctElement.parentElement.classList.remove('animate'), 300);
            } else {
                incorrectCount++;
                incorrectElement.textContent = incorrectCount;
                incorrectElement.parentElement.classList.add('animate');
                setTimeout(() => incorrectElement.parentElement.classList.remove('animate'), 300);
            }

            // Clear input after a delay
            setTimeout(() => {
                inputElement.value = '';
                inputElement.setAttribute('placeholder', 'Resultado...');

                // Move to next morse
                currentIndex = (currentIndex + 1) % morseCodes.length;

                // Show next after a delay
                setTimeout(showNextMorse, 1000);
            }, 1000);
        }, 3000);
    }

    // Start the demo cycle
    showNextMorse();
}

/**
 * Simulates typing an answer in an input field
 * @param {HTMLElement} inputElement - The input element
 * @param {string} answer - The text to type
 */
function typeAnswer(inputElement, answer) {
    let i = 0;
    inputElement.value = '';

    function typeNextChar() {
        if (i < answer.length) {
            inputElement.value += answer.charAt(i);
            i++;
            setTimeout(typeNextChar, 200);
        }
    }

    typeNextChar();
}

/**
 * Format time in seconds to a readable string
 * @param {number} seconds - Time in seconds
 * @returns {string} Formatted time string
 */
function formatTime(seconds) {
    if (seconds < 60) {
        return `${seconds}s`;
    } else {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}m ${remainingSeconds}s`;
    }
}