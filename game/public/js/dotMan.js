//Author: Dorian Cauwe

var dotMan = function(xPos, yPos, xVel, xAdd, yVel, gravity, gravityAdd, platformManager){
  this.xPos = xPos;
  this.yPos = yPos;
  this.xVel = xVel;
  this.xAdd = xAdd;
  this.yVel = yVel;
  
  this.platMan = platformManager;
  
  this.gravity = gravity; //initial gravity
  this.gravityAdd = gravityAdd; //how much to add to gravity
  
  this.platformFlipFactor = 1;
  
  this.shiftFactor = 0;

  
  this.update = function(){ // recalculate dot position
    var points = []
    
    var playerPosX = this.xPos;
    var playerVelocityX = this.xVel;
    var velocityXAdd = this.xAdd;
    
    var playerPosY = this.yPos;
    var velocityY = this.yVel;
    this.playerGravityY = this.gravity; 
    var gravityVel = this.gravityAdd;
    
    for (var x=1; x<200; x++){
      var rCall = this.platMan.renderCall();
      if (!rCall[0]){
        playerPosX += playerVelocityX;
        playerVelocityX += velocityXAdd;

        playerPosY += velocityY;
        playerPosY += this.playerGravityY;
      } else {
        playerPosX += rCall[1];
        playerPosY += rCall[2];
      }
      
      this.playerGravityY += gravityVel;
      
          
      this.platMan.detectCollision(playerPosX, playerPosY, this)
      
      points.push([playerPosX, playerPosY]);
    }
    
    return points;
  }
  
    
  this.draw = function(ctx){
    var points = this.update();
    
    for (var point in points){
      ctx.fillRect(points[point][0]-2+this.shiftFactor, (points[point][1]-2)*this.platformFlipFactor, 4, 4);
    }
    
    this.platformFlipFactor = 1;
  }
}