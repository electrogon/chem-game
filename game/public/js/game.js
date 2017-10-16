//Author: Dorian Cauwe

var game = function(){
  this.backgroundColor = "#EEEEEE";
  
  this.gravity = 0.4;
  this.gravityVel = 1;
  
  this.firstTime = true;
  
  this.shiftFactor = 0;
  
  this.draw = function(ctx){
    ctx.fillStyle = this.backgroundColor;
    ctx.fillRect(0, 0, $(window).width(), $(window).height());

    ctx.setLineDash([10, 6]); //dashes are 10px and spaces are 6px
    ctx.beginPath();
    ctx.moveTo(0+this.shiftFactor, $(window).height()*0.85 );
    ctx.lineTo($(window).width()-this.shiftFactor, $(window).height()*0.85);
    ctx.stroke();
  }
  
  this.shift = function(shift){
    this.shiftFactor = -(shift % 16); //instead of shifting the whole line, shift by 16 because line is dashed
  }
}