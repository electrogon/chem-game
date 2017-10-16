//Author: Dorian Cauwe

var mouseManager = function(){
  this.lastCoord = new coord(0, 0);
  this.mouseDown = false;
  
  this.shift = 0;
  this.shiftPosition = 0;
  this.shiftBounds = [0, 1000]
  
  this.setShift = function(shift){
    if ( !(this.shiftPosition - shift < this.shiftBounds[0] || this.shiftPosition - shift > this.shiftBounds[1])){
      this.shift = shift;
    }
    else {
      this.shift = 0;
    }
  }
}
