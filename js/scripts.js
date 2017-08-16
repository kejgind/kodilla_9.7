// scripts js

var newGameBtn = document.getElementById('js-newGameButton');

newGameBtn.addEventListener('click', newGame);

var pickRock = document.getElementById('js-playerPick_rock');
var pickPaper = document.getElementById('js-playerPick_paper');
var pickScissors = document.getElementById('js-playerPick_scissors');

pickRock.addEventListener('click', function () {
  playerPick('rock');
});
pickPaper.addEventListener('click', function () {
  playerPick('paper');
});
pickScissors.addEventListener('click', function () {
  playerPick('scissors');
});

var gameState = 'notStarted'; // started // ended
var player = {
  name: '',
  score: ''
};
var computer = {
  score: ''
};

var newGameElem = document.getElementById('js-newGameElement');
var pickElem = document.getElementById('js-playerPickElement');
var resultsElem = document.getElementById('js-resultsTableElement');

function setGameElements () {
  switch (gameState) {
    case 'started':
      newGameElem.style.display = 'none';
      pickElem.style.display = 'block';
      resultsElem.style.display = 'block';
      break;
    case 'ended':
      newGameBtn.innerText = 'Jeszcze raz';
    case 'notStarted':
    default:
      newGameElem.style.display = 'block';
      pickElem.style.display = 'none';
      resultsElem.style.display = 'none';
  }
}

setGameElements();

var playerPointsElem = document.getElementById('js-playerPoints');
var playerNameElem = document.getElementById('js-playerName');
var computerPointsElem = document.getElementById('js-computerPoints');

function newGame () {
  player.name = prompt('Please enter your name', 'imię gracza');
  if (player.name) {
    player.score = computer.score = 0;
    playerPickElem.innerHTML = 'Player Selection';
    computerPickElem.innerHTML = 'Computer Selection';
    playerResultElem.innerHTML = 'Player Score';
    computerResultElem.innerHTML = 'Computer Score';
    gameState = 'started';
    setGameElements();
    playerNameElem.innerHTML = player.name;
    setGamePoints();
  }
}

function getComputerPick () {
  var possiblePicks = ['rock', 'paper', 'scissors'];
  return possiblePicks[Math.floor(Math.random() * 3)];
}

var playerPickElem = document.getElementById('js-playerPick');
var computerPickElem = document.getElementById('js-computerPick');
var playerResultElem = document.getElementById('js-playerResult');
var computerResultElem = document.getElementById('js-computerResult');

function playerPick (playerPick) {
  var computerPick = getComputerPick();
  playerPickElem.innerHTML = playerPick;
  computerPickElem.innerHTML = computerPick;
  console.log(playerPick, computerPick);
  checkRoundWinner(playerPick, computerPick);
}

function checkRoundWinner (playerPick, computerPick) {
  playerResultElem.innerHTML = computerResultElem.innerHTML = '';
  var winnerIs = 'player';
  if (playerPick === computerPick) {
    winnerIs = 'noone'; // remis
  } else if (
      (computerPick === 'rock' && playerPick === 'scissors') ||
      (computerPick === 'scissors' && playerPick === 'paper') ||
      (computerPick === 'paper' && playerPick === 'rock')) {
    winnerIs = 'computer';
  }
  if (winnerIs === 'player') {
    playerResultElem.innerHTML = 'Win!';
    player.score++;
  } else if (winnerIs === 'computer') {
    computerResultElem.innerHTML = 'Win!';
    computer.score++;
  }
  setGamePoints();
  checkGameWinner();
  console.log(winnerIs);
  console.log(player.score, computer.score);
}

function setGamePoints () {
  playerPointsElem.innerHTML = player.score;
  computerPointsElem.innerHTML = computer.score;
}

function checkGameWinner () {
  if (player.score === 10) {
    alert('You\'ve Won -> ' + player.name + ' ' + player.score + ' : ' + computer.score + ' Computer');
    gameState = 'ended';
  } else if (computer.score === 10) {
    alert('You\'ve Lost -> ' + player.name + ' ' + player.score + ' : ' + computer.score + ' Computer');
    gameState = 'ended';
  }
}
