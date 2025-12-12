let canvasRev;
let world;
let keyboard = new Keyboard();

function initGame(){
    canvasRev = document.getElementById("canvas");
    world = new World(canvasRev, keyboard);
    addEventListeners();
}

function addEventListeners(){    
    window.addEventListener('keydown', keyDown);
    window.addEventListener('keyup', keyUp);
}

function keyDown(e){
    if(e.code === "KeyD" || e.code === "ArrowRight") keyboard.RIGHT = true;
    else if(e.code === "KeyA" || e.code === "ArrowLeft") keyboard.LEFT = true;
    else if(e.code === "Space") keyboard.SPACE = true;
    else if(e.code === "KeyT") keyboard.THROW = true;    
}

function keyUp(e){
    if(e.code === "KeyD" || e.code === "ArrowRight") keyboard.RIGHT = false;
    else if(e.code === "KeyA" || e.code === "ArrowLeft") keyboard.LEFT = false;
    else if(e.code === "Space") keyboard.SPACE = false;
    else if(e.code === "KeyT") keyboard.THROW = false;
}
