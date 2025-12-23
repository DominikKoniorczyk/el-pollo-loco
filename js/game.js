import { World } from '../classes/world.class.js';
import { Keyboard } from '../classes/keyboard.class.js';
import { IntervalHub } from '../classes/interavalhub.class.js';
import { level1, level2, level3 } from '../levels/level1.js';
import { ImageHub } from '../classes/imagehub.class.js';
import { SoundHub } from '../classes/soundhub.class.js';
import { MainMenu } from '../classes/main-menu.class.js';

let canvasRev;
let ctx;
let world;
let globalIntervalCounter = 0;
let endScreenWin = null;
let endScreenLose = null;
let difficultyLevel = 1;
const doc = window.document;
const levels = [level1, level2, level3];

window.addEventListener('load', initGame);
window.setDifficultyLevel = (l) => setDifficultyLevel(l);
window.startLevel = (levelToStart) => startLevel(levelToStart);
window.play = () => openPlayDialog();
window.back = (i) => menuGoBack(i);
window.openHowToPlay = () => openHowToPlay();

function initGame(){
    canvasRev = document.getElementById("canvas");  
    ctx = canvasRev.getContext('2d');
    Keyboard.addKeyboardListener();
    world = new MainMenu(canvasRev, Keyboard);
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
    SoundHub.stopAll(); 
    Keyboard.removeKeyboardListener();
    world.level.clearWorld();
    ctx.clearRect(0, 0, canvasRev.width, canvasRev.height);
    ctx.drawImage(won ? endScreenWin : endScreenLose, 0, 0, 720, 480);
}

function setDifficultyLevel(difficulty){
    const difficultyCont = doc.getElementById('difficultyLevel')
    const levelCont = doc.getElementById('selectLevel');
    difficultyCont.classList.toggle("d_none");
    levelCont.classList.toggle("d_none"); 
    difficultyLevel = difficulty;
}

function startLevel(levelToStart){
    const levelCont = doc.getElementById('selectLevel');
    IntervalHub.clearAllIntervals();
    levels[levelToStart].updateDifficulty(difficultyLevel);
    world = new World(canvasRev, Keyboard, levels[levelToStart]);
    IntervalHub.startInterval(tenMilliSecondsInterval, 10);
    IntervalHub.startInterval(gameTick60FPS, 1000 / 60);
    loadImages();
    levelCont.classList.toggle("d_none"); 
}

function reopenDifficultySelector(){
    const difficultyCont = doc.getElementById('difficultyLevel')
    const levelCont = doc.getElementById('selectLevel');
    difficultyCont.classList.toggle("d_none");
    levelCont.classList.toggle("d_none");
}

function openPlayDialog(){
    const difficultyCont = doc.getElementById('difficultyLevel')
    const mainCont = doc.getElementById('mainMenu');
    difficultyCont.classList.toggle("d_none");
    mainCont.classList.toggle("d_none"); 
}

function menuGoBack(i){
    switch (i){
        case 0: 
            openPlayDialog();
            break;
        case 1: 
            reopenDifficultySelector();
            break;
    }
}

function openHowToPlay(){
    const howToPlayCont = doc.getElementById('howToPlay')
    const mainCont = doc.getElementById('mainMenu');
    mainCont.classList.toggle("d_none");
    howToPlayCont.classList.toggle("d_none"); 
}
