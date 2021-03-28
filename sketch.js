var background, bg;
var balloon, balloonImage1, balloonImage2;
var database, height, balloonPosition;

function preload(){
   bg =loadImage("bg.jpg");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();

  createCanvas(1200,700);

  bground = createSprite(0, 350);
  bground.addImage("BG", bg);
  bground.x = bground.width/3;
  bground.scale = 2.1;

  //P = createSprite(45, 200, 50, 10);
  //P.velocityX = speed;
 // P.shapeColor = "PURPLE";

  balloon=createSprite(135, 480,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage2);
  balloon.scale=0.6;
  
  balloonPosition = database.ref('balloon/height');
  balloonPosition.on("value", readPosition, showError);
}

// function to display UI
function draw() {
  background("#76D6FE");
  console.log(balloon.x);

  if (height !== undefined){

    if(keyDown(LEFT_ARROW)){
      writePosition(-5,0);
    } 
    else if(keyDown(RIGHT_ARROW)){
      writePosition(5,0);
    } 
    else if(keyDown(UP_ARROW)){
      writePosition(0,-10);
      balloon.scale = balloon.scale -0.005;
    } 
    else if(keyDown(DOWN_ARROW)){
      writePosition(0,+10);
      balloon.scale = balloon.scale +0.005;
    }
  }

  bground.velocityX = -4;

  if (bground.x < 0) {
    bground.x = bground.width / 2;
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}

function writePosition(x,y){
  database.ref('balloon/height').set({
    'x' : height.x + x,
    'y' :height.y + y
  })
}

function readPosition(data){
  height = data.val();
  balloon.x = height.x ;
  balloon.y = height.y ;
}

function showError(){
  console.log("Error");
}

//hasCollided function
/*function hasCollided(LP, Lwall){

  PRightEdge=LP.x + LP.width;
  wallLeftEdge = Lwall.x;
  
  if(PRightEdge>=wallLeftEdge){
    return true;
  }  
    return false;
  }*/