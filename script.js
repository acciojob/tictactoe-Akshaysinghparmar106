//your JS code here. If required.
const cells = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const statusText = document.getElementById("statusText");
const restartBtn = document.getElementById("restartBtn");

let currentPlayer = "X";
let gameActive = true;

const WIN_PATTERNS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

cells.forEach(cell => {
    cell.addEventListener("click", cellClicked, { once: true });
});

function cellClicked(e) {
    const cell = e.target;

    if (!gameActive) return;

    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer);

    if (checkWin(currentPlayer)) {
        statusText.textContent = `${currentPlayer} Wins!`;
        gameActive = false;
    } else if (isDraw()) {
        statusText.textContent = `It's a Draw!`;
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === "X" ? "Y" : "X";
    }
}

function checkWin(player) {
    return WIN_PATTERNS.some(pattern => {
        return pattern.every(index => {
            return cells[index].textContent === player;
        });
    });
}

function isDraw() {
    return [...cells].every(cell => cell.textContent !== "");
}

restartBtn.addEventListener("click", restartGame);

function restartGame() {
    currentPlayer = "X";
    gameActive = true;
    statusText.textContent = "";
    
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("X", "O");
        cell.replaceWith(cell.cloneNode(true));
    });

    const newCells = document.querySelectorAll("[data-cell]");
    newCells.forEach(cell => {
        cell.addEventListener("click", cellClicked, { once: true });
    });
}
