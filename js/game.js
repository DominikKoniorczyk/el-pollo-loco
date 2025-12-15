let canvasRev;
let world;
let keyboard = new Keyboard();
let globalIntervalCounter = 0;

function initGame(){
    canvasRev = document.getElementById("canvas");
    IntervalHub.startInterval(tenMilliSecondsInterval, 10);
    IntervalHub.startInterval(gameTick60FPS, 16.667);
    world = new World(canvasRev, keyboard, level1);
    addEventListeners();
}

function tenMilliSecondsInterval(){
    world.interval10ms(globalIntervalCounter);
    globalIntervalCounter += 10;
    if(globalIntervalCounter >= 1000){
        globalIntervalCounter = 0;
    }
}

function gameTick60FPS(){
    world.interval60FPS();
}

function addEventListeners(){    
    window.addEventListener('keydown', keyDown);
    window.addEventListener('keyup', keyUp);
}

function gameOver(){
    IntervalHub.clearAllIntervals();    
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
