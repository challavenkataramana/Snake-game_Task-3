const canvas = document.getElementById("gameborder");
const ct = canvas.getContext("2d");

const gridSize = 20;
const canvasSize = canvas.width;
let snake ;
let direction;
let food;
let gameInterval;
let score = 0;

document.addEventListener("keydown", function (event) {
    if (event.key == "ArrowUp" && direction.y === 0) {
        direction = { x: 0, y: -gridSize }
    }
    else if (event.key == "ArrowDown" && direction.y === 0) {
        direction = { x: 0, y: gridSize }
    }
    else if (event.key == "ArrowRight" && direction.x === 0) {
        direction = { x: gridSize, y: 0 }
    }
    else if (event.key == "ArrowLeft" && direction.x === 0) {
        direction = { x: -gridSize, y: 0 }
    }
});

let startX, startY;

canvas.addEventListener('touchstart', function(event) {
    const touch = event.touches[0];
    startX = touch.clientX;
    startY = touch.clientY;
});

canvas.addEventListener('touchend', function(event) {
    const touch = event.changedTouches[0];
    const endX = touch.clientX;
    const endY = touch.clientY;

    const diffX = endX - startX;
    const diffY = endY - startY;

    if (Math.abs(diffX) > Math.abs(diffY)) { 
        if (diffX > 0 && direction.x === 0) {
            direction = { x: gridSize, y: 0 }; 
        } else if (diffX < 0 && direction.x === 0) {
            direction = { x: -gridSize, y: 0 };
        }
    } else { 
        if (diffY > 0 && direction.y === 0) {
            direction = { x: 0, y: gridSize }; 
        } else if (diffY < 0 && direction.y === 0) {
            direction = { x: 0, y: -gridSize };
        }
    }
});

function draw() {

    const newHead = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    if (
        newHead.x < 0 || newHead.x >= canvasSize || newHead.y < 0 || newHead.y >= canvasSize ||
        snake.some((part) => part.x === newHead.x && part.y === newHead.y)
    ) {
        clearInterval(gameInterval);
        if (confirm("Your Game Over Friend! Your score is: " + score + ". Do you want to play again?")) {
            restartGame();  
        }
        return;
    }
    snake.unshift(newHead);
    if (newHead.x === food.x && newHead.y === food.y) {
        score++;
        food = generateFood();
    } else {
        snake.pop();
    }

    ct.clearRect(0, 0, canvasSize, canvasSize);

    snake.forEach((part) => {
        ct.fillStyle = "green";
        ct.fillRect(part.x, part.y, gridSize, gridSize);
    });

    ct.fillStyle = "red";
    ct.fillRect(food.x, food.y, gridSize, gridSize);
}

function startGame() {
    snake = [{ x: gridSize * 5, y: gridSize * 5 }];  
    direction = { x: gridSize, y: 0 };              
    score = 0;                                      
    food = generateFood();                         

    gameInterval = setInterval(draw, 250);           
}

function restartGame() {
    clearInterval(gameInterval);   
    startGame();              
}

document.getElementById("start").addEventListener("click", function() {
    startGame(); 
});


function generateFood() {
    let newFood;
    while (true) {
        newFood = {
            x: Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize,
            y: Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize
        };
        if (!snake.some(part => part.x === newFood.x && part.y === newFood.y)) {
            break;
        }
    }
    return newFood;
}
