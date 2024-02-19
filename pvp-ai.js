var origBoard;
const player1 = 'X';
const player2 = 'O';
let currentPlayer;
let isAIPlayer;
let aiDifficulty;
let player1Wins = 0;
let player2Wins = 0;
let draws = 0;
let tabledisplay = false;

const winCombos = [
    // horizontals
    [0, 1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10, 11],
    [12, 13, 14, 15, 16, 17],
    [18, 19, 20, 21, 22, 23],
    [24, 25, 26, 27, 28, 29],

    // verticals
    [0, 6, 12, 18, 24],
    [1, 7, 13, 19, 25],
    [2, 8, 14, 20, 26],
    [3, 9, 15, 21, 27],
    [4, 10, 16, 22, 28],
    [5, 11, 17, 23, 29],

    // x2 diagonal
    [1, 6],
    [4, 11],
    [18, 25],
    [23, 28],

    // x3 diagonal
    [2, 7, 12],
    [12, 19, 26],
    [3, 10, 17],
    [17, 22, 27],

    // x4 diagonal
    [3, 8, 13, 18],
    [2, 9, 16, 23],
    [6, 13, 20, 27],
    [11, 16, 21, 26],

    // x5 diagonal
    [4, 9, 14, 19, 24],
    [5, 10, 15, 20, 25],
    [0, 7, 14, 21, 28],
    [1, 8, 15, 22, 29], 
];

const table = document.querySelector('table');
const cells = document.querySelectorAll('.cell');
document.querySelector('#scoreboard').style.visibility = 'Hidden';
document.querySelector('#table').style.visibility = 'Hidden';
document.querySelector('.returndiv').style.visibility = 'Hidden';

function btnreturn() {
	origBoard = Array.from(Array(6 * 5).keys());
    player1Wins = 0;
    player2Wins = 0;
    draws = 0;
	updateScoreboard();
	document.querySelector('.endgame').style.display = 'none';
    document.querySelector('.pickgamemode').style.display = 'none';
	document.querySelector('.roundwin').style.display = 'none';
	document.querySelector('#table').style.visibility = 'Hidden';
	document.querySelector('#scoreboard').style.visibility = 'Hidden';
	document.querySelector('.returndiv').style.visibility = 'Hidden';
    getPlayerMode();
}

var btnexitgm = document.getElementById("exgm");
btnexitgm.addEventListener("click", function(){
  document.querySelector('.pickgamemode').style.display = 'none';
  document.querySelector('.startpage').style.display = 'block';
});

var btnexitam = document.getElementById("exaim");
btnexitam.addEventListener("click", function(){
  document.querySelector('.aimode').style.display = 'none';
  document.querySelector('.pickgamemode').style.display = 'block';
});



function clearboard() {
	for (var i = 0; i < cells.length; i++) {
        cells[i].innerText = '';
        cells[i].style.removeProperty('background-color');
        cells[i].classList.remove('win-cell');
		cells[i].addEventListener('click', turnClick, false);
    }
}


const scoreboard = document.getElementById('scoreboard');
scoreboard.innerHTML = `Player X: ${player1Wins} | Player O: ${player2Wins} | Draws: ${draws}`;



function startGame() {
    origBoard = Array.from(Array(6 * 5).keys());
    player1Wins = 0;
    player2Wins = 0;
    draws = 0;
	updateScoreboard();
	document.querySelector('.endgame').style.display = 'none';
    document.querySelector('.pickgamemode').style.display = 'none';
	document.querySelector('#table').style.visibility = 'Hidden';
	document.querySelector('#scoreboard').style.visibility = 'Hidden';
	document.querySelector('.returndiv').style.visibility = 'Hidden';
    getPlayerMode();
}


function getPlayerMode() {
	document.querySelector('#scoreboard').style.visibility = 'Hidden';
	document.querySelector('#table').style.visibility = 'Hidden';
	document.querySelector('.returndiv').style.visibility = 'Hidden';
	
	document.querySelector('.pickgamemode').style.display = 'block';
	document.querySelector('.startpage').style.display = 'none';
	var btnAI = document.getElementById("AI")
	var btnLocal = document.getElementById("local")
  

  btnAI.addEventListener("click", function(){
    isAIPlayer = true;
    getAIDifficulty();
  });

  btnLocal.addEventListener("click", function(){
    isAIPlayer = false;
    currentPlayer = player1;
	document.querySelector('#scoreboard').style.visibility = 'visible';
	document.querySelector('#table').style.visibility = 'visible';
	document.querySelector('.returndiv').style.visibility = 'visible';
    initGame();
  });

}

