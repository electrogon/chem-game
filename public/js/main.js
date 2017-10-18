// Author: Dorian Cauwe
// Created For Chemistry
// Team member: Aksel Andreassen 

console.log("Programming by: Dorian Cauwe");
console.log("Research and Testing: Aksel Andreassen")

var gameCanvas = document.getElementById("game-canvas");

$(window).resize(function(){ //resize canvas on window resize
  gameCanvas.width = $(window).width();
  gameCanvas.height = $(window).height();
});
$(window).resize(); //set initial canvas size by firing event

var questions = $("#periodic-files-questions").html().split(",");
var answers = $("#periodic-files-answers").html().split(",");

var movesLeft = 5;

level = 1;
var answer = "bob";
var coords;

var submitFunc = function() { alert("no question!") }

$("#submit-answer").click(function(){
  if (movesLeft == 0){
    alert("no moves left");
    gameOver();
  }
  
  if (answer.indexOf($("#question-answer-box").val()) > -1){
    alert("correct");
    movesLeft--;
    
    $("#question-answer-box").val("");
    $("#question-modal").css({"z-index":-10, "opacity":0});
    
    
    submitFunc();
  } else {
    alert("incorrect, the answer is " + answer);
    gameOver();
  }
})

var gameProperties = function(){
  this.ctx = gameCanvas.getContext("2d");

  
  /*this.obstacles = []
  for (var i=0; i<10; i++){
    var obstacleX = i*($(window).width()/10)+$(window).width()/10;
    var obstacleY = Math.floor(Math.random()*($(window).height()-100));
    
    var obstacleWidth = 10;
    var obstacleHeight = 100;
    
    this.obstacles.push(new obstacle(obstacleX, obstacleY, obstacleWidth, obstacleHeight));
  }*/
  
  var tilesPerRow = 35;
  
  //this.tileSources = $("#periodic-files-data").html();
  //var tileArray = this.tileSources.split(",");
  this.tiles = []
  for (var x=0; x<tilesPerRow ; x++){
    var y = 0;
    while (y < $(window).height()){
      //var tileSrc = tileArray[Math.floor(Math.random()*tileArray.length)]
        
      var mine = !(true && Math.floor(Math.random()*(5+(6-level))));
      
      this.tiles.push(new tile(x*($(window).width()/tilesPerRow), y, $(window).width()/tilesPerRow, mine)) //, "/img/ColorElementCells/" + tileSrc));
      
      if (this.tiles[this.tiles.length-1].checkCollision(($(window).width()/tilesPerRow)*2.5-2, $(window).height()/2)){
        this.tiles[this.tiles.length-1].mine = false;
        //alert("not a mine")
      }
      
      y += $(window).width()/tilesPerRow;
    }
  }
  
  var playerRadius = ($(window).width()/tilesPerRow)/3;
  this.player = new player(($(window).width()/tilesPerRow)*2.5-2, y/2-2, playerRadius);
}

var gameOver = function(){
  
}

var makeQuestion = function(funcCb){
  
  submitFunc = funcCb;
  var indexVal = Math.floor(Math.random()*questions.length);
  
  $("#question").html(questions[indexVal]);
  $("#question-modal").css({"z-index":10, "opacity":1});
  
  answer = answers[indexVal];
}

function render(props){
  var ctx = props.ctx;
  
  ctx.fillStyle = "#F5F5F5";
  ctx.fillRect(0, 0, $(window).width(), $(window).height())
  
  for (tile in props.tiles){
    if (props.tiles[tile].checkCollision(props.player.x, props.player.y) && props.tiles[tile].mine){
      gameOver();
      return 0;
    }
    props.tiles[tile].draw(ctx);
  }
  
  ctx.fillStyle =  "#212121";
  ctx.font = "40px Arial";
  ctx.fillText("Level " + level,50, 40);
  
  ctx.fillStyle =  "#212121";
  ctx.font = "40px Arial";
  ctx.fillText("Moves Left: " + movesLeft, 200, 40);
  
  props.player.update();
  props.player.draw(ctx);
  
  /*
  for (obstacle in props.obstacles){
    props.obstacles[obstacle].draw(ctx);
  }*/
  
  window.requestAnimationFrame(function () { render(props); });
}

$("#game-canvas").mousemove(function(event){
  for (tile in props.tiles){
    props.tiles[tile].checkClick(event.pageX, event.pageY, 1);
  }
});

$("#game-canvas").mousedown(function(event){
  var coords = [];
  var found = false;
  
  for (tile in props.tiles){
    var click = props.tiles[tile].checkClick(event.pageX, event.pageY, 2);
    if (click.length == 2){
      coords = click;
      found = true;
    }
  }
  
  if (found){
    coords = coords;
    
    makeQuestion(function() { props.player.moveToPosition(coords); });
  }
});

props = new gameProperties();
render(props);