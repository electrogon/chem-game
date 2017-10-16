// Author: Dorian Cauwe Aksel Andreassen
// Created For Chemistry

console.log("Programming by: Dorian Cauwe");
console.log("Research and Testing: Aksel Andreassen")

var gameCanvas = document.getElementById("game-canvas");

var periodMan = new periodicTableManager();

//All speeds are in pixels per frame

var flexRender = function(){
  this.lastTime = new Date();
  this.thisTime = new Date();
}

var coord = function(x, y){
  this.x = x;
  this.y = y;
}

function render(settings, ctx, mouseMan){ //pass playSettings every time to maintain local scope
  var myPlayer = settings["player"];
  var myGame = settings["game"];
  var renderInfo = settings["flexible-renderer"];
  
  var points = settings["points"];
  var obstacles = settings["obstacles"];
  
  var trajectory = settings["trajectory-outline"];
  var platformManager = settings["platform-manager"];
  
  renderInfo.thisTime = new Date();
  update(myPlayer.x, myPlayer.y, ctx);
  
  myPlayer.x += myPlayer.velocityX; // move according to time passed to maintain speed between clients
  myPlayer.velocityX += myPlayer.velocityXAdd;
  
  myPlayer.y += myPlayer.velocityY; // same for y
  myPlayer.y += myGame.gravity;
  myGame.gravity += myGame.gravityVel;

  myPlayer.totalXMovement += myPlayer.velocityX;
  
  myPlayer.x += mouseMan.shift;
  myGame.shift(mouseMan.shift);
  mouseMan.shiftPosition -= mouseMan.shift;
  trajectory.shiftFactor += mouseMan.shift;
  platformManager.shiftPosition += mouseMan.shift;
  
  myGame.draw(ctx);
  myPlayer.draw(ctx);
  trajectory.draw(ctx);
  platformManager.draw(ctx);
  
  for (var obs in obstacles){
    var currObs = obstacles[obs];
    currObs.draw(ctx);
    currObs.setShift(mouseMan.shift);
  }

  if (myPlayer.y < $(window).height() || true) {
    window.requestAnimationFrame(function () { render(settings, ctx, mouseMan); });
  }
}

var mouseMan = new mouseManager();
render(prepare(), gameCanvas.getContext("2d"), mouseMan);

$("#game-canvas").mousedown(function(event){
  mouseMan.lastCoord = new coord(event.pageX, event.pageY);
  mouseMan.firstCoord = new coord(event.pageX, event.pageY);
  mouseMan.mouseDown = true;
});

$("#game-canvas").mousemove(function(event){
  if (mouseMan.mouseDown){
    mouseMan.setShift(event.pageX-mouseMan.lastCoord.x);
    mouseMan.lastCoord = new coord(event.pageX, event.pageY);
  }
});

$("#game-canvas").mouseup(function(event){
  if (mouseMan.firstCoord.x == mouseMan.lastCoord.x && mouseMan.firstCoord.y == mouseMan.lastCoord.y){
    platformMan.click(event);
  }
  
  mouseMan.mouseDown = false;
  mouseMan.setShift(0);
});

$("#periodic-open").click(function(){
  $("#periodic-wrapper").css({"opacity":"1", "z-index": "10"});
});

$(".close").click(function(){
  $("#periodic-wrapper").css({"opacity":"0", "z-index": "-10"});
});

$("#orbital-search-button").click(function(){
  alert("clicked");
  periodMan.checkValue($("#orbital-search-box").val());
});

document.onselectstart = function() { return false; };