let canvasRev;
let world;

function initGame(){
    canvasRev = document.getElementById("canvas");
    world = new World(canvasRev);
}