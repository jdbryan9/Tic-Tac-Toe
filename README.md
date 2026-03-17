# Tic-Tac-Toe

A colorful browser-based Tic-Tac-Toe game.

## How to run

1. Open a terminal in this project directory.
2. Start a local static server:

   ```bash
   python3 -m http.server 8000
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
