const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

class snakePart {
  constructor(x,y){
    this.x=x;
    this.y=y;
  }
}

let speed = 8;
let tileCount =20;
let tileSize = canvas.width/tileCount - 2 ;
let headX = 10;
let headY = 10;
let xVelocity = 0;
let yVelocity = 0;
let appleX =5;
let appleY =5;
let score =0;
const snakeParts = [];
let tailLength = 2;
const gameOverSound = new Audio("gameover.mp3");

const chompSound = new Audio("chomp.mp3");


//game loop
function drawGame(){
   
  changePositionSnake(); 

  let result = isGameOver();
  if(result==true){
    return;
  }
  clearScreen();
  
   collisionChecker();

   drawSnake();
   drawApple();
   drawScore();
   setTimeout(drawGame,1000/speed);
}

function isGameOver(){
  let gameOver = false;
  if (yVelocity===0 && xVelocity ===0){
    return false;
  }
  
  //walls
  if (headX<0){
    gameOver=true;
  }
  
else if(headX === tileCount){
  gameOver=true;
}
else if(headY <0){
  gameOver=true;
}
else if (headY===tileCount){
  gameOver=true;
}
for (let i=0 ; i<snakeParts.length; i++){
  let part = snakeParts[i];
  if (part.x === headX && part.y === headY){
    gameOver=true;
    break;
  }
}
   
if(gameOver){
  gameOverSound.play();
  
  ctx.font = "70px monospace"
  var gradient = ctx.createLinearGradient(0 ,0 , canvas.width ,0);
  gradient.addColorStop("0","magenta");
  gradient.addColorStop("0.5","blue");
  gradient.addColorStop("1.0","red");
  ctx.fillStyle=gradient;
  
ctx.fillText("Game Over!",canvas.width/20,canvas.height/2)



}
 
  /*if(gameOver==true){
ctx.fillStyle="white";
ctx.font = "70px monospace"
ctx.fillText("Game Over!",canvas.width/20,canvas.height/2)
}
 */
 
  return gameOver;

}



function clearScreen(){
  ctx.fillStyle="#c0c0c0";
  ctx.fillRect(0,0,canvas.width,canvas.height);
}

function drawSnake(){
  ctx.fillStyle="black";
  ctx.fillRect(headX*tileCount,headY*tileCount,tileSize,tileSize);

 ctx.fillStyle ="#d11d53";
 for(let i = 0 ; i<snakeParts.length ;i++){
  let part = snakeParts[i];
  ctx.fillRect(part.x*tileCount,part.y*tileCount,tileSize,tileSize)
 }

 snakeParts.push(new snakePart(headX,headY)); // add snake part
 while(snakeParts.length>tailLength){
  snakeParts.shift(); // remove snake part
 }


}
function changePositionSnake(){
  

  headX = headX + xVelocity;
  headY= headY + yVelocity;
  
  }
  
  function drawApple(){
    ctx.fillStyle="#2E8B57";
    ctx.fillRect(appleX*tileCount,appleY*tileCount,tileSize,tileSize);
  }

  function collisionChecker(){

    if(appleX == headX && appleY == headY){
       appleX = Math.floor(Math.random()*tileCount);
       appleY = Math.floor(Math.random()*tileCount);
       tailLength++;
       speed++;
      score++;
      chompSound.play();
    }
    
    
  }

  function drawScore(){
    ctx.fillStyle="white"
    ctx.font="20px monospace"
    ctx.fillText(`score: ${score}`,canvas.width-100,20);
  }
  
  document.body.addEventListener('keydown',keyDown);

function keyDown(event){
  //Up Arrow
  if(event.keyCode == 38){
    if(yVelocity==1)
    return;

    yVelocity = -1;
    xVelocity = 0; 
  }
  //Down Arrow
  if(event.keyCode == 40){

    if(yVelocity==-1)
    return;
    yVelocity=1;
    xVelocity=0;
  }
  //left Arrow
  if(event.keyCode == 37){

    if(xVelocity==1)
    return;

    yVelocity = 0;
    xVelocity = -1; 
  }
  //Right Arrow
  if(event.keyCode == 39){

    if(xVelocity==-1)
    return;
    yVelocity=0;
    xVelocity=1;
  }
  
  
}

function refreshpage(e){
  window.location.reload(); 

}

drawGame();



