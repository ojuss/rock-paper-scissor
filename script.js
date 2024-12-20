let score = JSON.parse(localStorage.getItem('score'))||{
  wins: 0,
  losses: 0,
  ties: 0
};

updateScore();


let isAutoPlaying = false;
let autoPlayInterval;

function autoPlay() {
  if (isAutoPlaying) {
    clearInterval(autoPlayInterval);
  } else {
    autoPlayInterval = setInterval(() => {
      const moves = ['rock', 'paper', 'scissors'];
      const randomMove = moves[Math.floor(Math.random() * moves.length)];
      gamePlay(randomMove);
    }, 1000); // Adjust the interval time as needed
  }
}

document.querySelector('.js-rock-button').addEventListener('click', () => {
  gamePlay('rock');
});

document.querySelector('.js-paper-button').addEventListener('click', () => {
  gamePlay('paper');
});

document.querySelector('.js-scissors-button').addEventListener('click', () => {
  gamePlay('scissors');
});

document.querySelector('.reset-button').addEventListener('click', () => {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScore();
});

document.querySelector('.autoplay-button').addEventListener('click', () => {
  autoPlay();
  isAutoPlaying = !isAutoPlaying; 
  if (isAutoPlaying) {
    document.querySelector('.autoplay-button').innerHTML = `Stop AutoPlay`;
  } else {
    document.querySelector('.autoplay-button').innerHTML = `AutoPlay`;
  }
});

document.body.addEventListener('keydown', (event) => {
  if(event.key === 'r') {
    gamePlay('rock');
  } else if (event.key==='p') {
    gamePlay('paper');
  } else if (event.key=== 's') {
    gamePlay('scissors');
  }
})

function gamePlay (userMove) {

  const compMove = decideMove();
  let result = '';


  if (userMove === 'scissors') {
    if (compMove === 'rock') {
      result = 'You lose.';
    } else if (compMove === 'paper') {
      result = 'You win.';
    } else if (compMove === 'scissors') {
      result = 'Tie.';
    }

  } else if (userMove === 'paper') {
    if (compMove === 'rock') {
      result = 'You win.';
    } else if (compMove === 'paper') {
      result = 'Tie.';
    } else if (compMove === 'scissors') {
      result = 'You lose.';
    }
    
  } else if (userMove === 'rock') {
    if (compMove === 'rock') {
      result = 'Tie.';
    } else if (compMove === 'paper') {
      result = 'You lose.';
    } else if (compMove === 'scissors') {
      result = 'You win.';
    }
  }

  if (result === 'You win.') {
    score.wins += 1;
  } else if (result === 'You lose.') {
    score.losses += 1;
  } else if (result === 'Tie.') {
    score.ties += 1;
  }

  localStorage.setItem('score', JSON.stringify(score));

  updateScore();

  document.querySelector('.js-moves').innerHTML = `You
    <img src="emojis/${userMove}-emoji.png" class="moves-icon">
    <img src="emojis/${compMove}-emoji.png" class="moves-icon">
    Computer`;

  document.querySelector('.js-result').innerHTML = result;
}

function updateScore () {
  document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function decideMove () {
  const randomNum = Math.random();

  let computerMove = '';

  if (randomNum >=0 && randomNum < 1/3 ) {
    computerMove = 'rock';
  } else if (randomNum >= 1/3 && randomNum < 2/3) {
    computerMove = 'paper';
  } else if (randomNum >= 2/3 && randomNum < 1) {
    computerMove = 'scissors';
  }

  return computerMove;
}