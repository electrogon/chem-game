var player = function(x, y, radius, color){ // Ball Player
  this.x = x;
  this.y = y;
  this.radius = radius;
  
  this.startingPosition = [this.x, this.y];
  this.desiredPosition = [this.x, this.y];
  this.movementVector = [0, 0];
  
  this.won = false;
  
  this.color = color || "#FFC107";
  
  this.update = function(){ // move to desired position
   if (!(Math.floor(this.desiredPosition[0])-3 < Math.floor(this.x) && Math.floor(this.desiredPosition[0])+3 > Math.floor(this.x) && Math.floor(this.desiredPosition[1])-3 < Math.floor(this.y) && Math.floor(this.desiredPosition[1])+3 > Math.floor(this.y))){ // check if we have already reached our destination
     this.x += this.movementVector[0];
     this.y += this.movementVector[1];
   } 
  }
  
  this.draw = function(ctx){
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
    ctx.fill();
    
    if (this.x > $(window).width()-50){
      if (!this.won){
        alert("You Won");
        this.won = true;
      }
      
      location.reload();
    }
  }
  
  this.moveToPosition = function(coords){
    x = coords[0];
    y = coords[1];
    
    this.startingPostion = [this.x, this.y];
    this.desiredPosition = [x, y];
    this.movementVector = [(x-this.x)/25, (y-this.y)/25]; //x, y
  }
}