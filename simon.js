const colorButtons = {
    green: document.getElementById('green'),
    red: document.getElementById('red'),
    yellow: document.getElementById('yellow'),
    blue: document.getElementById('blue')
};

const startButton = document.getElementById('start-button');
const message = document.getElementById('message');

let sequence = [];
let playerSequence = [];
let level = 0;
let isPlayerTurn = false;

function flash(color) {
    colorButtons[color].style.opacity = 1;
    setTimeout(() => {
        colorButtons[color].style.opacity = 0.8;
    }, 500);
}

function playSequence() {
    isPlayerTurn = false;
    let delay = 1000;

    sequence.forEach((color, index) => {
        setTimeout(() => {
            flash(color);
            if (index === sequence.length - 1) {
                setTimeout(() => {
                    isPlayerTurn = true;
                    message.textContent = 'Your turn!';
                }, delay);
            }
        }, delay * index);
    });
}

function nextRound() {
    const colors = ['green', 'red', 'yellow', 'blue'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    sequence.push(randomColor);
    playerSequence = [];
    message.textContent = `Level ${++level}`;
    playSequence();
}

function checkPlayerMove() {
    const lastMoveIndex = playerSequence.length - 1;
    if (playerSequence[lastMoveIndex] !== sequence[lastMoveIndex]) {
        message.textContent = 'Game Over! Try again!';
        resetGame();
        return;
    }

    if (playerSequence.length === sequence.length) {
        message.textContent = 'Good job! Next round...';
        setTimeout(nextRound, 1000);
    }
}

function resetGame() {
    sequence = [];
    playerSequence = [];
    level = 0;
    isPlayerTurn = false;
}

function handlePlayerClick(color) {
    if (!isPlayerTurn) return;
    
    flash(color);
    playerSequence.push(color);
    checkPlayerMove();
}

startButton.addEventListener('click', nextRound);

Object.keys(colorButtons).forEach(color => {
    colorButtons[color].addEventListener('click', () => handlePlayerClick(color));
});
