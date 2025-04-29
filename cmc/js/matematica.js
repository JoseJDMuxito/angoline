/**
 * Matematica.js - Math game functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Check if settings should be opened automatically
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('settings') === 'open') {
        setTimeout(() => {
            toggleModal('settings-modal', true);
        }, 500);
    }
    // Game state
    const gameState = {
        correctCount: 0,
        incorrectCount: 0,
        currentExpression: '',
        currentAnswer: null,
        isComparisonMode: false,
        gameStarted: false,
        gameFinished: false,
        timeLimit: 60, // Default time limit in seconds
        timeRemaining: 0,
        timer: null,
        history: [],
        settings: {
            operationType: 'addition',
            timeLimit: 60,
            numberType: 'positive',
            maxValue: 100
        }
    };

    // DOM Elements
    const elements = {
        expressionDisplay: document.getElementById('math-expression'),
        correctCount: document.getElementById('correct-count'),
        incorrectCount: document.getElementById('incorrect-count'),
        timeCounter: document.getElementById('time-counter'),
        answerInput: document.getElementById('answer-input'),
        answerContainer: document.getElementById('answer-container'),
        truefalseContainer: document.getElementById('true-false-container'),
        submitButton: document.getElementById('submit-answer'),
        trueButton: document.getElementById('true-btn'),
        falseButton: document.getElementById('false-btn'),
        historyToggle: document.getElementById('history-toggle'),
        historyContent: document.getElementById('history-content'),
        historyList: document.getElementById('history-list'),
        scorePopup: document.getElementById('score-popup'),
        popupCorrect: document.getElementById('popup-correct'),
        popupIncorrect: document.getElementById('popup-incorrect'),
        popupTime: document.getElementById('popup-time'),
        restartButton: document.getElementById('restart-btn'),
        settingsButton: document.querySelector('.nav-links button[aria-label="Settings"]'),

        // Settings elements
        timeLimitSelect: document.getElementById('time-limit'),
        maxValueInput: document.getElementById('max-value'),
        settingsBtn: document.getElementById('settings-btn'),
        closeSettings: document.getElementById('close-settings'),

        // Operation mode buttons
        modeAddition: document.getElementById('mode-addition'),
        modeSubtraction: document.getElementById('mode-subtraction'),
        modeMultiplication: document.getElementById('mode-multiplication'),
        modeDivision: document.getElementById('mode-division'),
        modeSquare: document.getElementById('mode-square'),
        modeExponent2: document.getElementById('mode-exponent-2'),
        modeExponent3: document.getElementById('mode-exponent-3'),
        modeGreater: document.getElementById('mode-greater'),
        modeLess: document.getElementById('mode-less'),

        // Number type buttons
        typePositive: document.getElementById('type-positive'),
        typeRandom: document.getElementById('type-random'),
        typeNegative: document.getElementById('type-negative')
    };

    // Initialize game
    initGame();

    // Initialize event listeners
    initEventListeners();

    /**
     * Initialize the game
     */
    function initGame() {
        // Load settings
        loadSettings();

        // Apply settings
        applySettings();

        // Generate first expression
        generateExpression();

        // Start game timer
        startTimer();

        // Set game as started
        gameState.gameStarted = true;

        // Update UI
        updateUI();
    }

    /**
     * Initialize event listeners
     */
    function initEventListeners() {
        // Answer submission via button
        if (elements.submitButton) {
            elements.submitButton.addEventListener('click', submitAnswer);
        }

        // Answer submission via Enter key
        if (elements.answerInput) {
            elements.answerInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    submitAnswer();
                }
            });
        }

        // True/False buttons
        if (elements.trueButton) {
            elements.trueButton.addEventListener('click', function() {
                checkTrueFalseAnswer(true);
            });
        }

        if (elements.falseButton) {
            elements.falseButton.addEventListener('click', function() {
                checkTrueFalseAnswer(false);
            });
        }

        // History toggle
        if (elements.historyToggle) {
            elements.historyToggle.addEventListener('click', function() {
                elements.historyContent.classList.toggle('open');

                // Update icon
                const icon = this.querySelector('i');
                if (elements.historyContent.classList.contains('open')) {
                    icon.className = 'fas fa-chevron-up';
                } else {
                    icon.className = 'fas fa-chevron-down';
                }
            });
        }

        // Restart button
        if (elements.restartButton) {
            elements.restartButton.addEventListener('click', restartGame);
        }

        // Settings
        if (elements.settingsBtn) {
            elements.settingsBtn.addEventListener('click', function() {
                toggleModal('settings-modal', true);
            });
        }

        if (elements.closeSettings) {
            elements.closeSettings.addEventListener('click', function() {
                toggleModal('settings-modal', false);
            });
        }

        // Difficulty buttons
        if (elements.difficultyEasy) {
            elements.difficultyEasy.addEventListener('click', function() {
                setDifficulty('easy');
            });
        }

        if (elements.difficultyMedium) {
            elements.difficultyMedium.addEventListener('click', function() {
                setDifficulty('medium');
            });
        }

        if (elements.difficultyHard) {
            elements.difficultyHard.addEventListener('click', function() {
                setDifficulty('hard');
            });
        }

        // Setup settings control events
        setupSettingsControls();
    }

    /**
     * Load game settings from local storage
     */
    function loadSettings() {
        const savedSettings = localStorage.getItem('mathGameSettings');

        if (savedSettings) {
            try {
                gameState.settings = JSON.parse(savedSettings);

                // Ensure backward compatibility
                if (!gameState.settings.maxValue) {
                    gameState.settings.maxValue = 100;
                }
            } catch (e) {
                console.error('Error parsing settings:', e);
                // Use default settings if there's an error
            }
        }

        // Update settings UI
        if (elements.timeLimitSelect) {
            elements.timeLimitSelect.value = gameState.settings.timeLimit;
        }

        if (elements.maxValueInput) {
            elements.maxValueInput.value = gameState.settings.maxValue;
        }

        // Set initial active state for operation mode buttons
        const modeButtonMap = {
            'addition': elements.modeAddition,
            'subtraction': elements.modeSubtraction,
            'multiplication': elements.modeMultiplication,
            'division': elements.modeDivision,
            'square': elements.modeSquare,
            'exponent2': elements.modeExponent2,
            'exponent3': elements.modeExponent3,
            'greater': elements.modeGreater,
            'less': elements.modeLess
        };

        // Clear active from all mode buttons
        Object.values(modeButtonMap).forEach(btn => {
            if (btn) btn.classList.remove('active');
        });

        // Set active on current mode button
        const currentModeButton = modeButtonMap[gameState.settings.operationType];
        if (currentModeButton) {
            currentModeButton.classList.add('active');
        } else if (elements.modeAddition) {
            // Default to addition if mode isn't valid
            elements.modeAddition.classList.add('active');
            gameState.settings.operationType = 'addition';
        }

        // Set initial active state for number type buttons
        const typeButtonMap = {
            'positive': elements.typePositive,
            'both': elements.typeRandom,
            'negative': elements.typeNegative
        };

        // Clear active from all type buttons
        Object.values(typeButtonMap).forEach(btn => {
            if (btn) btn.classList.remove('active');
        });

        // Set active on current type button
        const currentTypeButton = typeButtonMap[gameState.settings.numberType];
        if (currentTypeButton) {
            currentTypeButton.classList.add('active');
        } else if (elements.typePositive) {
            // Default to positive if type isn't valid
            elements.typePositive.classList.add('active');
            gameState.settings.numberType = 'positive';
        }

        // Check if we need to update comparison mode setting
        gameState.isComparisonMode = (
            gameState.settings.operationType === 'greater' ||
            gameState.settings.operationType === 'less'
        );
    }

    /**
     * Apply current settings to the game
     */
    function applySettings() {
        // Update time limit
        gameState.timeLimit = parseInt(gameState.settings.timeLimit);
        gameState.timeRemaining = gameState.timeLimit;

        // Update UI based on operation type
        gameState.isComparisonMode = (
            gameState.settings.operationType === 'greater' ||
            gameState.settings.operationType === 'less'
        );

        if (gameState.isComparisonMode) {
            elements.answerContainer.classList.add('hidden');
            elements.truefalseContainer.classList.remove('hidden');
        } else {
            elements.answerContainer.classList.remove('hidden');
            elements.truefalseContainer.classList.add('hidden');
        }
    }

    /**
     * Setup events for settings controls
     */
    function setupSettingsControls() {
        // Time limit
        if (elements.timeLimitSelect) {
            elements.timeLimitSelect.addEventListener('change', function() {
                gameState.settings.timeLimit = parseInt(this.value);
                saveSettings();
                applySettings();
            });
        }

        // Max value
        if (elements.maxValueInput) {
            elements.maxValueInput.addEventListener('input', function() {
                let value = parseInt(this.value);

                // Ensure value is within bounds
                if (value < 10) value = 10;
                if (value > 1000) value = 1000;

                this.value = value;
                gameState.settings.maxValue = value;
                saveSettings();
            });
        }

        // Operation mode buttons
        setupModeButtons();

        // Number type buttons
        setupNumberTypeButtons();
    }

    /**
     * Setup operation mode buttons
     */
    function setupModeButtons() {
        const modeButtons = [
            { element: elements.modeAddition, value: 'addition' },
            { element: elements.modeSubtraction, value: 'subtraction' },
            { element: elements.modeMultiplication, value: 'multiplication' },
            { element: elements.modeDivision, value: 'division' },
            { element: elements.modeSquare, value: 'square' },
            { element: elements.modeExponent2, value: 'exponent2' },
            { element: elements.modeExponent3, value: 'exponent3' },
            { element: elements.modeGreater, value: 'greater' },
            { element: elements.modeLess, value: 'less' }
        ];

        modeButtons.forEach(button => {
            if (button.element) {
                button.element.addEventListener('click', function() {
                    setOperationMode(button.value);
                });

                // Set initial active state
                if (gameState.settings.operationType === button.value) {
                    button.element.classList.add('active');
                }
            }
        });
    }

    /**
     * Setup number type buttons
     */
    function setupNumberTypeButtons() {
        const typeButtons = [
            { element: elements.typePositive, value: 'positive' },
            { element: elements.typeRandom, value: 'both' },
            { element: elements.typeNegative, value: 'negative' }
        ];

        typeButtons.forEach(button => {
            if (button.element) {
                button.element.addEventListener('click', function() {
                    setNumberType(button.value);
                });

                // Set initial active state
                if (gameState.settings.numberType === button.value) {
                    button.element.classList.add('active');
                }
            }
        });
    }

    /**
     * Set operation mode
     * @param {string} mode - Operation mode ('addition', 'subtraction', etc.)
     */
    function setOperationMode(mode) {
        // Update active button
        const modeButtons = [
            elements.modeAddition, elements.modeSubtraction, elements.modeMultiplication,
            elements.modeDivision, elements.modeSquare, elements.modeExponent2,
            elements.modeExponent3, elements.modeGreater, elements.modeLess
        ];

        modeButtons.forEach(btn => {
            if (btn) btn.classList.remove('active');
        });

        // Set the active button
        switch (mode) {
            case 'addition':
                if (elements.modeAddition) elements.modeAddition.classList.add('active');
                break;
            case 'subtraction':
                if (elements.modeSubtraction) elements.modeSubtraction.classList.add('active');
                break;
            case 'multiplication':
                if (elements.modeMultiplication) elements.modeMultiplication.classList.add('active');
                break;
            case 'division':
                if (elements.modeDivision) elements.modeDivision.classList.add('active');
                break;
            case 'square':
                if (elements.modeSquare) elements.modeSquare.classList.add('active');
                break;
            case 'exponent2':
                if (elements.modeExponent2) elements.modeExponent2.classList.add('active');
                break;
            case 'exponent3':
                if (elements.modeExponent3) elements.modeExponent3.classList.add('active');
                break;
            case 'greater':
                if (elements.modeGreater) elements.modeGreater.classList.add('active');
                break;
            case 'less':
                if (elements.modeLess) elements.modeLess.classList.add('active');
                break;
        }

        // Update game state
        gameState.settings.operationType = mode;
        gameState.isComparisonMode = (mode === 'greater' || mode === 'less');

        // Update UI based on comparison mode
        if (gameState.isComparisonMode) {
            elements.answerContainer.classList.add('hidden');
            elements.truefalseContainer.classList.remove('hidden');
        } else {
            elements.answerContainer.classList.remove('hidden');
            elements.truefalseContainer.classList.add('hidden');
        }

        saveSettings();
        generateExpression();
    }

    /**
     * Set number type
     * @param {string} type - Number type ('positive', 'negative', or 'both')
     */
    function setNumberType(type) {
        // Update active button
        const typeButtons = [elements.typePositive, elements.typeRandom, elements.typeNegative];

        typeButtons.forEach(btn => {
            if (btn) btn.classList.remove('active');
        });

        // Set the active button
        switch (type) {
            case 'positive':
                if (elements.typePositive) elements.typePositive.classList.add('active');
                break;
            case 'both':
                if (elements.typeRandom) elements.typeRandom.classList.add('active');
                break;
            case 'negative':
                if (elements.typeNegative) elements.typeNegative.classList.add('active');
                break;
        }

        // Update game state
        gameState.settings.numberType = type;

        saveSettings();
        generateExpression();
    }

    /**
     * Save settings to local storage
     */
    function saveSettings() {
        localStorage.setItem('mathGameSettings', JSON.stringify(gameState.settings));
    }

    /**
     * Set difficulty level
     * @param {string} difficulty - Difficulty level ('easy', 'medium', or 'hard')
     */
    function setDifficulty(difficulty) {
        // Update active button
        const difficultyButtons = [elements.difficultyEasy, elements.difficultyMedium, elements.difficultyHard];
        difficultyButtons.forEach(btn => {
            if (btn) btn.classList.remove('active');
        });

        switch (difficulty) {
            case 'easy':
                if (elements.difficultyEasy) elements.difficultyEasy.classList.add('active');
                gameState.settings.maxValue = 20;
                gameState.settings.numberType = 'positive';
                break;

            case 'medium':
                if (elements.difficultyMedium) elements.difficultyMedium.classList.add('active');
                gameState.settings.maxValue = 50;
                gameState.settings.numberType = 'both';
                break;

            case 'hard':
                if (elements.difficultyHard) elements.difficultyHard.classList.add('active');
                gameState.settings.maxValue = 100;
                gameState.settings.numberType = 'both';
                break;
        }

        saveSettings();
        applySettings();
        generateExpression();
    }

    /**
     * Generate a random math expression based on current settings
     */
    function generateExpression() {
        const maxValue = gameState.settings.maxValue;
        const operationType = gameState.settings.operationType;
        const numberType = gameState.settings.numberType;

        let num1, num2, expression, answer;

        // Generate numbers based on number type
        const getRandomNum = () => {
            let min, max;

            switch (numberType) {
                case 'positive':
                    min = 1;
                    max = maxValue;
                    break;
                case 'negative':
                    min = -maxValue;
                    max = -1;
                    break;
                case 'both':
                    min = -maxValue;
                    max = maxValue;
                    break;
                default:
                    min = 1;
                    max = maxValue;
            }

            return getRandomNumber(min, max);
        };

        // Generate expression based on operation type
        switch (operationType) {
            case 'addition':
                num1 = getRandomNum();
                num2 = getRandomNum();
                expression = `${num1} + ${num2}`;
                answer = num1 + num2;
                break;

            case 'subtraction':
                num1 = getRandomNum();
                num2 = getRandomNum();
                expression = `${num1} - ${num2}`;
                answer = num1 - num2;
                break;

            case 'multiplication':
                // Keep multiplication manageable
                num1 = getRandomNumber(1, Math.min(20, maxValue));
                num2 = getRandomNumber(1, Math.min(20, maxValue));
                expression = `${num1} × ${num2}`;
                answer = num1 * num2;
                break;

            case 'division':
                // Generate division with integer results
                num2 = getRandomNumber(1, Math.min(10, maxValue));
                answer = getRandomNumber(1, Math.min(10, maxValue));
                num1 = num2 * answer;
                expression = `${num1} ÷ ${num2}`;
                break;

            case 'square':
                // Gerar um número que resultará em uma raiz quadrada mais limpa
                answer = getRandomNumber(1, Math.min(20, maxValue));
                num1 = answer * answer;
                expression = `√${num1}`;
                break;

            case 'exponent2':
                num1 = getRandomNumber(1, 10);
                expression = `${num1}^2`;
                answer = Math.pow(num1, 2);
                break;

            case 'exponent3':
                num1 = getRandomNumber(1, 10);
                expression = `${num1}^3`;
                answer = Math.pow(num1, 3);
                break;

            case 'greater':
                num1 = getRandomNum();
                num2 = getRandomNum();

                // Make sure they're not equal
                while (num1 === num2) {
                    num2 = getRandomNum();
                }

                expression = `${num1} > ${num2}`;
                answer = num1 > num2;
                break;

            case 'less':
                num1 = getRandomNum();
                num2 = getRandomNum();

                // Make sure they're not equal
                while (num1 === num2) {
                    num2 = getRandomNum();
                }

                expression = `${num1} < ${num2}`;
                answer = num1 < num2;
                break;

            default:
                num1 = getRandomNum();
                num2 = getRandomNum();
                expression = `${num1} + ${num2}`;
                answer = num1 + num2;
        }

        gameState.currentExpression = expression;
        gameState.currentAnswer = answer;

        // Update display
        if (elements.expressionDisplay) {
            elements.expressionDisplay.textContent = expression;
        }

        // Clear input
        if (elements.answerInput) {
            elements.answerInput.value = '';
            elements.answerInput.focus();
        }
    }

    /**
     * Submit and check answer
     */
    function submitAnswer() {
        if (gameState.gameFinished) return;

        const userAnswer = parseFloat(elements.answerInput.value);

        if (isNaN(userAnswer)) {
            showNotification('Por favor, digite um número válido.', 'error');
            return;
        }

        // Check if answer is correct
        const isCorrect = areEqual(userAnswer, gameState.currentAnswer);

        updateScore(isCorrect);
        addToHistory(gameState.currentExpression, userAnswer, isCorrect);

        // Generate new expression
        generateExpression();
    }

    /**
     * Check true/false answer
     * @param {boolean} userAnswer - User's true/false answer
     */
    function checkTrueFalseAnswer(userAnswer) {
        if (gameState.gameFinished) return;

        // Check if answer is correct
        const isCorrect = userAnswer === gameState.currentAnswer;

        updateScore(isCorrect);
        addToHistory(gameState.currentExpression, userAnswer ? 'Verdadeiro' : 'Falso', isCorrect);

        // Generate new expression
        generateExpression();
    }

    /**
     * Update score based on answer correctness
     * @param {boolean} isCorrect - Whether answer was correct
     */
    function updateScore(isCorrect) {
        if (isCorrect) {
            gameState.correctCount++;
            playSound('correct');
        } else {
            gameState.incorrectCount++;
            playSound('incorrect');
        }

        // Update UI
        updateUI();
    }

    /**
     * Add answer to history
     * @param {string} expression - Expression that was answered
     * @param {*} answer - User's answer
     * @param {boolean} isCorrect - Whether answer was correct
     */
    function addToHistory(expression, answer, isCorrect) {
        const historyItem = {
            expression,
            answer,
            isCorrect,
            timestamp: new Date().toISOString()
        };

        gameState.history.unshift(historyItem);

        // Keep history limited
        if (gameState.history.length > 10) {
            gameState.history.pop();
        }

        // Update history display
        updateHistoryDisplay();
    }

    /**
     * Update history display
     */
    function updateHistoryDisplay() {
        if (!elements.historyList) return;

        // Clear existing history
        elements.historyList.innerHTML = '';

        // Add history items
        gameState.history.forEach(item => {
            const li = document.createElement('li');

            const expressionSpan = document.createElement('span');
            expressionSpan.className = 'history-expression';
            expressionSpan.textContent = `${item.expression} = `;

            const resultSpan = document.createElement('span');
            resultSpan.className = `history-result ${item.isCorrect ? 'correct' : 'incorrect'}`;
            resultSpan.textContent = item.answer;

            li.appendChild(expressionSpan);
            li.appendChild(resultSpan);

            elements.historyList.appendChild(li);
        });
    }

    /**
     * Start game timer
     */
    function startTimer() {
        // Clear any existing timer
        if (gameState.timer) {
            clearInterval(gameState.timer);
        }

        // Set initial time
        gameState.timeRemaining = gameState.timeLimit;

        // Update timer display
        updateTimerDisplay();

        // If time limit is 0 (unlimited), don't start timer
        if (gameState.timeLimit === 0) return;

        // Start interval
        gameState.timer = setInterval(() => {
            gameState.timeRemaining--;

            // Update timer display
            updateTimerDisplay();

            // Check if time is up
            if (gameState.timeRemaining <= 0) {
                endGame();
            }
        }, 1000);
    }

    /**
     * Update timer display
     */
    function updateTimerDisplay() {
        if (!elements.timeCounter) return;

        if (gameState.timeLimit === 0) {
            elements.timeCounter.textContent = '∞';
        } else {
            elements.timeCounter.textContent = formatTime(gameState.timeRemaining);
        }
    }

    /**
     * Update UI with current game state
     */
    function updateUI() {
        if (elements.correctCount) {
            elements.correctCount.textContent = gameState.correctCount;
        }

        if (elements.incorrectCount) {
            elements.incorrectCount.textContent = gameState.incorrectCount;
        }
    }

    /**
     * End the game
     */
    function endGame() {
        // Stop timer
        if (gameState.timer) {
            clearInterval(gameState.timer);
            gameState.timer = null;
        }

        // Set game as finished
        gameState.gameFinished = true;

        // Play sound
        playSound('time');

        // Save game stats
        saveGameStats('math', {
            correct: gameState.correctCount,
            incorrect: gameState.incorrectCount,
            time: gameState.timeLimit - gameState.timeRemaining,
            operationType: gameState.settings.operationType,
            maxValue: gameState.settings.maxValue
        });

        // Show score popup
        if (elements.scorePopup) {
            elements.popupCorrect.textContent = gameState.correctCount;
            elements.popupIncorrect.textContent = gameState.incorrectCount;
            elements.popupTime.textContent = formatTime(gameState.timeLimit - gameState.timeRemaining);

            elements.scorePopup.classList.add('show');
        }
    }

    /**
     * Restart the game
     */
    function restartGame() {
        // Reset game state
        gameState.correctCount = 0;
        gameState.incorrectCount = 0;
        gameState.gameFinished = false;
        gameState.history = [];

        // Hide score popup
        if (elements.scorePopup) {
            elements.scorePopup.classList.remove('show');
        }

        // Clear history display
        updateHistoryDisplay();

        // Generate new expression
        generateExpression();

        // Restart timer
        startTimer();

        // Update UI
        updateUI();
    }
});
