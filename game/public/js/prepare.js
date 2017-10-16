// Author: Dorian Cauwe

var platformMan = new platformCreator();

function prepare(){ //initialize
  $(window).resize(function(){ //resize canvas on window resize
    gameCanvas.width = $(window).width();
    gameCanvas.height = $(window).height();
  });
  $(window).resize(); //set initial canvas size by firing event
  
  var obstacles = [];
  
  var myPlayer = new player();
  var myGame = new game();
  
  var points = []
  
  var playerPosX = 0;
  var playerPosY = 100;
  
  var playerVelocityX = myPlayer.velocityX;
  var playerGravityY = myGame.gravity;

  var lastMove = 0; //track when last move happened so that we are not constantly using curves

  var moveDirection = [0, 0];
  var moveCount = 0;

  var pointState = 1; //point state 1:solid, 0: teleport point
  
  var chosenElements = ["s", "p", "f"]

  for (var x=1; x<200; x++){

    if (moveCount == 0){
      playerPosX += playerVelocityX;
      playerVelocityX += myPlayer.velocityXAdd;

      playerPosY += myPlayer.velocityY;
      playerPosY += playerGravityY;
      playerGravityY += myGame.gravityVel;
    } else {
      playerPosX += moveDirection[0];
      playerPosY += moveDirection[1];

      moveCount -= 1;
    }

    if (playerPosY < 50){
      playerGravityY += 5;
    }
    
    if (Math.floor(Math.random()*($(window).height()*0.75-playerPosY)) < 35 && //D probability (gets more likely near death line)
        (lastMove > 10 || (playerGravityY > 0 && ($(window).height()*0.75-playerPosY < 100))) && // so that we are not doing too often
        Math.abs(playerGravityY) > 20){ //make sure there are no flat curves

      playerGravityY *= -1; //D-curve results in bounce
      lastMove = 0;
      pointState = 1;
      chosenElements.push("d");

    } else if (Math.abs(playerGravityY) < 10 && // s probability
        Math.floor(Math.random()*20) == 1 &&
        lastMove > 10){

      lastMove = Math.floor(Math.random()*7) + 1;
      moveDirection = [15, 0];
      moveCount = 10;
      pointState = 1;
      chosenElements.push("s");

    } else if (Math.abs(playerGravityY) < 10 && // P probability
        Math.floor(Math.random()*30) == 1 &&
        lastMove > 20) {

      lastMove = Math.floor(Math.random()*7) + 1;

      moveDirection = [15, 0];
      moveCount = 10;
      pointState = 0;
      chosenElements.push("p");
    } 

    lastMove += 1;
    
    points.push([playerPosX, playerPosY, pointState]);
  } 

  var pointCount = Math.floor(points.length/10);

  while (obstacles.length < 10){
    var chosenPoint = points[pointCount];
    if (chosenPoint[2] == 1){
        //alert("normal");
        obstacles.push(new obstacle(chosenPoint[0]-5, 0, chosenPoint[0]+5, chosenPoint[1]-50, chosenPoint[0]-5, chosenPoint[1]+50, chosenPoint[0]+5, $(window).height()));
    } else {
        obstacles.push(new obstacle(chosenPoint[0]-5, 0, chosenPoint[0]+5, $(window).height()));
    }

    pointCount += Math.floor(points.length/10);
  }
  
  periodMan.chosenElements = chosenElements;
  periodMan.quiz();
  
  return { "player": myPlayer, "game":myGame, "flexible-renderer":new flexRender(), "points":points, "obstacles":obstacles, "trajectory-outline":new dotMan(0, 100, myPlayer.velocityX, myPlayer.velocityXAdd, myPlayer.velocityY, myGame.gravity, myGame.gravityVel, platformMan), "platform-manager": platformMan };
}