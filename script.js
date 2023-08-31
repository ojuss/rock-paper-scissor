let score = JSON.parse(localStorage.getItem('score'))||{
  wins: 0,
  losses: 0,
  ties: 0
};

updateScore();

let result = '';
let userMove = '';
let compMove ='';

function decideMove () {
  const randomNum = Math.random();

  if (randomNum >=0 && randomNum < 1/3 ) {
    compMove = 'rock';
  } else if (randomNum >= 1/3 && randomNum < 2/3) {
    compMove = 'paper';
  } else if (randomNum >= 2/3 && randomNum < 1) {
    compMove = 'scissors';
  }
}

function gamePlay (compMove, userMove) {

  decideMove();

  if (compMove === userMove) {
    result = 'Tie.'
  }

  else if (compMove === 'rock' && userMove === 'paper') {
    result = 'You win.';
  }

  else if (compMove === 'paper' && userMove === 'scissors') {
    result = 'You win.';
  }

  else if (compMove === 'scissors' && userMove === 'rock') {
    result = 'You win.';
  }

  else if (compMove === 'paper' && userMove === 'rock') {
    result = 'You lose.';
  }

  else if (compMove === 'scissors' && userMove === 'paper') {
    result = 'You lose.';
  }

  else if (compMove === 'rock' && userMove === 'scissors') {
    result = 'You lose.';
  }

  if(result === 'You win.') {
    score.wins++;
  } else if (result === 'You lose.') {
    score.losses++;
  } else if (result === 'Tie.'){
    score.ties++;
  }

  localStorage.setItem('score', JSON.stringify(score));

  document.querySelector('.js-moves').innerHTML = `You
    <img src="emojis/${userMove}-emoji.png" class="moves-icon">
    <img src="emojis/${compMove}-emoji.png" class="moves-icon">
    Computer`;

  document.querySelector('.js-result').innerHTML = result;

  updateScore();
}

function updateScore () {
  document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}