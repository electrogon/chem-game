var obstacle = function (x, y, width, height, color){ //Obstacle Definition
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.color = color || "#F44336";
  
  this.draw = function(ctx){
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}