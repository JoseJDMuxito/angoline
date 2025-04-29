/**
 * Morse.js - Morse code game functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Check if settings should be opened automatically
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('settings') === 'open') {
        setTimeout(() => {
            toggleModal('settings-modal', true);
        }, 500);
    }
    // Morse code lookup tables
    const morseCode = {
        'a': '.-', 'b': '-...', 'c': '-.-.', 'd': '-..', 'e': '.', 'f': '..-.', 'g': '--.', 'h': '....', 'i': '..', 'j': '.---',
        'k': '-.-', 'l': '.-..', 'm': '--', 'n': '-.', 'o': '---', 'p': '.--.', 'q': '--.-', 'r': '.-.', 's': '...', 't': '-',
        'u': '..-', 'v': '...-', 'w': '.--', 'x': '-..-', 'y': '-.--', 'z': '--..',
        '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..',
        '9': '----.'
    };

    // Reverse lookup (morse to character)
    const reverseMorseCode = {};
    for (const [char, code] of Object.entries(morseCode)) {
        reverseMorseCode[code] = char;
    }

    // Game state
    const gameState = {
        correctCount: 0,
        incorrectCount: 0,
        currentMorse: '',
        currentAnswer: '',
        gameStarted: false,
        gameFinished: false,
        timeLimit: 60, // Default time limit in seconds
        timeRemaining: 0,
        timer: null,
        history: [],
        settings: {
            mode: 'letters', // 'letters', 'numbers', 'symbols', 'mixed'
            difficulty: 'easy', // 'easy', 'medium', 'hard'
            timeLimit: 60,
            soundSpeed: 'slow' // 'slow', 'medium', 'fast'
        }
    };

    // DOM Elements
    const elements = {
        morseDisplay: document.getElementById('morse-code'),
        correctCount: document.getElementById('correct-count'),
        incorrectCount: document.getElementById('incorrect-count'),
        timeCounter: document.getElementById('time-counter'),
        answerInput: document.getElementById('answer-input'),
        submitButton: document.getElementById('submit-answer'),
        playSoundButton: document.getElementById('play-sound'),
        showHintButton: document.getElementById('show-hint'),
        historyToggle: document.getElementById('history-toggle'),
        historyContent: document.getElementById('history-content'),
        historyList: document.getElementById('history-list'),
        scorePopup: document.getElementById('score-popup'),
        popupCorrect: document.getElementById('popup-correct'),
        popupIncorrect: document.getElementById('popup-incorrect'),
        popupTime: document.getElementById('popup-time'),
        restartButton: document.getElementById('restart-btn'),
        morseReference: document.getElementById('morse-reference'),
        closeReference: document.getElementById('close-reference'),

        // Settings elements
        timeLimitSelect: document.getElementById('time-limit'),

        // Mode buttons
        modeLetters: document.getElementById('mode-letters'),
        modeNumbers: document.getElementById('mode-numbers'),
        modeSymbols: document.getElementById('mode-symbols'),
        modeMixed: document.getElementById('mode-mixed'),

        // Speed buttons
        speedSlow: document.getElementById('speed-slow'),
        speedMedium: document.getElementById('speed-medium'),
        speedFast: document.getElementById('speed-fast'),

        // Difficulty buttons
        difficultyEasy: document.getElementById('difficulty-easy'),
        difficultyMedium: document.getElementById('difficulty-medium'),
        difficultyHard: document.getElementById('difficulty-hard'),

        // Modal controls
        settingsBtn: document.getElementById('settings-btn'),
        closeSettings: document.getElementById('close-settings')
    };

    // Tone.js synth for morse code sounds
    let synth = null;

    // Initialize game
    initGame();

    // Initialize event listeners
    initEventListeners();

    /**
     * Initialize the game
     */
    function initGame() {
        // Initialize Tone.js synth if available
        initSynth();

        // Load settings
        loadSettings();

        // Apply settings
        applySettings();

        // Generate first morse code
        generateMorseCode();

        // Start game timer
        startTimer();

        // Set game as started
        gameState.gameStarted = true;

        // Update UI
        updateUI();
    }

    /**
     * Initialize audio synthesizer for morse code
     */
    function initSynth() {
        if (typeof Tone !== 'undefined') {
            synth = new Tone.Synth({
                oscillator: {
                    type: 'sine'
                },
                envelope: {
                    attack: 0.005,
                    decay: 0.1,
                    sustain: 0.9,
                    release: 0.1
                }
            }).toDestination();

            // Set volume
            synth.volume.value = -10;
        }
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

        // Play sound button
        if (elements.playSoundButton) {
            elements.playSoundButton.addEventListener('click', playMorseSound);
        }

        // Show hint button
        if (elements.showHintButton) {
            elements.showHintButton.addEventListener('click', function() {
                toggleModal('morse-reference', true);
            });
        }

        // Close reference button
        if (elements.closeReference) {
            elements.closeReference.addEventListener('click', function() {
                toggleModal('morse-reference', false);
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

        // Settings button
        if (elements.settingsBtn) {
            elements.settingsBtn.addEventListener('click', function() {
                toggleModal('settings-modal', true);
            });
        }

        // Close settings button
        if (elements.closeSettings) {
            elements.closeSettings.addEventListener('click', function() {
                toggleModal('settings-modal', false);
            });
        }

        // Settings mode buttons
        if (elements.modeLetters) {
            elements.modeLetters.addEventListener('click', function() {
                setMode('letters');
            });
        }

        if (elements.modeNumbers) {
            elements.modeNumbers.addEventListener('click', function() {
                setMode('numbers');
            });
        }

        if (elements.modeSymbols) {
            elements.modeSymbols.addEventListener('click', function() {
                setMode('symbols');
            });
        }

        if (elements.modeMixed) {
            elements.modeMixed.addEventListener('click', function() {
                setMode('mixed');
            });
        }

        // Sound speed buttons
        if (elements.speedSlow) {
            elements.speedSlow.addEventListener('click', function() {
                setSpeed('slow');
            });
        }

        if (elements.speedMedium) {
            elements.speedMedium.addEventListener('click', function() {
                setSpeed('medium');
            });
        }

        if (elements.speedFast) {
            elements.speedFast.addEventListener('click', function() {
                setSpeed('fast');
            });
        }

        // Settings difficulty buttons
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

        // Time limit
        if (elements.timeLimitSelect) {
            elements.timeLimitSelect.addEventListener('change', function() {
                gameState.settings.timeLimit = parseInt(this.value);
                saveSettings();
            });
        }
    }

    /**
     * Set game mode
     * @param {string} mode - Game mode ('letters', 'numbers', 'symbols', or 'mixed')
     */
    function setMode(mode) {
        gameState.settings.mode = mode;
        saveSettings();

        // Update UI
        if (elements.modeLetters) elements.modeLetters.classList.toggle('active', mode === 'letters');
        if (elements.modeNumbers) elements.modeNumbers.classList.toggle('active', mode === 'numbers');
        if (elements.modeSymbols) elements.modeSymbols.classList.toggle('active', mode === 'symbols');
        if (elements.modeMixed) elements.modeMixed.classList.toggle('active', mode === 'mixed');

        // Generate new morse code with the updated mode
        generateMorseCode();
    }

    /**
     * Set sound speed
     * @param {string} speed - Sound speed ('slow', 'medium', or 'fast')
     */
    function setSpeed(speed) {
        gameState.settings.soundSpeed = speed;
        saveSettings();

        // Update UI
        if (elements.speedSlow) elements.speedSlow.classList.toggle('active', speed === 'slow');
        if (elements.speedMedium) elements.speedMedium.classList.toggle('active', speed === 'medium');
        if (elements.speedFast) elements.speedFast.classList.toggle('active', speed === 'fast');
    }

    /**
     * Set difficulty level
     * @param {string} difficulty - Difficulty level ('easy', 'medium', or 'hard')
     */
    function setDifficulty(difficulty) {
        gameState.settings.difficulty = difficulty;
        saveSettings();

        // Update UI
        if (elements.difficultyEasy) elements.difficultyEasy.classList.toggle('active', difficulty === 'easy');
        if (elements.difficultyMedium) elements.difficultyMedium.classList.toggle('active', difficulty === 'medium');
        if (elements.difficultyHard) elements.difficultyHard.classList.toggle('active', difficulty === 'hard');
    }

    /**
     * Load game settings from local storage
     */
    function loadSettings() {
        const savedSettings = localStorage.getItem('morseGameSettings');

        if (savedSettings) {
            try {
                gameState.settings = JSON.parse(savedSettings);

                // Ensure backward compatibility
                if (!gameState.settings.soundSpeed) {
                    gameState.settings.soundSpeed = 'slow';
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

        // Mode buttons
        if (elements.modeLetters) {
            elements.modeLetters.classList.toggle('active', gameState.settings.mode === 'letters');
        }

        if (elements.modeNumbers) {
            elements.modeNumbers.classList.toggle('active', gameState.settings.mode === 'numbers');
        }

        if (elements.modeSymbols) {
            elements.modeSymbols.classList.toggle('active', gameState.settings.mode === 'symbols');
        }

        if (elements.modeMixed) {
            elements.modeMixed.classList.toggle('active', gameState.settings.mode === 'mixed');
        }

        // Speed buttons
        if (elements.speedSlow) {
            elements.speedSlow.classList.toggle('active', gameState.settings.soundSpeed === 'slow');
        }

        if (elements.speedMedium) {
            elements.speedMedium.classList.toggle('active', gameState.settings.soundSpeed === 'medium');
        }

        if (elements.speedFast) {
            elements.speedFast.classList.toggle('active', gameState.settings.soundSpeed === 'fast');
        }

        // Difficulty buttons
        if (elements.difficultyEasy) {
            elements.difficultyEasy.classList.toggle('active', gameState.settings.difficulty === 'easy');
        }

        if (elements.difficultyMedium) {
            elements.difficultyMedium.classList.toggle('active', gameState.settings.difficulty === 'medium');
        }

        if (elements.difficultyHard) {
            elements.difficultyHard.classList.toggle('active', gameState.settings.difficulty === 'hard');
        }
    }

    /**
     * Apply current settings to the game
     */
    function applySettings() {
        // Update time limit
        gameState.timeLimit = parseInt(gameState.settings.timeLimit);
        gameState.timeRemaining = gameState.timeLimit;
    }

    /**
     * Save settings to local storage
     */
    function saveSettings() {
        localStorage.setItem('morseGameSettings', JSON.stringify(gameState.settings));
    }

    /**
     * Generate random morse code based on current settings
     */
    function generateMorseCode() {
        const mode = gameState.settings.mode;
        const difficulty = gameState.settings.difficulty;

        let characters = [];
        let length;

        // Determine the character set based on mode
        switch (mode) {
            case 'letters':
                characters = 'abcdefghijklmnopqrstuvwxyz'.split('');
                break;
            case 'numbers':
                characters = '0123456789'.split('');
                break;
            case 'symbols':
                characters = ',.?!@#$%&*()-_=+:;/\\\'\"'.split('');
                break;
            case 'mixed':
                characters = 'abcdefghijklmnopqrstuvwxyz0123456789,.?!@#$%&*()-_=+'.split('');
                break;
            default:
                characters = 'abcdefghijklmnopqrstuvwxyz'.split('');
        }

        // Determine length based on difficulty
        switch (difficulty) {
            case 'easy':
                length = 1;
                break;
            case 'medium':
                length = 3;
                break;
            case 'hard':
                length = 5;
                break;
            default:
                length = 1;
        }

        // Generate random characters
        let result = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters[randomIndex];
        }

        // Convert to morse code
        let morseString = '';
        for (let i = 0; i < result.length; i++) {
            // Check if character exists in morse code table
            if (morseCode[result[i]]) {
                morseString += morseCode[result[i]];
                if (i < result.length - 1) morseString += ' ';
            } else {
                // If character is not in morse table, replace with a default
                result = result.substring(0, i) + 'a' + result.substring(i + 1);
                morseString += morseCode['a'];
                if (i < result.length - 1) morseString += ' ';
            }
        }

        // Format for display (replace dots and dashes with symbols)
        const displayMorse = morseString.replace(/\./g, '•').replace(/\-/g, '—');

        // Update game state
        gameState.currentMorse = morseString;
        gameState.currentAnswer = result;

        // Update display
        if (elements.morseDisplay) {
            elements.morseDisplay.textContent = displayMorse;
        }

        // Clear input
        if (elements.answerInput) {
            elements.answerInput.value = '';
            elements.answerInput.focus();
        }
    }

    /**
     * Play morse code sound
     */
    function playMorseSound() {
        if (!synth || !Tone) return;

        // Ensure Tone.js context is started
        if (Tone.context.state !== 'running') {
            Tone.context.resume();
        }

        const morse = gameState.currentMorse;
        let baseDuration;

        // Set duration based on speed setting
        switch (gameState.settings.soundSpeed) {
            case 'slow':
                baseDuration = 0.15; // Slower
                break;
            case 'medium':
                baseDuration = 0.1; // Default
                break;
            case 'fast':
                baseDuration = 0.05; // Faster
                break;
            default:
                baseDuration = 0.1; // Default fallback
        }

        const dotDuration = baseDuration;
        const dashDuration = dotDuration * 3;
        const symbolGap = dotDuration;
        const letterGap = dotDuration * 3;

        let time = Tone.now();

        // Play each symbol
        for (let i = 0; i < morse.length; i++) {
            const symbol = morse[i];

            if (symbol === '.') {
                synth.triggerAttackRelease('440', dotDuration, time);
                time += dotDuration + symbolGap;
            } else if (symbol === '-') {
                synth.triggerAttackRelease('440', dashDuration, time);
                time += dashDuration + symbolGap;
            } else if (symbol === ' ') {
                time += letterGap;
            }
        }
    }

    /**
     * Submit and check answer
     */
    function submitAnswer() {
        if (gameState.gameFinished) return;

        const userAnswer = elements.answerInput.value.toLowerCase().trim();

        if (!userAnswer) {
            showNotification('Por favor, digite uma resposta.', 'error');
            return;
        }

        // Check if answer is correct
        const isCorrect = userAnswer === gameState.currentAnswer;

        updateScore(isCorrect);
        addToHistory(gameState.currentMorse, userAnswer, isCorrect);

        // Generate new morse code
        generateMorseCode();
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
     * @param {string} morse - Morse code that was answered
     * @param {string} answer - User's answer
     * @param {boolean} isCorrect - Whether answer was correct
     */
    function addToHistory(morse, answer, isCorrect) {
        // Format morse code for display
        const displayMorse = morse.replace(/\./g, '•').replace(/\-/g, '—');

        const historyItem = {
            morse: displayMorse,
            answer,
            correctAnswer: gameState.currentAnswer,
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

            const morseSpan = document.createElement('span');
            morseSpan.className = 'history-morse';
            morseSpan.textContent = `${item.morse} = `;

            const resultSpan = document.createElement('span');
            resultSpan.className = `history-result ${item.isCorrect ? 'correct' : 'incorrect'}`;
            resultSpan.textContent = item.answer;

            if (!item.isCorrect) {
                const correctSpan = document.createElement('span');
                correctSpan.className = 'history-correct';
                correctSpan.textContent = ` (${item.correctAnswer})`;
                resultSpan.appendChild(correctSpan);
            }

            li.appendChild(morseSpan);
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
        saveGameStats('morse', {
            correct: gameState.correctCount,
            incorrect: gameState.incorrectCount,
            time: gameState.timeLimit - gameState.timeRemaining,
            mode: gameState.settings.mode,
            difficulty: gameState.settings.difficulty
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

        // Generate new morse code
        generateMorseCode();

        // Restart timer
        startTimer();

        // Update UI
        updateUI();
    }
});
