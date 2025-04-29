/**
 * Utils.js - Utility functions used across the application
 */

/**
 * Generate a random number within a range
 * @param {number} min - Minimum value (inclusive)
 * @param {number} max - Maximum value (inclusive)
 * @param {boolean} isInteger - Whether to return an integer
 * @returns {number} Random number within the specified range
 */
function getRandomNumber(min, max, isInteger = true) {
    if (isInteger) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    return Math.random() * (max - min) + min;
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

/**
 * Toggle modal visibility
 * @param {string} modalId - ID of the modal to toggle
 * @param {boolean} show - Whether to show or hide the modal
 */
function toggleModal(modalId, show) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    if (show) {
        modal.classList.add('show');
    } else {
        modal.classList.remove('show');
    }
}

/**
 * Play sound effect using Tone.js for more sophisticated sounds
 * @param {string} type - Type of sound effect ('correct', 'incorrect', or 'time')
 */
function playSound(type) {
    // Check if sound is enabled in settings
    const soundEnabled = localStorage.getItem('sound') !== 'false';
    if (!soundEnabled) return;

    // Initialize Tone.js synths if not already created
    if (!window.toneSynths) {
        try {
            // For melodic sounds
            const polySynth = new Tone.PolySynth(Tone.Synth).toDestination();
            polySynth.volume.value = -10;

            // For percussive sounds
            const membraneSynth = new Tone.MembraneSynth({
                pitchDecay: 0.05,
                octaves: 4,
                oscillator: { type: 'sine' },
                envelope: {
                    attack: 0.001,
                    decay: 0.4,
                    sustain: 0.01,
                    release: 1.4,
                    attackCurve: 'exponential'
                }
            }).toDestination();
            membraneSynth.volume.value = -15;

            // For ambient sounds
            const amSynth = new Tone.AMSynth({
                harmonicity: 2,
                detune: 0,
                oscillator: { type: 'triangle' },
                envelope: {
                    attack: 0.01,
                    decay: 0.8,
                    sustain: 0.4,
                    release: 1.5
                },
                modulation: { type: 'square' },
                modulationEnvelope: {
                    attack: 0.5,
                    decay: 0,
                    sustain: 1,
                    release: 0.5
                }
            }).toDestination();
            amSynth.volume.value = -15;

            window.toneSynths = { polySynth, membraneSynth, amSynth };
        } catch (e) {
            console.error('Error initializing Tone.js:', e);
            return;
        }
    }

    const synths = window.toneSynths;

    // Configure sound based on type
    switch (type) {
        case 'correct':
            // Play a pleasant chord for correct answers
            synths.polySynth.triggerAttackRelease(['C4', 'E4', 'G4'], '8n');
            setTimeout(() => {
                synths.polySynth.triggerAttackRelease(['E4', 'G4', 'C5'], '4n');
            }, 150);
            break;

        case 'incorrect':
            // Play a gentle but noticeable sound for incorrect answers
            synths.amSynth.triggerAttackRelease('D3', '16n');
            setTimeout(() => {
                synths.amSynth.triggerAttackRelease('C3', '8n');
            }, 100);
            break;

        case 'time':
            // Play a soft bell-like sound for time notifications
            synths.polySynth.set({
                oscillator: { type: 'sine' },
                envelope: { attack: 0.02, decay: 0.1, sustain: 0.3, release: 1 }
            });
            synths.polySynth.triggerAttackRelease(['G4', 'D5'], '8n');
            setTimeout(() => {
                synths.polySynth.triggerAttackRelease(['D5', 'G5'], '4n', Tone.now(), 0.5);
            }, 200);
            break;
    }
}

/**
 * Save game stats to local storage
 * @param {string} gameType - Type of game ('math' or 'morse')
 * @param {Object} stats - Game statistics
 */
function saveGameStats(gameType, stats) {
    const savedStats = JSON.parse(localStorage.getItem(`${gameType}Stats`) || '[]');
    savedStats.unshift({
        ...stats,
        date: new Date().toISOString()
    });

    // Keep only the last 10 game sessions
    if (savedStats.length > 10) {
        savedStats.pop();
    }

    localStorage.setItem(`${gameType}Stats`, JSON.stringify(savedStats));
}

/**
 * Get saved game stats from local storage
 * @param {string} gameType - Type of game ('math' or 'morse')
 * @returns {Array} Array of game statistics
 */
function getGameStats(gameType) {
    return JSON.parse(localStorage.getItem(`${gameType}Stats`) || '[]');
}

/**
 * Safely evaluate a mathematical expression
 * @param {string} expression - Mathematical expression to evaluate
 * @returns {number|null} Result of evaluation or null if error
 */
function safeEvaluate(expression) {
    try {
        // Remove any characters that aren't digits, operators, or parentheses
        const sanitizedExpression = expression.replace(/[^0-9+\-*/.()]/g, '');

        // Use Function constructor to evaluate the expression
        // This is safer than eval() but still needs sanitization
        return Function('"use strict"; return (' + sanitizedExpression + ')')();
    } catch (e) {
        console.error('Error evaluating expression:', e);
        return null;
    }
}

/**
 * Check if two values are equal within tolerance for floating point comparison
 * @param {number} a - First value
 * @param {number} b - Second value
 * @param {number} tolerance - Tolerance for floating point comparison
 * @returns {boolean} Whether values are equal within tolerance
 */
function areEqual(a, b, tolerance = 0.0001) {
    return Math.abs(a - b) < tolerance;
}

/**
 * Show a notification toast
 * @param {string} message - Message to display
 * @param {string} type - Type of notification ('success', 'error', or 'info')
 * @param {number} duration - Duration in milliseconds
 */
function showNotification(message, type = 'info', duration = 3000) {
    // Create notification element if it doesn't exist
    let notification = document.getElementById('notification-toast');

    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'notification-toast';
        notification.className = 'notification';
        document.body.appendChild(notification);

        // Add styles if not already in CSS
        const style = document.createElement('style');
        style.textContent = `
            .notification {
                position: fixed;
                bottom: 20px;
                right: 20px;
                padding: 12px 20px;
                border-radius: 4px;
                color: white;
                font-weight: 500;
                z-index: 9999;
                transform: translateY(100px);
                opacity: 0;
                transition: transform 0.3s, opacity 0.3s;
            }
            .notification.show {
                transform: translateY(0);
                opacity: 1;
            }
            .notification.success { background-color: #4caf50; }
            .notification.error { background-color: #f44336; }
            .notification.info { background-color: #2196f3; }
        `;
        document.head.appendChild(style);
    }

    // Set notification content and type
    notification.textContent = message;
    notification.className = `notification ${type}`;

    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    // Hide notification after duration
    setTimeout(() => {
        notification.classList.remove('show');
    }, duration);
}