function getAIDifficulty() {
	document.querySelector('#scoreboard').style.visibility = 'Hidden';
	document.querySelector('#table').style.visibility = 'Hidden';
	document.querySelector('.returndiv').style.visibility = 'Hidden';
	document.querySelector('.pickgamemode').style.display = 'none';
	document.querySelector('.aimode').style.display = 'block';

	var btnEasy = document.getElementById("easy")
	var btnDifficult = document.getElementById("difficult")
	var btnExtreme = document.getElementById("extreme")
  

	btnEasy.addEventListener("click", function(){
		document.querySelector('#scoreboard').style.visibility = 'visible';
		document.querySelector('#table').style.visibility = 'visible';
		document.querySelector('.returndiv').style.visibility = 'visible';
		aiDifficulty = "easy";
		initGame();
		document.querySelector('.aimode').style.display = 'none';
	});

	btnDifficult.addEventListener("click", function(){
		document.querySelector('#scoreboard').style.visibility = 'visible';
		document.querySelector('#table').style.visibility = 'visible';
		document.querySelector('.returndiv').style.visibility = 'visible';
		aiDifficulty = "difficult";
		initGame();
		document.querySelector('.aimode').style.display = 'none';
	});
	  
	btnExtreme.addEventListener("click", function(){
		document.querySelector('#scoreboard').style.visibility = 'visible';
		document.querySelector('#table').style.visibility = 'visible';
		document.querySelector('.returndiv').style.visibility = 'visible';
		aiDifficulty = "extreme";
		initGame();
		document.querySelector('.aimode').style.display = 'none';
	});
}

function initGame() {
  document.querySelector('.roundwin').style.display = 'none';
  document.querySelector('.pickgamemode').style.display = 'none';
  currentPlayer = player1;

    for (var i = 0; i < cells.length; i++) {
        cells[i].innerText = '';
        cells[i].style.removeProperty('background-color');
        cells[i].classList.remove('win-cell');
        cells[i].addEventListener('click', turnClick, false);
    }

    if (isAIPlayer && currentPlayer === player2) {
      aiMove();
      checkGameOver();
  } 
}

function turnClick(event) {
    const cellId = event.target.id;
    if (typeof origBoard[cellId] === 'number' && !checkWin(origBoard, player1) && !checkWin(origBoard, player2)) {
        turn(cellId, currentPlayer);

        if (checkWin(origBoard, currentPlayer)) {
            declareWinner(`${currentPlayer}`);
        } else if (checkTie()) {
            declareWinner("Oops! It's a Draw!");
        }

        currentPlayer = (currentPlayer === player1) ? player2 : player1;

        if (isAIPlayer && currentPlayer === player2 && !checkWin(origBoard, player1) && !checkWin(origBoard, player2) && !checkTie()) {
            aiMove();
        }
    }
}

function aiMove() {
    if (aiDifficulty === 'easy') {
        setTimeout(easyAIMove, 650);
    } else if (aiDifficulty === 'difficult') {
        setTimeout(difficultAIMove, 500);
    } else if (aiDifficulty === 'extreme') {
        setTimeout(extremeAIMove, 200);
    }
}


//easy mode just makes random moves
function easyAIMove() {
    const emptySquaresArray = emptySquares();
    const randomIndex = Math.floor(Math.random() * emptySquaresArray.length);
    const aiMove = emptySquaresArray[randomIndex];
    turn(aiMove, player2);
    checkGameOver();
}

// difficult ai makes sure to make winning moves first then block
function difficultAIMove() {
	
    // AI will block a move
    const blockingMove = findWinningMove(player1);
    if (blockingMove !== -1) {
        turn(blockingMove, player2);
	
	// Else it will make a random move
    } else {
      const emptySquaresArray = emptySquares();
      const randomIndex = Math.floor(Math.random() * emptySquaresArray.length);
      const aiMove = emptySquaresArray[randomIndex];
      turn(aiMove, player2);
    }
	
    checkGameOver();
}

function extremeAIMove() {
	
	// If AI has no win, block the opponent's winning move
    const blockWinningMove = findWinningMove(player1);
    if (blockWinningMove !== -1) {
    turn(blockWinningMove, player2);
    } else {
		
        // AI will make win
		const winningMove = findWinningMove(player2);
		if (winningMove !== -1) {
        turn(winningMove, player2);
        } else {
			
            // If no win or block move, set up a winning move on the next turn
            const setupWinningMove = findSetupWinningMove(player2);
            if (setupWinningMove !== -1) {
                turn(setupWinningMove, player2);
            } else {
                // make a random move
                easyAIMove();
            }
        }
    }

    checkGameOver();
}

