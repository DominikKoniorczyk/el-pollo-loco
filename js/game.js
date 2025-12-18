import { World } from '../classes/world.class.js';
import { Keyboard } from '../classes/keyboard.class.js';
import { IntervalHub } from '../classes/interavalhub.class.js';
import { level1 } from '../levels/level1.js';
import { ImageHub } from '../classes/imagehub.class.js';

let canvasRev;
let ctx;
let world;
let globalIntervalCounter = 0;
let endScreenWin = null;
let endScreenLose = null;

window.addEventListener('load', initGame);

function initGame(){
    canvasRev = document.getElementById("canvas");  
    ctx = canvasRev.getContext('2d');
    Keyboard.addKeyboardListener();
    IntervalHub.startInterval(tenMilliSecondsInterval, 10);
    IntervalHub.startInterval(gameTick60FPS, 1000 / 60);
    world = new World(canvasRev, Keyboard, level1);
    loadImages();
}

function loadImages(){
    endScreenLose = new Image();
    endScreenWin = new Image();
    endScreenLose.src = ImageHub.endScreens.gameOver;
    endScreenWin.src = ImageHub.endScreens.winGame;
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

export function gameOver(won){
    IntervalHub.clearAllIntervals(); 
    ctx.clearRect(0, 0, canvasRev.width, canvasRev.height);
    ctx.drawImage(won ? endScreenWin : endScreenLose, 0, 0, 720, 480);
}
