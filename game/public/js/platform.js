//Author: Dorian Cauwe

var platform = function(x, y, width, height, orbital){
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.orbital = orbital;
  
  this.draw = function(ctx, shiftPosition){
    ctx.fillRect(this.x+shiftPosition, this.y, this.width, this.height);
  }
  
  this.determineEffect = function(orbital){
    if (orbital == "d"){ //Bounce effect
       return [0, -1, undefined, 1]; //iterations (0 for infinite), y change (y*x), (or) x y change, state (solid (1) or teleporter(0))
    } else if (orbital == "s"){ // move 15 forward
      return [10, 1, [15, 0], 1];
    } else if (orbital == "p"){ // teleport 15 forward
      return [10, 1, [15, 0], 0];
    }
  }
  
  this.effect = this.determineEffect(orbital);
}

platforms = []

var platformCreator = function(){
  this.shiftPosition = 0; //Mouse Shift Position -> mouse drag
  
  this.movementDirection = [0, 0];
  this.movementCount = 0;
  
  this.click = function(event){
    if (periodMan.selectedOrbital != "" && periodMan.selectedOrbitalValue < 0){
      platforms.push(new platform(mouseMan.shiftPosition+event.pageX-5, event.pageY-5, 10, 10, periodMan.selectedOrbital));
      periodMan.selectedOrbitalValue = platforms.length-1;
    } else if (periodMan.selectedOrbitalValue >= 0){
      platforms[periodMan.selectedOrbitalValue].x = mouseMan.shiftPosition+event.pageX-5;
      platforms[periodMan.selectedOrbitalValue].y = event.pageY-5;
    }
  }
  
  this.draw = function(ctx){
    for (myPlatform in platforms){
      platforms[myPlatform].draw(ctx, this.shiftPosition);
    }
  }
  
  this.renderCall = function(x, y){
    if (this.movementCount){
      x += this.movementDirection[0];
      y += this.movementDirection[1];
      this.movementCount--;
      return [true, x, y]; //changed, x, y
    } else {
      return [false]
    }
    
    
  }
  
  this.detectCollision = function (x, y, that){
    for (myPlatform in platforms){
      if (platforms[myPlatform].x < x && 
          platforms[myPlatform].x + platforms[myPlatform].width > x && 
          platforms[myPlatform].y - 30 < y && 
          platforms[myPlatform].y + 30 + platforms[myPlatform].height > y){
        
        if (platforms[myPlatform].effect[1] == 1){ // if we are not making a change on the y value itself but moving by coords
          this.movementDirection = platforms[myPlatform].effect[2];
          this.movementCount = platforms[myPlatform].effect[0];
        } else { //or if we are moving by y value change
          that.playerGravityY *= -1;
        }
        
        return 1;
      } 
    }
  }
}