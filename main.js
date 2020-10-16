const board = document.querySelector('#board'),
  winningMessageText = document.querySelector('[data-winning-message-text]'),
  restartBtn = document.querySelector('#restartBtn'),
  winningMessage = document.querySelector('#winningMessage'),
  cellElems = document.querySelectorAll('[data-cell]'),
  X_CLASS = 'x',
  CIRCLE_CLASS = 'circle'
  WINNING_COMBINATION = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 5, 6]
  ]; 

let circleTurn;

function startGame() {
  circleTurn = false;
  cellElems.forEach(cell => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
  });
  setBoardHoverClass();
  winningMessage.classList.remove('show');
}

function handleClick(e) {
  //place Mark
  const cell = e.target;
  const currClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  placeMark(cell, currClass);
  //check 4 win
  if (checkWin(currClass)) {
    endGame(false);
  } else if (isDraw()) {
  //check 4 draw
    endGame(true); 
  } else {
    //switch turn
    swapTurns();
    setBoardHoverClass();
  }
}

function endGame(draw) {
  if(draw) {
    winningMessageText.innerText = 'Draw!'; 
  } else {
    winningMessageText.innerText = `${circleTurn ? "O's" : "X's"} Wins!`; 
  }
  winningMessage.classList.add('show');
}

function isDraw() {
  return [... cellElems].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
  });
}

function placeMark(cell, currClass) {
  cell.classList.add(currClass);
}

function swapTurns() {
  circleTurn = !circleTurn;
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);

  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}

function checkWin(currClass) {
  return WINNING_COMBINATION.some(combination => {
    return combination.every(index => {
      return cellElems[index].classList.contains(currClass);
    });
  });
} 


startGame();



restartBtn.addEventListener('click', startGame);