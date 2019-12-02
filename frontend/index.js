
let W = window.innerWidth - 10;
let H = window.innerHeight - 10;

let speed = 0.25, balls = [], initialBalls = 200;

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

canvas.width = W;
canvas.height = H;

function newBall(){
    for(let i=0; i<initialBalls; i++){
        balls.push(new Ball());
    }
}

newBall();

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);    
    // debugger;
    balls.forEach(ball => {
    
        ball.newX  = ball.radius * Math.cos(ball.angle * (Math.PI/180));
        ball.newY = ball.radius * Math.sin(ball.angle * (Math.PI/180));
        ball.x = ball.newX + ball.circleCenterX;
        ball.y = ball.newY + ball.circleCenterY;
        ball.angle += speed; 

        ctx.fillStyle = ball.color;
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.innerRadius, 0, Math.PI*2, false);
    
    /////////////////////////////////////////////
    //// To get a line attached at the top
        // ctx.moveTo( ball.x, ball.y);
        // ctx.lineTo( 1.2*ball.x, 0);
        // ctx.stroke();
        // ctx.strokeStyle = "#FFF";
    /////////////////////////////////////////////
        ctx.closePath();
        ctx.fill();
    });
    
    setTimeout(animate, 60);
}

function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function Ball(){
    this.innerRadius = 5;
    this.radius = Math.random()*(W/2) + 250;
    this.x = Math.random()*(W); //+ this.radius;
    this.y = Math.random()*(H); //+ 1.2*this.innerRadius;
    this.newX = 0;
    this.newY = 0;
    // this.angle = 0;
    this.color = getRandomColor();
    this.angle = Math.random()*360;
    // this.circleCenterX = Math.random()*(W-2*this.radius) + this.radius;
    // this.circleCenterY = Math.random()*(H-2*this.radius) + this.radius;
    this.circleCenterX = W/2;
    this.circleCenterY = H/2;
}
$(document).ready(function(){

    animate();   
    $(".btn").click(()=>{
      window.location.href = "details.html";
    })
})
