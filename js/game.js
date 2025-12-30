import { World } from '../classes/world.class.js';
import { Keyboard } from '../classes/keyboard.class.js';
import { IntervalHub } from '../classes/interavalhub.class.js';
import { level1, level2, level3 } from '../levels/level1.js';
import { ImageHub } from '../classes/imagehub.class.js';
import { SoundHub } from '../classes/soundhub.class.js';
import { MainMenu } from '../classes/main-menu.class.js';
import { initData, mainMenuToggle, difficultyToggle, selectLevelToggle, howToPlayToggle, impressumToggle, youWinToggle, youLoseToggle, removeEndscreen, checkMobile, checkIsInLandscape } from './dom.js';
import { addFunctionListnerControlls } from './controlls.js';
import { EndScoreText } from '../classes/end-score-text.class.js';

let canvasRev;
let ctx;
let world;
let globalIntervalCounter = 0;
let endScreenWin = null;
let endScreenLose = null;
let difficultyLevel = 1;
let levelIndex = 0;
const doc = window.document;
const levels = [level1, level2, level3];
const sounds = [new Audio("./assets/audio/music/456969__funwithsound__success-resolution-video-game-fanfare-sound-effect-with-drum-roll.mp3"), new Audio("./assets/audio/music/362204__taranp__horn_fail_wahwah_3.wav")]

window.addEventListener('load', initGame);

function initGame(){
    addFunctionListner();
    canvasRev = document.getElementById("canvas");  
    ctx = canvasRev.getContext('2d');
    Keyboard.addKeyboardListener();
    world = new MainMenu(canvasRev, Keyboard);
    initData(doc);    
    IntervalHub.startInterval(checkIsInLandscape, 16.67);
}

function addFunctionListner(){
    window.setDifficultyLevel = (l) => setDifficultyLevel(l);
    window.startLevel = (levelToStart) => startLevel(levelToStart);
    window.play = () => openPlayDialog();
    window.back = (i) => menuGoBack(i);
    window.openHowToPlay = () => openHowToPlay();
    window.openImpressum = () => openImpressum();
    window.reinitGame = () => reinitGame();
    window.tryAgain = () => tryAgain();
    window.playNext = () => nextLevel();
    addFunctionListnerControlls();
}

function reinitGame(){
    initGame();
    const loseContRef = doc.getElementById("youLose");
    const winContRef = doc.getElementById("youWin");
    const mainContRef = doc.getElementById("mainMenu");
    mainContRef.classList.remove("d_none");
    loseContRef.classList.add("d_none");
    winContRef.classList.add("d_none");
}

function loadImages(){
    endScreenLose = new Image();
    endScreenWin = new Image();
    endScreenLose.src = ImageHub.endScreens.gameOver;
    endScreenWin.src = ImageHub.endScreens.winGame;
}

function tenMilliSecondsInterval(){
    checkIsInLandscape();
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
    let points = world.character.score;
    checkMobile();
    IntervalHub.clearAllIntervals();
    Keyboard.removeKeyboardListener();
    world.level.clearWorld();
    ctx.clearRect(0, 0, canvasRev.width, canvasRev.height);
    ctx.drawImage(won ? endScreenWin : endScreenLose, 0, 0, 720, 480);
    new EndScoreText(points, ctx);
    openOverlayOnGameOver(won);
    SoundHub.stopAll(); 
    SoundHub.playOne(won ? sounds[0] : sounds[1]);
}

function setDifficultyLevel(difficulty){
    const difficultyCont = doc.getElementById('difficultyLevel')
    const levelCont = doc.getElementById('selectLevel');
    difficultyCont.classList.toggle("d_none");
    levelCont.classList.toggle("d_none"); 
    difficultyLevel = difficulty;
}

function startLevel(levelToStart){
    levelIndex = levelToStart;
    checkMobile();
    const levelCont = doc.getElementById('selectLevel');
    IntervalHub.clearAllIntervals();
    levels[levelToStart].updateDifficulty(difficultyLevel);
    world = new World(canvasRev, Keyboard, levels[levelToStart]);
    IntervalHub.startInterval(tenMilliSecondsInterval, 10);
    IntervalHub.startInterval(gameTick60FPS, 1000 / 60);
    loadImages();
    levelCont.classList.toggle("d_none"); 
}

function tryAgain(){
    checkMobile();
    removeEndscreen();
    Keyboard.addKeyboardListener();
    IntervalHub.clearAllIntervals();
    levels[levelIndex].updateDifficulty(difficultyLevel);
    world = new World(canvasRev, Keyboard, levels[levelIndex]);
    IntervalHub.startInterval(tenMilliSecondsInterval, 10);
    IntervalHub.startInterval(gameTick60FPS, 1000 / 60);
    loadImages();
}

function nextLevel(){
    if(levelIndex < 2){
        levelIndex ++;
        tryAgain();
    }
}

function reopenDifficultySelector(){
    difficultyToggle();
    selectLevelToggle();
}

function openPlayDialog(){
    difficultyToggle();
    mainMenuToggle();   
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
    mainMenuToggle();
    howToPlayToggle();
}

function openImpressum(){
    mainMenuToggle();
    impressumToggle();
}

function openOverlayOnGameOver(won){
    won ? youWinToggle() : youLoseToggle();
}
