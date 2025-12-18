import { World } from '../classes/world.class.js';
import { Keyboard } from '../classes/keyboard.class.js';
import { IntervalHub } from '../classes/interavalhub.class.js';
import { level1 } from '../levels/level1.js';

let canvasRev;
let world;
let globalIntervalCounter = 0;

window.addEventListener('load', initGame);

function initGame(){
    canvasRev = document.getElementById("canvas");
    Keyboard.addKeyboardListener();
    IntervalHub.startInterval(tenMilliSecondsInterval, 10);
    IntervalHub.startInterval(gameTick60FPS, 1000 / 60);
    world = new World(canvasRev, Keyboard, level1);
}

function tenMilliSecondsInterval(){
    world.interval10ms(globalIntervalCounter);
    world.character.interval10ms(globalIntervalCounter);
    globalIntervalCounter += 10;
    if(globalIntervalCounter >= 1000){
        globalIntervalCounter = 0;
    }
}

function gameTick60FPS(){
    world.interval60FPS();
    world.character.interval60FPS();
}

function gameOver(){
    IntervalHub.clearAllIntervals();    
}
