const playerRed = "R";
const playerYellow  = "Y";
let currentPlayer = playerYellow;
let turnsTaken = 0;

let gameOver = false;
let columnSpaceLeft = [5, 5, 5, 5, 5, 5, 5,];

const gameColumns = 7;
const gameRows = 6;

let board = [];
let winner = document.getElementById('winner');

let resetButton = document.getElementById('reset-game');
let displayBoard = document.getElementById('newBoard');

let userOneButton = document.getElementById('submit-user-one');
let userTwoButton = document.getElementById('submit-user-two');

let singlePlayerButton = document.getElementById('single-player');
let randomizeButton = document.getElementById('random');
let instructions = document.getElementById('instructions');

function checkWinner() {
  //horizontial
  for (let i = 0; i < gameColumns-1; ++i) {
      for (let j = gameRows-1; j > 0; --j){
         if (board[i][j] != ' ') {
             if (board[i][j] === board[i+1][j] && board[i+1][j] === board[i+2][j] && board[i+2][j] === board[i+3][j]) {
              setWinner();
             }
         }
      }
 }

 //vertical
 for (let i = 0; i < gameColumns-1; ++i) {
  for (let j = gameRows-1; j > 0; --j){
     if (board[i][j] != ' ') {
         if (board[i][j] === board[i][j-1] && board[i][j-1] === board[i][j-2] && board[i][j-2] === board[i][j-3]) {
            setWinner();
         }
     }
  }
}

  //diagonal ->
  for (let i = 0; i < gameColumns-1; ++i) {
    for (let j = 0; j < gameRows-1; ++j){
       if (board[i][j] != ' ') {
           if (board[i][j] === board[i+1][j+1] && board[i+1][j+1] === board[i+2][j+2] && board[i+2][j+2] === board[i+3][j+3]) {
              setWinner();
           }
       }
    }
}

  //diagonal <-
  for (let i = gameColumns-1; i > 0; --i) {
    for (let j = 0; j < gameRows-1; ++j){
       if (board[i][j] != ' ') {
           if (board[i][j] === board[i-1][j+1] && board[i-1][j+1] === board[i-2][j+2] && board[i-2][j+2] === board[i-3][j+3]) {
              setWinner();
           }
       }
    }
}

}

function setWinner() {
  let userOne = document.getElementById('userOne');
  let userTwo = document.getElementById('userTwo');
  winner.className = "";
 if (currentPlayer ==="R") {
 winner.innerText = `${userOne.innerText} wins! Congratulations!
                      Select the Reset Game button to play again!`;
  } else if (currentPlayer ==="Y") {
    winner.innerText = `${userTwo.innerText} wins! Congratulations!
                        Select the Reset Game button to play again!`;
     }
 gameOver = true;
 return;
}



function dropPiece() {
  if (gameOver) {
    return;
  }

  let location = this.id.split('-');
  let userTwo = document.getElementById('userTwo');



  let h = '';
  if (currentPlayer == playerRed && userTwo.innerText==='Computer') {
    h = Number(Math.floor(Math.random() * 5));
    console.log(h);
  } else {
  h = Number(location[0]);
  }

  let j = columnSpaceLeft[h];
 

  if (j < 0) {
    return;
  }
  instructions.className="invis";
  let playedTile = document.getElementById(h.toString() + '-' + j.toString());

  if (currentPlayer == playerYellow) {
    playedTile.className = "yellow";
    currentPlayer = playerRed;
    board[h][j] = 'Y';
  } 
  else {
    playedTile.className = "red";
    currentPlayer = playerYellow;
    board[h][j] = 'R';
  }



--j;
columnSpaceLeft[h] = j;

checkWinner();
++turnsTaken;
}



function setGame() {
  for (let i = 0; i < gameColumns; ++i) {
      let column = [];
      for (let j =0; j< gameRows; ++j) {
        column.push(' ');

        let blankTile = document.createElement('div');
        blankTile.id = i.toString() + '-' + j.toString();
        blankTile.addEventListener('click', dropPiece); 
        document.getElementById("newBoard").append(blankTile);
      }
        board.push(column);
  }
}
  

window.onload = function() {
  setGame();
}

function resetGame() {
window.location.reload();
}

resetButton.addEventListener('click', resetGame);

function saveOneName() {
  let userOneName = document.getElementById('userOneInput');
  let userOne = document.getElementById('userOne');

  userOneName.className = 'disa';
  userOneButton.className = 'disa';

  userOne.innerText= userOneName.value;



}

function saveTwoName() {
  let userTwoName = document.getElementById('userTwoInput');
  let userTwo = document.getElementById('userTwo');

  userTwoName.className = 'disa';
  userTwoButton.className = 'disa';

  userTwo.innerText= userTwoName.value;
  

}

function randomizeOrder() {
  let userOne = document.getElementById('userOne');
  let userTwo = document.getElementById('userTwo');

  if (userOneButton.className && userTwoButton.className ) {
    let randomNum = Math.floor(Math.random() * 100); 
    console.log(randomNum);
    if (randomNum <= 49) {
    alert('User 1 goes First!');
    } else {
      const placeholder= userOne.innerText;
      userOne.innerText = userTwo.innerText;
      userTwo.innerText = placeholder;
      alert('User 2 goes First!');
    }
    
  }
}

function addInvis () {
  instructions.className = 'invis';
}

function playVsPC() {
  let userTwoName = document.getElementById('userTwoInput');
  let userTwo = document.getElementById('userTwo');

  userTwoName.className = 'disa';
  userTwoButton.className = 'disa';
  userTwo.innerText= 'Computer';

}


userOneButton.addEventListener('click', saveOneName);
userTwoButton.addEventListener('click', saveTwoName);

randomizeButton.addEventListener('click', randomizeOrder);

instructions.addEventListener('click', addInvis);

singlePlayerButton.addEventListener('click', playVsPC);