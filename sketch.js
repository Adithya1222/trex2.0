var trex, trex_running, edges, clouds, score, gameState
var groundImage, groundImage2, gI3, cloudsImg, cloudGroups, cactus, cactusImg, cactusImg2, cactusImg3, cactusImg4, cacttisImg5, cactusImg6, gameOverImg, restartImg, gameOver, restart, die, Jump,
  checkPoint,trexColide
gameState = "play"


function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trexColide=loadImage("trex_collided.png")
  groundImage = loadImage("ground2.png")
  cloudsImg = loadImage("cloud.png")
  cactusImg = loadImage("obstacle1.png")
  cactusImg2 = loadImage("obstacle2.png")
  cactusImg3 = loadImage("obstacle3.png")
  cactusImg4 = loadImage("obstacle4.png")
  cactusImg5 = loadImage("obstacle5.png")
  cactusImg6 = loadImage("obstacle6.png")
  gameOverImg = loadImage("gameOver.png")
  restartImg = loadImage("restart.png")
  jump = loadSound("jump.mp3")
  checkPoint = loadSound("checkPoint.mp3")
  die = loadSound("die.mp3")
}

function setup() {
  createCanvas(600, 300);

  // creating trex
  trex = createSprite(50, 160, 20, 50);
  trex.addAnimation("running", trex_running);
  groundImage2 = createSprite(45, 200, 80, 10);
  gI3 = createSprite(30, 210, 80, 5);
  score = 0
  gameOver = createSprite(300, 100, 10, 10)
  restart = createSprite(300.140, 10, 10)
  gameOver.addImage(gameOverImg)
  restart.addImage(restartImg)
  trex.addAnimation("colided",trexColide)

  groundImage2.addAnimation("image", groundImage)
  groundImage2.x = groundImage2.width / 2
  edges = createEdgeSprites();
  gI3.visible = false

  //adding scale and position to trex
  trex.scale = 0.5;
  trex.x = 50
  cloudGroups = new Group();
  cactusGroups = new Group();
  trex.setCollider("circle", 0, 0, 40);
  trex.debug = true;
}


function draw() {
  //set background color 
  background("white");
  text("score" + score, 200, 200)


  //logging the y position of the trex
  //console.log(trex.y)
  if (gameState === "play") {
    groundImage2.velocityX = -4
    gameOver.visible=false
    restart.visible=false
    
    score = score + Math.round(frameCount / 60);
    if (score > 0 && score % 100 === 0) {
      checkPoint.play();  

    }
    if (groundImage2.x < 0) {
      groundImage2.x = groundImage2.width / 2
    }
    //jump when space key is pressed
    if (keyDown("space") && trex.y >= 160) {
      trex.velocityY = -10;
      jump.play();
    }



    trex.velocityY = trex.velocityY + 0.5;
    spawnClouds();
    spawnCactus();

    if (cactusGroups.isTouching(trex)) {
      gameState = "end"
      die.play();
    }


  } else if (gameState === "end") {
    groundImage2.velocityX = 0
    trex.velocityY = 0
    cactusGroups.setLifetimeEach(-1);
    cloudGroups.setLifetimeEach(-1);
    cactusGroups.setVelocityXEach(0);
    
    cloudGroups.setVelocityXEach(0);
  }


  //stop trex from falling down
  trex.collide(gI3)
  console.log(frameCount)
  spawnClouds();
  spawnCactus();
if (mousePressedOver (restart)) {
  
  reset();
}
  drawSprites();

  console.log("hello" + "world")
}

function spawnClouds() {
  if (frameCount % 60 === 0) {
    clouds = createSprite(600, 50, 80, 10)
    clouds.addImage(cloudsImg)
    clouds.velocityX = -5
    clouds.y = Math.round(random(0, 50))
    clouds.lifetime = -120
    clouds.depth = trex.depth
    trex.depth = trex.depth + 1
    cloudGroups.add(clouds)
  }




}

function spawnCactus() {
  if (frameCount % 60 === 0) {
    cactus = createSprite(600, 165, 20, 40)
    cactus.velocityX = -20
    var cactusRandomizer = Math.round(random(1, 6))
    cactus.lifetime = 30
    switch (cactusRandomizer) {
      case 1:
        cactus.addImage(cactusImg);
        break;
      case 2:
        cactus.addImage(cactusImg2);
        break;
      case 3:
        cactus.addImage(cactusImg3);
        break;
      case 4:
        cactus.addImage(cactusImg4)
        break;
      case 5:
        cactus.addImage(cactusImg5)
        break;
      case 6:
        cactus.addImage(cactusImg6)
        break;
      default:
        break;


    }
    cactusGroups.add(cactus)
    
  }


}
function reset () {
  gameState="play"
 gameOver.visible=true
restart.visible=true 
 cloudGroups.destroyEach();
 cactusGroups.destroyEach();
  trex.changeAnimation("running",trex_running)
  score= 0
  }