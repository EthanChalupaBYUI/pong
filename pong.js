const canvas = document.getElementById("pongCanvas")
const scrn = canvas.getContext("2d")

const p1up = "w"
const p1down = "s"

const p2up = "i"
const p2down = "k"

let p1PressingUp = false
let p1PressingDown = false

let p2PressingUp = false
let p2PressingDown = false


//Paddle properties
const pHeight = 100
const pWidth = 5
const pSpeed = 10

//Paddle position
// start paddle at midway though the screen accounting for paddle size.
let ply = canvas.height/2 - pHeight/2
let plx = 0
let pry = canvas.height/2 - pHeight/2
let prx = canvas.width - pWidth

//Ball properties
const bSize = 10
const bSpeedX = 20
const bSpeedY = 20

//Ball position
let bPosX = canvas.width / 2
let bPosY = canvas.height / 2

//ball velocity
let bVelX = 0
let bVelY = 0


//scores
let p1Score = 0
let p2Score = 0


//* Get user inputs

canvas.addEventListener("keydown", (e) => {
    if (e.key == p1up) {
        if(ply > 0){
            ply -= pSpeed
        }
    } else if (e.key == p1down) {
        if(ply < canvas.height- pHeight)
        ply += pSpeed
    }

    if (e.key == p2up) {
        if(pry > 0){
            pry -= pSpeed
        }
    } else if (e.key == p2down) {
        if(pry < canvas.height- pHeight)
        pry += pSpeed
    }

    if (e.key == " ") {
        startBall()
    }
});

canvas.addEventListener("keyup", (e) => {
    if (e.key === p1up) {
        p1PressingUp = false;
    } else if (e.key === p1down) {
        p1PressingDown = false;
    }

    if (e.key === p2up) {
        p2PressingUp = false;
    } else if (e.key === p2down) {
        p2PressingDown = false;
    }
});


//* Draw Functions

function drawPaddles(){
    //set the color for the fills
    scrn.fillStyle = "#ffffff"

    //set the left paddle on the left of the canvas
    scrn.fillRect(plx, ply, pWidth, pHeight)
    //draw the right paddle on the right, accounting for its width
    scrn.fillRect(prx, pry, pWidth, pHeight)
}

function drawBall(){
    scrn.fillSytle = "#000000"

    scrn.fillRect(bPosX, bPosY, bSize, bSize)
}

function updateScore(){
    document.getElementById("p1Score").innerHTML = p1Score
    document.getElementById("p2Score").innerHTML = p2Score
}


//* Collision Functions

function paddleCollision(){
    if(bPosX == plx){
        if(bPosY < ply + pHeight && bPosY > ply){
            bVelX = -bVelX
            bVelY += Math.random()
        }
    }

    if(bPosX == prx - bSize/2){
        if(bPosY < pry + pHeight && bPosY > pry){
            bVelX = -bVelX
            bVelY += Math.random()
        }
    }
}

function xWallCollision(){
    if(bPosX > canvas.width-bSize && bVelX != 0){
        bVelX = 0
        bVelY = 0
        p1Score +=1

    } else if(bPosX < 0 && bVelX != 0){
        bVelX = 0
        bVelY = 0
        p2Score += 1
    }
}

function yWallCollision(){
    if(bPosY > canvas.height || bPosY < 0){
        bVelY = -bVelY
    }
}


//* Position updates

function startBall(){
    let seedX = 0
    let seedY = 0

    //start the ball
    if(bVelX == 0 && bVelY == 0){

        bPosX = canvas.width/2
        bPosY = canvas.height/2

        seedX = Math.floor(Math.random() * 11)
        if(seedX > 5){
            bVelX = 1
        }else{
            bVelX = -1
        }
    
        seedY = Math.floor(Math.random() * 11)
        if(seedY > 5){
            bVelY = 1
        }else{
            bVelY = -1
        }
    

    }
}

function ballUpdate(){
    xWallCollision()
    yWallCollision()
    paddleCollision()

    bPosX += bVelX
    bPosY += bVelY
}


//* Main functions 

function draw(){
    scrn.clearRect(0, 0, canvas.width, canvas.height);
    drawPaddles()
    drawBall()
}


function main(){
    ballUpdate()
    updateScore()
    draw()
    requestAnimationFrame(main)
}

requestAnimationFrame(main)

