# Code Quest - Educational Games

Code Quest is an educational web application with interactive games focused on mathematics and Morse code. The application is built with HTML, CSS, and vanilla JavaScript without dependencies on external frameworks.

## Features

### Math Game
- Random math problems generation with various operation types:
   - Addition
   - Subtraction
   - Multiplication
   - Division
   - Squares
   - Exponents
   - Comparison (greater than, less than, equals)
- Customizable settings:
   - Time limits (15s, 30s, 1min, 5min, 10min, 30min, unlimited)
   - Number types (positive, negative, or both)
   - Maximum value setting
- Score tracking (correct answers, incorrect answers, time)
- History of previous attempts
- True/False questions for comparison mode

### Morse Code Game
- Multiple modes:
   - Letters
   - Numbers
   - Mixed (both letters and numbers)
- Difficulty levels:
   - Easy (single character)
   - Medium (three characters)
   - Hard (five characters)
- Audio playback of Morse code
- Reference table for learning
- Score tracking and history

### Additional Features
- Light and dark mode
- Responsive design for all device sizes
- Contact page with mock contact information
- Demonstration page showcasing both games
- Local storage for saving settings and game progress

## Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript
- Tone.js for audio generation (CDN)
- Font Awesome for icons (CDN)

## Project Structure

- `index.html` - Home page with game demonstrations
- `matematica.html` - Math game page
- `morse.html` - Morse code game page
- `contato.html` - Contact information page
- `css/` - Directory containing all stylesheets
   - `styles.css` - Main application styles
   - `matematica.css` - Math game specific styles
   - `morse.css` - Morse code game specific styles
   - `contato.css` - Contact page specific styles
- `js/` - Directory containing all JavaScript files
   - `app.js` - Main application logic
   - `utils.js` - Utility functions
   - `matematica.js` - Math game logic
   - `morse.js` - Morse code game logic

## How to Use

1. Open `index.html` in a web browser
2. Click on one of the game cards to start playing
3. Use the settings to customize game difficulty and parameters
4. Play the game and try to improve your score
5. View your history to track progress

## License

© 2025 PLAY CmC. All rights reserved.
