import { World } from '../classes/world.class.js';
import { Keyboard } from '../classes/keyboard.class.js';
import { IntervalHub } from '../classes/interavalhub.class.js';
import { level1 } from '../levels/level1.js';

let canvasRev;
let world;
let keyboard = new Keyboard();
let globalIntervalCounter = 0;

window.addEventListener('load', initGame);

function initGame(){
    canvasRev = document.getElementById("canvas");
    IntervalHub.startInterval(tenMilliSecondsInterval, 10);
    IntervalHub.startInterval(gameTick60FPS, 1000 / 60);
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
