// Game configuration and state variables
const GOAL_CANS = 25;        // Total items needed to collect
let currentCans = 0;         // Current number of items collected
let gameActive = false;      // Tracks if game is currently running
let spawnTimer;             // Holds the timer for spawning items
let countdownTimer; // Holds the countdown timer interval

//AUDIO
let dripSound = new Audio('audio/drip.wav');
let winSound = new Audio('audio/win.wav');
let loseSound = new Audio('audio/lose.wav');

// Set up click handler for the start button
document.getElementById('start-game').addEventListener('click', startGame);
document.getElementById('reset-game').addEventListener('click', resetGame);

//CREATED HELPER FUNCTION FOR INCREMENTING SCORE
let scoreCounter = document.getElementById('current-cans')
function incrementScore() {
  currentCans++;
  scoreCounter.textContent = currentCans;
  if (currentCans >= GOAL_CANS) {
    endGameWin();
  }
}



// Creates the 3x3 game grid where items will appear
function createGrid() {
  // Get the container element for the grid
  const grid = document.querySelector('.game-grid');
  // Clear any existing grid cells
  grid.innerHTML = '';
  // Create 9 cells (3x3 grid)
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.className = 'grid-cell';
    grid.appendChild(cell);
  }
}

// Spawns a new item in a random grid cell
function spawnWaterCan() {
  if (!gameActive) return;
  const cells = document.querySelectorAll('.grid-cell');
  
  // Clear any existing items from all cells
  for (let i = 0; i < cells.length; i++) {
    cells[i].innerHTML = '';
  }

  const randomCell = cells[Math.floor(Math.random() * cells.length)];
  
  // Create wrapper for proper positioning
  const wrapper = document.createElement('div');
  wrapper.className = 'water-can-wrapper';
  
  // Create the item element
  const waterCan = document.createElement('div');
  waterCan.className = 'water-can';
  
  // Add item to wrapper
  wrapper.appendChild(waterCan);
  
  // Add click handler to just remove the item
  wrapper.onclick = () => {
    if (gameActive) {
      // ADDED LOGIC TO INCREMENT SCORE AND PLAY SOUND EFFECT
      console.log('Can clicked');
      dripSound.play();
      incrementScore();
      dripSound.play();
      wrapper.remove();
  };
}
  
  // Add the wrapped item to the random cell
  randomCell.appendChild(wrapper);
}

// ADDED CODE TO GET THE TIMER
let timer = document.getElementById('timer');

// Get the reset button
const resetButton = document.getElementById('reset-game');

// Get the start button
const startButton = document.getElementById('start-game');

// Initializes and starts a new game
function startGame() {
  if (gameActive) return;
  gameActive = true;
  createGrid();
  spawnTimer = setInterval(spawnWaterCan, 1000);

  // Show the reset button and hide the start button
  resetButton.style.display = 'block';
  startButton.style.display = 'none';

  // Initialize countdown timer
  let timeLeft = 30;
  timer.textContent = timeLeft;
  countdownTimer = setInterval(() => {
    timeLeft--;
    timer.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(countdownTimer);
      endGameLose();
    }
  }, 1000);
}

// RESET GAME FUNCTION

function resetGame() {
  console.log('Resetting game...');
  gameActive = true;
  clearInterval(spawnTimer);
  clearInterval(countdownTimer); // Clear the countdown timer
  currentCans = 0;
  scoreCounter.textContent = currentCans;
  spawnTimer = setInterval(spawnWaterCan, 1000);
  // timer.textContent = '';
  // resetButton.style.display = 'none';
  // createGrid();
  // Initialize countdown timer
  let timeLeft = 30;
  timer.textContent = timeLeft;
  countdownTimer = setInterval(() => {
    timeLeft--;
    timer.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(countdownTimer);
      endGameLose();
    }
  }, 1000);
}

// UPDATED CODE SO THERE IS A LOSING VS WINNING OPTION
function endGameLose() {
  loseSound.play();
  gameActive = false;
  clearInterval(spawnTimer);
  clearInterval(countdownTimer); // Clear the countdown timer
  alert('Time is up! You lost the game.');
  // Hide the reset button
  startButton.style.display = 'none';
}

function endGameWin() {
  winSound.play();
  gameActive = false;
  clearInterval(spawnTimer);
  clearInterval(countdownTimer); // Clear the countdown timer
  alert('Congratulations! You completed the quest!');
  // Hide the reset button
  startButton.style.display = 'none';
}



// ADDITIONAL CODE

//Logic for user to click on the can and increment the score