function findWinningMove(player) {
    for (let i = 0; i < origBoard.length; i++) {
        if (typeof origBoard[i] === 'number') {
            origBoard[i] = player;
            if (checkWin(origBoard, player)) {
                origBoard[i] = i; // Reset the board
                return i;
            }
            origBoard[i] = i; // Reset the board
        }
    }
    return -1;
}

function findSetupWinningMove(player) {
    for (let i = 0; i < origBoard.length; i++) {
        if (typeof origBoard[i] === 'number') {
            origBoard[i] = player;
            const setupWinningMove = findWinningMove(player);
            origBoard[i] = i; // Reset the board

            if (setupWinningMove !== -1) {
                return i;
            }
        }
    }
    return -1;
}


function turn(squareId, player) {
	origBoard[squareId] = player;
	document.getElementById(squareId).innerText = player;
	document.getElementById(squareId).removeEventListener('click', turnClick, false);
	let gameWon = checkWin(origBoard, player);
	if (gameWon) gameOver(gameWon);
}

function checkWin(board, player) {
    let plays = board.reduce((a, e, i) => (e === player) ? a.concat(i) : a, []);
    let gameWon = null;
    for (let win of winCombos) {
        if (win.every(elem => plays.indexOf(elem) > -1)) {
            gameWon = { player: player , index: win };
            break;
        }
    }
	
    return gameWon;
}

function gameOver(gameWon) {
    const winningCombination = gameWon.index;

    for (let i = 0; i < winningCombination.length; i++) {
        const index = winningCombination[i];
        document.getElementById(index).classList.add('win-cell');
    }

    for (var i = 0; i < cells.length; i++) {
        cells[i].removeEventListener('click', turnClick, false);
    }

	if (gameWon.player == player1 || gameWon.player == player2) {
        updateScore(gameWon.player);
        declareWinner(`${gameWon.player}`);
    } else {

        //updateScore('draw'); //added logic to update scoreboard !--changed draw to draws??
        declareWinner();
        document.querySelector('.roundwin').style.display = 'block';
        document.querySelector('.roundwin .text1').innerText = 'Draw!';
        
    }
}

//declare who won the game
function declareWinner(who) {

	currentPlayer = player1;

	if (player1Wins === 5 || player2Wins === 5) {
    
    document.querySelector('.endgame').style.display = 'block';
    document.querySelector('.endgame .text').innerText = who + " Wins the Game!";
	
	} else if (checkTie()) {
		updateScore('draw')
		document.querySelector('.roundwin').style.display = 'block';
		document.querySelector('.roundwin .text1').innerText = who;

	} else {
		document.querySelector('.roundwin').style.display = 'block';
		document.querySelector('.roundwin .text1').innerText = who + " Wins!";
	}
}

function startGameRound(){
    document.querySelector('.endgame').style.display = 'none';
    document.querySelector('.roundwin').style.display = 'none';
    origBoard = Array.from(Array(6 * 5).keys());
    initGame();
}

function emptySquares() {
    return origBoard.filter(s => typeof s == 'number');
}

function checkTie() {
    if (emptySquares().length == 0 && !checkWin(origBoard, player1) && !checkWin(origBoard, player2)) {
        for (var i = 0; i < cells.length; i++) {
            cells[i].style.backgroundColor = "green";
            cells[i].removeEventListener('click', turnClick, false);
        }
		
        return true;
    }
	
    return false;
}

function checkGameOver() {
    if (checkWin(origBoard, player2)) {
        declareWinner(`O`);
    } else if (checkTie()) {
		
        declareWinner(`It's a Draw!`);
    }
    currentPlayer = player1;
}

function updateScore(player) {
    if (player === player1) {
        player1Wins++;
    } else if (player === player2) {
        player2Wins++;
    } else if (player == 'draw') {  
        draws++;
    }
    updateScoreboard();
}

function updateScoreboard() {
    scoreboard.innerHTML = `Player X: ${player1Wins} &emsp;  &emsp; Player O: ${player2Wins} &emsp;  &emsp; Draws: ${draws}`;
}

function turn(squareId, player) {
    origBoard[squareId] = player;
    document.getElementById(squareId).innerText = player;

    // Set color based on player
    if (player === player1) {
        document.getElementById(squareId).style.color = 'red'; // X color: red
    } else {
        document.getElementById(squareId).style.color = 'blue'; // O color: blue
    }

    document.getElementById(squareId).removeEventListener('click', turnClick, false);

    let gameWon = checkWin(origBoard, player);
    if (gameWon) gameOver(gameWon);
}

const matchHistoryButton = document.getElementById('matchHistoryButton');

        // Add an event listener for click event
        matchHistoryButton.addEventListener('click', function() {
            // Redirect to matchhistory.html
            window.location.href = 'match_history.html';
        });
