var express = require('express');
var app = express();
var server = require('http').Server(app);
var fs = require('fs');

var port = process.env.PORT || 5000;

var contents = fs.readFileSync(__dirname + '/public/data/periodic-table.json', 'utf8');
var elements = JSON.parse(contents)["elements"]

var questions = [
  "How many electrons can a d shaped orbital hold?",
  "How many electrons can an s shaped orbital hold?",
  "How many electrons can a p shaped orbital hold?",
  "The element with the lowest atomic number that cannot be written in Nobel Gas Notation is (ex: Carbon):",
  "Which orbital is often called a \"sphere\" orbital(ex: d)",
  "Which orbital is often called a \"peanut-shaped\" orbital(ex: d)",
  "Which orbital has four circles that look like donut holes(ex: d)",
]
var answers = [
  ["10"],
  ["2"],
  ["3"],
  ["Hydrogen"],
  ["s"],
  ["p"],
  ["d"]
]

for (element in elements){
  if (element < 51){
   questions.push("What is the abbreviated notation of " + elements[element]["name"] + "? (ex: 1s2 for Helium)");
  
    var conf = elements[element]["notation"];
    console.log(conf)
    answers.push([conf]); 
  } else {
    break;
  }
}

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views'); //set views directory

app.get('/',function(req, res) {
  var files = fs.readdirSync(__dirname + '/public/img/ColorElementCells/');
  res.render("index", {"questions":questions, "answers":answers});
});

app.listen(port, function(){
	console.log("Server Running on port " + port);
});