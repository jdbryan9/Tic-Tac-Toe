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
   http://localhost:8000
   ```

## How to play

- Choose a mode from the **Game Mode** dropdown:
  - **Two Players**: Player X and Player O take turns on the same device.
  - **Vs Computer**: You are Player X, and the computer is Player O.
- Click any empty square to place your mark.
- The first to align three marks in a row, column, or diagonal wins.
- Click **New Game** to clear the board and play again.

## Notes

- In **Vs Computer** mode, the computer chooses a random available square on its turn.
- The scoreboard tracks wins and draws while the page stays open.
