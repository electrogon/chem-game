var orbital = function(elementType, elementPos, startingPos){
  console.log("new orbital")
  this.elementType = elementType;
  this.elementPos = elementPos || periodicTable["notations"][Math.floor(Math.random()*periodicTable["notations"].length)];
  this.startingPos = startingPos || $("#pertable-img").position();
  
  if (elementPos == this.elementPos){
    console.log("same");
  }
  
  this.xPosition = (0.0249*$(window).width())*(this.elementPos["position"][1]-1)+(0.0249*$(window).width())/2;
  this.yPosition = (0.0249*$(window).width())*(this.elementPos["position"][0]-1)+(0.0249*$(window).width())/2;
  
  this.element = $("<h2 class='element-pointer'>" + this.elementType + "</h2>");
  
  this.element.css({"background-color":periodicTable["colors"][elementType], "position":"absolute", "top":this.startingPos["top"]+this.yPosition+"px", "left":this.startingPos["left"]+this.xPosition+"px"});
  
  $("#periodic-modal").append(this.element);
  
  this.destroy = function(){
    this.element.remove();
  }
}

var periodicTableManager = function(){
  this.periodImg = $("#pertable-img");
  
  this.chosenElements = ["d", "p", "f", "s"];
  this.orbitals = [];
  
  this.selectedOrbital = "";
  this.selectedOrbitalValue = -1;
  
  this.quiz = function(){
    for (element in this.chosenElements){
      this.orbitals.push(new orbital(this.chosenElements[element]));
    }
  }
  
  this.checkValue = function(elementNotation){
    var found = false;
    
    for (orb in this.orbitals){
      if (elementNotation == this.orbitals[orb].elementPos["notation"]){
        this.orbitals[orb].destroy();
        this.orbitals.splice(orb, 1);
        
        this.selectedOrbital = this.orbitals[orb].elementType;
        this.selectedOrbitalValue = -1;
        found = true;
      } 
    }
    
    if (!found){
      alert("Sorry, Element not found");
    }
  }
}