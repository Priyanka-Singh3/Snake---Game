
//game constants and variables
let board = document.getElementsByClassName('board')[0]
let inputDir = {x: 0, y: 0}
let highScoreBox = document.getElementsByClassName('highScore')[0]
let ScoreBox = document.getElementsByClassName('Score')[0]
const musicSound = new Audio('music/gamemusic.wav')
const gameOverSound = new Audio('music/gameover2.wav')
const moveSound = new Audio('music/move2.mp3')
const foodSound = new Audio('music/eat.mp3')

let speed = 9;
let lastPaintTime = 0;
let score = 0;

let a = 1;
let b = 17;
let snakeArr = [{x: Math.round(a + (b-a) * Math.random()), y: Math.round(a + (b-a) * Math.random())}]
// let food = {x: Math.round(a + (b-a) * Math.random()), y: Math.round(a + (b-a) * Math.random())};
let food;
do {
    food = {x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random())};
} while (food.x === snakeArr[0].x && food.y === snakeArr[0].y);

//game functions
function main(currTime) {
    window.requestAnimationFrame(main)
    if((currTime - lastPaintTime)/1000 < 1/speed) {
        return ;
    }
    // console.log(currTime)
    lastPaintTime = currTime
    gameEngine()
}
function isCollide(snakeArr) {
    for (let i = 1; i < snakeArr.length; i++) {
        if(snakeArr[0].x === snakeArr[i].x && snakeArr[0].y === snakeArr[i].y) {
            return true;
        }
    }
    if(snakeArr[0].x >= 18 || snakeArr[0].y >= 18 || snakeArr[0].y <= 0 || snakeArr[0].x <= 0) {
        return true;
    }
    return false;
}
function gameEngine() {
    //updation of snake array
    if(isCollide(snakeArr)) {
        
        showGameOverModal();
        inputDir = {x: 0, y: 0};
        snakeArr = [{x: 0, y: 0}]
        score = 0;
    }
    //eaten the food or not
    if(snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
        score = score + 10;
        if(score > highScoreVal) {
            highScoreVal = score
            localStorage.setItem("hscore", JSON.stringify(highScoreVal))
            highScoreBox.innerHTML = "High Score : " + highScoreVal
        }

        ScoreBox.innerHTML = "Score : " + score;
        // foodSound.play();
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y+ inputDir.y})
        // food = {x: Math.round(a + (b-a) * Math.random()), y: Math.round(a + (b-a) * Math.random())}
        do {
            food = {x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random())};
        } while (food.x === snakeArr[0].x && food.y === snakeArr[0].y);
    }

    //moving the snake
    for (let i = snakeArr.length-2; i >= 0; i--) {
        snakeArr[i+1] = {...snakeArr[i]} //otherwise there will be refernce problem
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    board.innerHTML = ""
    //display snake and food

    //display snake
    snakeArr.forEach((e, index)=>{
        let snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0) {
            snakeElement.classList.add('head')
        }
        else {
            snakeElement.classList.add('snake')
        }
        board.appendChild(snakeElement);
    })

    //display food
    let foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);
    //render display the snake and food
}

// function showGameOverModal() {
//     const modal = document.getElementById('gameOverModal');
//     modal.style.display = 'flex';
//     gameOverSound.play();

//     // When the game over sound finishes playing, pause it and reset its time
//     gameOverSound.onended = function() {
//         gameOverSound.pause();
//         gameOverSound.currentTime = 0;
//     };
//     const restartButton = document.getElementById('restartButton');
//     restartButton.onclick = function() {
//         modal.style.display = 'none'; //this element will not occupy any place as it will not be visible
//         window.location.reload(); // Restart the game
//     }
// }
let gameOverPlayed = false; // Add a flag to track if the game over sound has been played

function showGameOverModal() {
    // Check if the game over sound has already been played
    if (!gameOverPlayed) {
        const modal = document.getElementById('gameOverModal');
        modal.style.display = 'flex';
        gameOverSound.play();

        // When the game over sound finishes playing, pause it and reset its time
        gameOverSound.onended = function() {
            gameOverSound.pause();
            gameOverSound.currentTime = 0;
        };

        gameOverPlayed = true; // Set the flag to true
    }

    const restartButton = document.getElementById('restartButton');
    restartButton.onclick = function() {
        const modal = document.getElementById('gameOverModal');
        modal.style.display = 'none'; // Hide the modal
        window.location.reload(); // Restart the game
    }
}
let hscore = localStorage.getItem("hscore")
let highScoreVal = 0;
if(hscore === null) {
    localStorage.setItem("hscore", JSON.stringify(highScoreVal))
}
else {
    highScoreVal = JSON.parse(hscore)
    highScoreBox.innerHTML = "High Score : " + highScoreVal
}
//game logic
window.requestAnimationFrame(main) 
window.addEventListener('keydown', e =>{
    inputDir = {x: 0, y: 1} //start the game
    moveSound.currentTime = 0;
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
})