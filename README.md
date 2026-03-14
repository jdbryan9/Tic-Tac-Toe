# Vibrant Tic-Tac-Toe

A colorful, browser-based Tic-Tac-Toe game with a modern glassmorphism UI, turn-by-turn status updates, and persistent in-session score tracking for X wins, O wins, and draws.

## Requirements

- A modern web browser (Chrome, Firefox, Edge, Safari)
- *(Optional)* Python 3 for running a local static server

## Run the Game

### Option 1: Open directly
1. In this project folder, locate `index.html`.
2. Double-click it (or open it in your browser manually).

### Option 2: Run with a local server (recommended)
1. Open a terminal in the project directory.
2. Start a static server:

   ```bash
   python3 -m http.server 4173
   ```

3. Open your browser and go to:

   ```
   http://127.0.0.1:4173
   ```

4. Stop the server with `Ctrl + C` in the terminal.

## How to Play

- Players take turns placing `X` and `O` on the 3×3 board.
- First player to align 3 symbols in a row, column, or diagonal wins.
- If all 9 cells are filled without a winner, the game is a draw.
- Click **🔁 New Game** to clear the board and start a new round.
- The scoreboard updates after each round and tracks results while the page remains open.

## Project Structure

- `index.html` – game layout and UI elements
- `styles.css` – vibrant styling and responsive design
- `script.js` – gameplay logic, win/draw detection, score handling
