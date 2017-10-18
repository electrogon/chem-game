var tile = function(x, y, size, mine){
  this.x = x;
  this.y = y;
  this.size = size
  
  //this.img = new Image();
  //this.img.src = src;
  
  this.click = 0;
  this.colors = ["#E0E0E0", "#9E9E9E"]
  
  this.mine = mine;
  this.mineColor = "#F44336";
  
  this.draw = function(ctx){
    //ctx.drawImage(this.img, this.x, this.y, this.size, this.size);
    ctx.strokeStyle = "#636363";
    
    ctx.lineWidth = 1;
    
    if (this.mine){
      ctx.fillStyle = this.mineColor;
      ctx.fillRect(this.x-1, this.y-1, this.size, this.size);
    }
    else if (this.click == 1){
      ctx.fillStyle = this.colors[0];
      ctx.fillRect(this.x-1, this.y-1, this.size, this.size);
    } else if (this.click == 2){
      ctx.fillStyle = this.colors[1];
      
      ctx.fillRect(this.x-1, this.y-1, this.size, this.size);
    }
    
    ctx.strokeRect(this.x-1, this.y-1, this.size, this.size);
  }
  
  this.checkClick = function(x, y, clickWeight){
    if (x > this.x && x < this.x+this.size && y > this.y && y < this.y+this.size){
      this.click = clickWeight;
      return [this.x+this.size/2, this.y+this.size/2];
    } else {
      this.click = 0;
      return true;
    }
  }
  
  this.checkCollision = function(x, y){
    x += 3
    y += 3
    
    //alert(x)
    //alert(y);
    
    if (x > this.x && x < this.x+this.size && y > this.y && y < this.y+this.size){
      //this.mine = true;
      //this.mineColor = "blue";
      //alert("hit")
      return true;
    } else {
      return false;
    }
  }
}