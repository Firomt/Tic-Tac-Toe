document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const turnDisplay = document.getElementById("turn");
    const winnerDisplay = document.querySelector(".winner");
    const restartBtn = document.getElementById("restartBtn");
    
    let board = Array(9).fill("");
    let currentPlayer = "X";
    let gameActive = true;
    
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    
    function checkWinner() {
        for (let condition of winConditions) {
            const [a, b, c] = condition;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                gameActive = false;
                winnerDisplay.textContent = `${board[a]} Wins!`;
                return;
            }
        }
        if (!board.includes("")) {
            gameActive = false;
            winnerDisplay.textContent = "It's a Draw!";
        }
    }
    
    function handleCellClick(event) {
        const index = event.target.getAttribute("cellIndex");
        if (board[index] || !gameActive) return;
        
        board[index] = currentPlayer;
        event.target.textContent = currentPlayer;
        
        checkWinner();
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        turnDisplay.textContent = `Player ${currentPlayer}'s Turn`;
    }
    
    function restartGame() {
        board.fill("","");
        gameActive = true;
        currentPlayer = "X";
        winnerDisplay.textContent = "";
        turnDisplay.textContent = "Player X's Turn";
        cells.forEach(cell => cell.textContent = "");
    }
    
    cells.forEach(cell => cell.addEventListener("click", handleCellClick));
    restartBtn.addEventListener("click", restartGame);
    
    turnDisplay.textContent = "Player X's Turn";
});
