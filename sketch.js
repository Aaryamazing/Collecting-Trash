var trah1, trash2, trash3;
var trashGroup;
var trashcan;
var danger;
var dangerGroup;
var score = 0;
var gameState = "play";
var gameOverImage, gameOver
var restartImage, restart

//Game States
var PLAY=1;
var END=0;
var gameState=1;

function preload() {
  trash1 = loadImage("trash1.png");
  trash2 = loadImage("trash2.png");
  trash3 = loadImage("trash3.png");
  trashcanImg = loadImage("trashcan.png")
  gameOverImage = loadImage("gameOver.png");
  restartImage = loadImage("restart.png");
  dangerImage = loadImage("danger.png")
  bg = loadImage("bg.png")
  
  checkpoint = loadSound("checkpoint.mp3");
  die = loadSound("die.mp3");
}

function setup() {
  createCanvas(600, 600);
  
  trashcan = createSprite(500,500,20,50);
  trashcan.addImage(trashcanImg)
  trashcan.setCollider('circle',0,0,20)
  //trashcan.debug = true 
  trashcan.scale = 2;

  gameOver = createSprite(300,200);
  gameOver.addImage(gameOverImage);
  
  restart = createSprite(300,300);
  restart.addImage(restartImage);
  
  gameOver.scale = 1;
  restart.scale = 1;

  gameOver.visible = false;
  restart.visible = false;

  trashGroup = new Group();
  dangerGroup = new Group();
   
  score = 0;
}

function draw() {
  //trex.debug = true;
  background(bg);
  textSize(30);
  fill("black")
  text("Score: "+ score,10,120);
  
  
  if (gameState===PLAY){

    trashcan.x = World.mouseX;
  
    spawnTrash();
    spawnDanger();

    if(trashcan.isTouching(trashGroup)){
      checkpoint.play()
      trashGroup.destroyEach()
      score+=1
    }
  
    if(trashcan.isTouching(dangerGroup) || trashGroup.y >= 600){
        die.play()
        gameState = END;
    }
  }
  if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;

    trashGroup.destroyEach();
    dangerGroup.destroyEach();

    if(keyDown("SPACE") || mousePressedOver(restart)) {      
      reset();
    }
  }
  
  
  drawSprites();
}
function spawnDanger(){
  if(frameCount % 200 === 0){
    var danger= createSprite(Math.round(random(50,550)),95,20,30)
    danger.addImage(dangerImage)
    //danger.debug = true
    danger.velocityY = +(6 + 3*score/100);
    dangerGroup.add(danger);
  }
}
function spawnTrash() {
  if(frameCount % 60 === 0) {
    var trash= createSprite(Math.round(random(50,550)),95,20,30);
    trash.setCollider('circle',0,0,40)
    //trash.debug = true
  
    trash.velocityY = +(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: trash.addImage(trash1);
              break;
      case 2: trash.addImage(trash2);
              break;
      case 3: trash.addImage(trash3);
              break;
      default: break;
    }
    //assign scale and lifetime to the obstacle           
    trash1.scale = 0.5;
    trash.lifetime = 300;
    //add each obstacle to the group
    trashGroup.add(trash);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  score = 0;
  
}
