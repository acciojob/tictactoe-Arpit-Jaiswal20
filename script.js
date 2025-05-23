const messege = document.querySelector(".messege");
const player1 = document.querySelector("#player-1");
const player2 = document.querySelector("#player-2");
const playerInput = document.querySelector(".player-input");
const startbtn = document.querySelector("#start-btn");
const gameboard = document.querySelector(".game-board");
const gameboardState = Array(9).fill(null);
const cells = document.querySelectorAll(".cell");
let currentPlayer = "";
let currentSymbol = "";
let gameActive = false; // it will track game is active or not.
let count = 0; // it will track draw status

gameboard.style.visibility = "hidden";

// game board will appear after click
startbtn.addEventListener("click", () => {
    if(player1.value.trim() == "" || player2.value.trim() == ""){
        alert("Enter Player details");
        return;
    }

    playerInput.style.visibility = "hidden";
    gameboard.style.visibility = "";

    currentPlayer = player1;
    currentSymbol = "X";

    gameActive = true;

    messege.textContent = `${currentPlayer.value} you're up!`
});

// who will winner and winning patterns
function checkwinner () {
    const winningPatterns = [
        [0,1,2],[0,3,6],[0,4,8],[1,4,7],[2,4,6],[2,5,8],[3,4,5],[6,7,8]
    ];

    for(patterns of winningPatterns){
        const [a,b,c] = patterns;

        if(gameboardState[a] && gameboardState[a] === gameboardState[b] && gameboardState[a] === gameboardState[c]){
            return true;
        }
    }
    return false;
}

cells.forEach(cell => {
    cell.addEventListener("click" ,(event) => {
        count++;
        console.log(cell.id);
        const cellIndex = parseInt(cell.id)-1;

        if(gameboardState[cellIndex] || !gameActive){
            return;
        }

        gameboardState[cellIndex] = currentSymbol;
        cell.textContent = currentSymbol;

        if(checkwinner()){
            messege.textContent =`${currentPlayer.value}, Congratulations you won!!!`
            gameActive = false;
            return;
        }
        
        currentPlayer = currentPlayer === player1 ? player2 : player1;
        currentSymbol = currentSymbol ==="X" ?"O" :"X";

        if(count === 9 && !checkwinner()){
            messege.textContent = "Match is draw!";
            gameActive = false;
            return;
        }

        messege.textContent = `${currentPlayer.value} you're up!`;
    });
});