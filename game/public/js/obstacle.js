//Author: Dorian Cauwe

var obstacle = function(x1a, y1a, x2a, y2a, x1b, y1b, x2b, y2b){

  this.shiftFactor = 0;
  this.rect1Coords = [[x1a, y1a], [x2a-x1a, y2a-y1a]];

  this.complete = false; // one or two rectangles?
  if (x1b){
    this.rect2Coords = [[x1b, y1b], [x2b-x1b, y2b-y1b]];
    this.complete = true; // if we have two the obstacle is complete
  }

  this.draw = function(ctx){
    ctx.fillStyle = "#3F51B5"
    ctx.fillRect(this.rect1Coords[0][0]+this.shiftFactor, this.rect1Coords[0][1], this.rect1Coords[1][0], this.rect1Coords[1][1]);
    if (this.complete){
        ctx.fillRect(this.rect2Coords[0][0] + this.shiftFactor, this.rect2Coords[0][1], this.rect2Coords[1][0], this.rect2Coords[1][1]);
    }

  }

  this.setShift = function(shift){
    this.shiftFactor += shift;
  }
}