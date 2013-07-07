var CREATURES = [];
// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

var interval;

function mainLoop(){
    clearInterval(interval);
    for (var i = 0; i<CREATURES.length; i++){
        CREATURES[i].update();
    }
    
    interval = setInterval(mainLoop, 1000);
}
var addXCreatures = function(quantity){
console.log(quantity);
    for(var i = 0; i<quantity ; i++){
        addCreature({x:window.innerWidth/2, y: window.innerHeight/2});
    }
}
var addCreature = function(pos){
    var newCreature = new creature();
    newCreature.x = pos.x;
    newCreature.y = pos.y;
newCreature.append();
    CREATURES.push(newCreature);
}


var reset = function () {
    
    CREATURES = [];
};



var start = function(){
   
   // Let's play this game!
    reset();
    addXCreatures(50);
    mainLoop();
}

$(document).ready(function(){
    start();   
});
