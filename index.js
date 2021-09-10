"use strict";
let canvas;
let ctx;
let ball;
let secondsPassed = 0;
let oldTimeStamp = 0;
const canvasWidth = 900;
const canvasHeight = 500;
const restitution = 0.5;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvasWidth - paddleWidth) / 2;
var rightPressed = false;
var leftPressed = false;
const active = true;
let bricksObject = [];
let rowBrick = 3;
let columnBrick = 5;
let brickObject = [];
let brickObject2d = []

window.onload = init;

function init() {
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");
    ball = new Ball(ctx, 400, 300, 120, -150, "#0095DD", 10)
    ball.draw()
    createBricks()
    document.addEventListener("keydown", keyDownHandle, false);
    document.addEventListener("keyup", keyUpHandle, false);
    window.requestAnimationFrame(gameLoop);

}

function collisionDetection() {
    for (var c = 0; c < columnBrick; c++) {
        for (var r = 0; r < rowBrick; r++) {
            let obj = brickObject[c][r];
            console.log(ball.x)
            console.log(ball.y)
            console.log(obj.brickX)
            console.log(obj.brickY)
            if (obj.isLive) {
                if (ball.x > obj.brickX && ball.x < obj.brickX + obj.width && ball.y > obj.brickY && ball.y < obj.y + obj.height) {
                    ball.vy = -ball.vy;
                    obj.setHide();
                }
            }
        }
    }
}

function drawBricks() {
    for (var c = 0; c < columnBrick; c++) {
        for (var r = 0; r < rowBrick; r++) {
            brickObject[c][r].draw();
        }
    }
}


function createBricks() {
    for (var c = 0; c < columnBrick; c++) {
        brickObject[c] = [];
        for (var r = 0; r < rowBrick; r++) {
            // brickObject.push(new Brick(ctx, c, r))
            brickObject[c][r] = new Brick(ctx, c, r)
        }
    }

    // while (brickObject.length) {
    //     brickObject2d.push(brickObject.splice(0, 3))
    // }
}

function keyDownHandle(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandle(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }


}

function drawPaddle() {
    ctx.beginPath()
    ctx.rect(paddleX, canvasHeight - paddleHeight - 5, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath()
}

function movePaddle() {
    if (rightPressed) {
        paddleX += 5;
        if (paddleX + paddleWidth > canvas.width) {
            paddleX = canvas.width - paddleWidth - 2;
        }
    } else if (leftPressed) {
        paddleX -= 5;
        if (paddleX < 0) {
            paddleX = 2;
        }
    }
}

function gameLoop(timeStamp) {
    if (active) {
        secondsPassed = (timeStamp - oldTimeStamp) / 1000;
        oldTimeStamp = timeStamp;
        ball.update(secondsPassed);
        detectEdgeCollisions()
        collisionDetection()
        ball.clearCanvas();
        ball.draw();
        drawPaddle()
        movePaddle()
        drawBricks()
        window.requestAnimationFrame(gameLoop);
    }

}

function detectEdgeCollisions() {

    // Check for left right
    if (ball.x < ball.rad) {
        ball.vx = -ball.vx;
        ball.x = ball.rad;
    } else if (ball.x > canvasWidth - ball.rad) {
        ball.vx = -ball.vx;
        ball.x = canvasWidth - ball.rad;
    }

    // Check for bottom and top
    if (ball.y < ball.rad) {
        ball.vy = -ball.vy;
        ball.y = ball.rad;
    } else if (ball.y > canvasHeight - ball.rad - paddleHeight - 5) {
        if (ball.x > paddleX && ball.x < paddleX + paddleWidth + (ball.rad / 2)) {
            ball.vy = -ball.vy;
        } else {
            alert("GAME OVER");
            document.location.reload();
            active = false;
        }
    }
}
class Brick {
    constructor(context, x, y, padding = 10, width = 100, height = 50, setTop = 30, setLeft = 30, isLive = true) {
        this.context = context;
        this.x = x;
        this.y = y;
        this.padding = padding;
        this.width = width;
        this.height = height;
        this.setTop = setTop;
        this.setLeft = setLeft;
        this.isLive = isLive;
        this.brickX = (this.x * (this.width + this.padding)) + this.setLeft;
        this.brickY = (this.y * (this.height + this.padding)) + this.setTop;
    }
    draw() {
        if (this.isLive) {
            this.context.beginPath();
            this.context.rect(this.brickX, this.brickY, this.width, this.height);
            this.context.fillStyle = "#0095DD";
            this.context.fill();
            this.context.closePath();

        }
    }
    setHide() {
        this.isLive = false;
    }
}

class GameObject {
    constructor(context, x, y, vx, vy, color) {
        this.context = context;
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.color = color;
    }
}
class Ball extends GameObject {
    constructor(context, x, y, vx, vy, color, rad) {
        super(context, x, y, vx, vy, color)
        this.w = 50;
        this.h = 50;
        this.rad = rad;

    }

    draw() {
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.rad, 0, 2 * Math.PI);
        this.context.fillStyle = this.color;
        this.context.fill();
    }
    update(secondsPassed) {
        this.x += this.vx * secondsPassed;
        this.y += this.vy * secondsPassed;
    }
    clearCanvas() {
        this.context.clearRect(0, 0, canvas.width, canvas.height);
    }
}