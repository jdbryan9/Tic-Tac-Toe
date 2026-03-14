const WIN_PATTERNS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const cells = document.querySelectorAll('.cell');
const statusEl = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');
const xScoreEl = document.getElementById('xScore');
const drawScoreEl = document.getElementById('drawScore');
const oScoreEl = document.getElementById('oScore');

let board = Array(9).fill('');
let activePlayer = 'X';
let gameActive = true;
const scores = { X: 0, O: 0, draw: 0 };

function handleCellClick(event) {
  const index = Number(event.currentTarget.dataset.index);

  if (!gameActive || board[index]) {
    return;
  }

  board[index] = activePlayer;
  renderMove(event.currentTarget, activePlayer);

  if (hasPlayerWon(activePlayer)) {
    gameActive = false;
    scores[activePlayer] += 1;
    updateScores();
    statusEl.textContent = `🎉 Player ${activePlayer} wins!`;
    disableBoard();
    return;
  }

  if (isDraw()) {
    gameActive = false;
    scores.draw += 1;
    updateScores();
    statusEl.textContent = '🤝 It\'s a draw!';
    disableBoard();
    return;
  }

  activePlayer = activePlayer === 'X' ? 'O' : 'X';
  statusEl.textContent = `Player ${activePlayer}'s turn`;
}

function renderMove(cell, player) {
  cell.textContent = player;
  cell.classList.add(player.toLowerCase());
  cell.disabled = true;
}

function hasPlayerWon(player) {
  return WIN_PATTERNS.some((pattern) => pattern.every((i) => board[i] === player));
}

function isDraw() {
  return board.every((cell) => cell !== '');
}

function disableBoard() {
  cells.forEach((cell) => {
    cell.disabled = true;
  });
}

function resetBoard() {
  board = Array(9).fill('');
  activePlayer = 'X';
  gameActive = true;
  statusEl.textContent = `Player ${activePlayer}'s turn`;

  cells.forEach((cell) => {
    cell.textContent = '';
    cell.disabled = false;
    cell.classList.remove('x', 'o');
  });
}

function updateScores() {
  xScoreEl.textContent = String(scores.X);
  oScoreEl.textContent = String(scores.O);
  drawScoreEl.textContent = String(scores.draw);
}

cells.forEach((cell) => {
  cell.addEventListener('click', handleCellClick);
});

resetBtn.addEventListener('click', resetBoard);
