//Author: Dorian Cauwe

var player = function(){
  this.x = 0;
  this.y = 100;
  
  this.radius = 10;
  
  this.velocityX = 10;
  this.velocityY = 0;
  
  this.velocityXAdd = 0.1;
  
  this.color = "#F44336";
  
  this.draw = function(ctx){
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius,0,2*Math.PI);
    ctx.fill();
  }
}