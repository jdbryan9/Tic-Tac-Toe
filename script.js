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

const HUMAN_MODE = 'human';
const COMPUTER_MODE = 'computer';
const EASY_DIFFICULTY = 'easy';
const HARD_DIFFICULTY = 'hard';
const CENTER_INDEX = 4;
const CORNER_INDEXES = [0, 2, 6, 8];

const cells = document.querySelectorAll('.cell');
const statusEl = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');
const gameModeSelect = document.getElementById('gameMode');
const difficultyWrap = document.getElementById('difficultyWrap');
const difficultyLevelSelect = document.getElementById('difficultyLevel');
const xScoreEl = document.getElementById('xScore');
const drawScoreEl = document.getElementById('drawScore');
const oScoreEl = document.getElementById('oScore');

let board = Array(9).fill('');
let activePlayer = 'X';
let gameActive = true;
const scores = { X: 0, O: 0, draw: 0 };

function handleCellClick(event) {
  const index = Number(event.currentTarget.dataset.index);
  processMove(index, event.currentTarget);

  if (isComputerTurn()) {
    window.setTimeout(playComputerTurn, 400);
  }
}

function processMove(index, cellEl) {
  if (!gameActive || board[index]) {
    return;
  }

  board[index] = activePlayer;
  renderMove(cellEl, activePlayer);

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
  statusEl.textContent = getTurnMessage();
}

function playComputerTurn() {
  if (!isComputerTurn()) {
    return;
  }

  const moveIndex = pickComputerMove();

  if (moveIndex === null) {
    return;
  }

  const targetCell = cells[moveIndex];
  processMove(moveIndex, targetCell);
}

function pickComputerMove() {
  const availableIndexes = getAvailableIndexes();

  if (!availableIndexes.length) {
    return null;
  }

  if (difficultyLevelSelect.value === HARD_DIFFICULTY) {
    return pickHardMove(availableIndexes);
  }

  return pickRandomMove(availableIndexes);
}

function pickHardMove(availableIndexes) {
  if (availableIndexes.includes(CENTER_INDEX)) {
    return CENTER_INDEX;
  }

  const availableCorner = CORNER_INDEXES.find((index) => availableIndexes.includes(index));

  if (availableCorner !== undefined) {
    return availableCorner;
  }

  return availableIndexes[0];
}

function pickRandomMove(availableIndexes) {
  return availableIndexes[Math.floor(Math.random() * availableIndexes.length)];
}

function getAvailableIndexes() {
  return board
    .map((value, index) => (value === '' ? index : null))
    .filter((index) => index !== null);
}

function isComputerTurn() {
  return gameActive && gameModeSelect.value === COMPUTER_MODE && activePlayer === 'O';
}

function getTurnMessage() {
  if (isComputerTurn()) {
    return "Computer O's turn";
  }

  return `Player ${activePlayer}'s turn`;
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

function updateDifficultyVisibility() {
  const isComputerMode = gameModeSelect.value === COMPUTER_MODE;
  difficultyWrap.classList.toggle('hidden', !isComputerMode);
  difficultyWrap.setAttribute('aria-hidden', String(!isComputerMode));
}

function resetBoard() {
  board = Array(9).fill('');
  activePlayer = 'X';
  gameActive = true;
  statusEl.textContent = getTurnMessage();

  cells.forEach((cell) => {
    cell.textContent = '';
    cell.disabled = false;
    cell.classList.remove('x', 'o');
  });
}

function handleGameModeChange() {
  updateDifficultyVisibility();
  resetBoard();
}

function updateScores() {
  xScoreEl.textContent = String(scores.X);
  oScoreEl.textContent = String(scores.O);
  drawScoreEl.textContent = String(scores.draw);
}

cells.forEach((cell) => {
  cell.addEventListener('click', handleCellClick);
});

gameModeSelect.addEventListener('change', handleGameModeChange);
difficultyLevelSelect.addEventListener('change', resetBoard);
resetBtn.addEventListener('click', resetBoard);

updateDifficultyVisibility();
statusEl.textContent = getTurnMessage();
