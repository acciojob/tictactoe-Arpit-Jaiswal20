//your JS code here. If required.
let currentPlayer = "X";
let player1 = "";
let player2 = "";
let gameActive = true;
let board = ["", "", "", "", "", "", "", "", ""];

const submitBtn = document.getElementById("submit");
const messageDiv = document.querySelector(".message");
const gameDiv = document.getElementById("game");
const playerInputDiv = document.getElementById("player-input");
const cells = document.getElementsByClassName("cell");

submitBtn.addEventListener("click", () => {
  player1 = document.getElementById("player-1").value.trim();
  player2 = document.getElementById("player-2").value.trim();

  if (player1 && player2) {
    playerInputDiv.style.display = "none";
    gameDiv.style.display = "block";
    updateMessage();
  }
});

Array.from(cells).forEach((cell, index) => {
  cell.addEventListener("click", () => handleCellClick(index));
});

function handleCellClick(index) {
  if (!gameActive || board[index] !== "") return;

  board[index] = currentPlayer;
  document.getElementById(index + 1).textContent = currentPlayer;

  if (checkWinner()) {
    gameActive = false;
    messageDiv.textContent = `${getCurrentPlayerName()}, congratulations you won!`;
    return;
  }

  if (board.every(cell => cell !== "")) {
    gameActive = false;
    messageDiv.textContent = "It's a draw!";
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  updateMessage();
}

function updateMessage() {
  messageDiv.textContent = `${getCurrentPlayerName()}, you're up`;
}

function getCurrentPlayerName() {
  return currentPlayer === "X" ? player1 : player2;
}

function checkWinner() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
    [0, 4, 8], [2, 4, 6]             // diags
  ];

  return winPatterns.some(pattern => 
    board[pattern[0]] === currentPlayer &&
    board[pattern[1]] === currentPlayer &&
    board[pattern[2]] === currentPlayer
  );
}
