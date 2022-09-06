import "./styles.css";
let reset = document.querySelector(".reset");
let cells = document.querySelectorAll(".cell");
let currentPlayer = "X";
let gameStatus = document.querySelector(".game-status");
let gameActive = true;
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
let gameState = ["", "", "", "", "", "", "", "", ""];
cells.forEach((cell) => {
  cell.addEventListener("click", (e) => {
    if (cell.innerHTML !== "") {
      return;
    }
    let index = e.target.dataset.cellIndex;
    if (currentPlayer === "O") {
      cell.style.color = "#faea48";
      gameStatus.style.color = "#faea48";
    }
    if (gameActive) {
      cell.innerHTML = currentPlayer;
      gameState[index] = currentPlayer;
      gameStatus.innerHTML = `Player ${currentPlayer} is playing`;
    }
    validateWinning();
  });
});

function validateWinning() {
  let roundWon = false;
  for (let i = 0; i <= 7; i++) {
    const wincondition = winningConditions[i];
    let a = gameState[wincondition[0]];
    let b = gameState[wincondition[1]];
    let c = gameState[wincondition[2]];
    if (a === "" || b === "" || c === "") {
      continue;
    }
    if (a === b && b === c && typeof a !== "undefined") {
      roundWon = true;
      break;
    }
  }
  if (roundWon) {
    gameStatus.innerHTML = `${currentPlayer} has won `;
    gameActive = false;
    return;
  }
  if (!gameState.includes("")) {
    gameStatus.innerHTML = "Game is draw";
  }
  handlePlayer();
}
function handlePlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}
//------Reset functionality------------------//
reset.addEventListener("click", handleReset);
function handleReset() {
  cells.forEach((cell) => {
    cell.innerHTML = "";
    cell.style.color = "#eb4747";
  });
  gameStatus.innerHTML = "";
  gameStatus.style.color = "#eb4747";
  gameState = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  currentPlayer = "X";
}
