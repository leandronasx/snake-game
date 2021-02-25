let canvasGame = document.getElementById("frame-game");
let frameGame = canvasGame.getContext("2d");
let box = 32;
let snake = [];
let direction = "right";
snake[0] = {
    x: 8*box,
    y: 8*box
}
let food = {
    x: Math.floor(Math.random()*15 + 1) * box,
    y: Math.floor(Math.random()*15 + 1) * box
};

// Funções 
function criarBG() {
    frameGame.fillStyle = "cornflowerblue";
    frameGame.fillRect(0, 0, 16*box, 16*box);
}

function criarSnake(){
    for(let i=0; i<snake.length; i++){
        frameGame.fillStyle = "green";
        frameGame.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawFood(){
    frameGame.fillStyle = "red";
    frameGame.fillRect(food.x, food.y, box, box);
}

document.addEventListener("keydown", function(tecla){
    if(tecla.keyCode == 37 && direction != "right") direction = "left";
    if(tecla.keyCode == 38 && direction != "down") direction = "up";
    if(tecla.keyCode == 39 && direction != "left") direction = "right";
    if(tecla.keyCode == 40 && direction != "up") direction = "down";
});

function iniciarGame(){
    criarBG();
    criarSnake();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    for(let i = 1; i<snake.length; i++){
        if(snakeX == snake[i].x && snakeY == snake[i].y){
            clearInterval(jogo);
            alert("Game Over :(");
        }
    }

    if(snakeX == 0 && direction == "left") snakeX = 16*box;
    if(snakeX > 15*box && direction == "right")snakeX = 0;
    if(snakeY < 0 && direction == "up") snakeY = 16*box;
    if(snakeY > 15*box && direction == "down") snakeY = 0;

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    if(snakeX != food.x || snakeY != food.y){
        snake.pop();
    }else{
        food.x = Math.floor(Math.random()*15 + 1) * box;
        food.y = Math.floor(Math.random()*15 + 1) * box;
    }

    let nexHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(nexHead);
}


// Chamada
// função de tempo 
let jogo = setInterval(iniciarGame, 100);
