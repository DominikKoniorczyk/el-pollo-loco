import { World } from '../classes/world.class.js';
import { Keyboard } from '../classes/keyboard.class.js';
import { IntervalHub } from '../classes/interavalhub.class.js';
import { level1, level2, level3 } from '../levels/level1.js';
import { ImageHub } from '../classes/imagehub.class.js';
import { SoundHub } from '../classes/soundhub.class.js';
import { MainMenu } from '../classes/main-menu.class.js';
import { initData, mainMenuToggle, difficultyToggle, selectLevelToggle, howToPlayToggle, impressumToggle, youWinToggle, youLoseToggle, removeEndscreen, checkMobile, checkIsInLandscape, setNextLevelButtonInvisble, setNextLevelButtonVisble, enableMobileButtons, disableMobileButtons } from './dom.js';
import { addFunctionListnerControlls, loadAudioSetting, preventSpaceClick } from './controlls.js';
import { EndScoreText } from '../classes/end-score-text.class.js';

let canvasRev;
let ctx;
let world;
let globalIntervalCounter = 0;
let endScreenWin = null;
let endScreenLose = null;
let difficultyLevel = 1;
let levelIndex = 0;
let points = 0;
export let mobile = false;
export let gameIsRunning = false;
const doc = window.document;
const levels = [level1, level2, level3];
const sounds = [new Audio("./assets/audio/music/456969__funwithsound__success-resolution-video-game-fanfare-sound-effect-with-drum-roll.mp3"), new Audio("./assets/audio/music/362204__taranp__horn_fail_wahwah_3.mp3")]

window.addEventListener('load', initGame);

/**
 * Initializes the game by setting up the canvas, input listeners, main menu, 
 * data, intervals, and audio settings.
 */
function initGame(){
    preventSpaceClick();
    addFunctionListner();
    canvasRev = document.getElementById("canvas");  
    ctx = canvasRev.getContext('2d');
    Keyboard.addKeyboardListener();
    world = new MainMenu(canvasRev, Keyboard);
    initData(doc);    
    IntervalHub.startInterval(checkIsInLandscape, 16.67);
    loadAudioSetting();
}

/**
 * Exposes game control functions on the global `window` object and initializes control listeners.
 */
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

/**
 * Reinitializes the game by restarting it and resetting the visibility of main, win, and lose screens.
 */
function reinitGame(){
    initGame();
    const loseContRef = doc.getElementById("youLose");
    const winContRef = doc.getElementById("youWin");
    const mainContRef = doc.getElementById("mainMenu");
    mainContRef.classList.remove("d_none");
    loseContRef.classList.add("d_none");
    winContRef.classList.add("d_none");
}

/**
 * Loads the end screen images for win and lose scenarios.
 */
function loadImages(){
    endScreenLose = new Image();
    endScreenWin = new Image();
    endScreenLose.src = ImageHub.endScreens.gameOver;
    endScreenWin.src = ImageHub.endScreens.winGame;
}

/**
 * Executes a 10ms interval update for the world and character, 
 * ensuring the landscape check and updating the global interval counter.
 */
function tenMilliSecondsInterval(){
    checkIsInLandscape();
    world.interval10ms(globalIntervalCounter);
    world.character.interval10ms(globalIntervalCounter);
    globalIntervalCounter += 10;
    if(globalIntervalCounter >= 1000){
        globalIntervalCounter = 0;
    }
}

/**
 * Updates the world and character at 60 frames per second.
 */
function gameTick60FPS(){
    world.interval60FPS();
    world.character.interval60FPS();
}

/**
 * Handles the end-of-game sequence by stopping inputs, clearing intervals, 
 * updating the world and UI, and playing the appropriate game-over sound.
 * @param {boolean} won - Indicates if the player has won the game.
 */
export function gameOver(won){
    gameIsRunning = false;
    disableMobileButtons();
    Keyboard.removeKeyboardListener();
    IntervalHub.clearAllIntervals();
    Keyboard.removeKeyboardListener();
    world.level.clearWorld();
    drawScoreText(won);
    openOverlayOnGameOver(won);
    playGameOverSound(won);
}

/**
 * Renders the current score and the end screen (win/lose) on the canvas, 
 * and displays the final score along with the highscore.
 * @param {boolean} won - Indicates if the player has won the game.
 */
function drawScoreText(won){    
    points = world.character.score;
    ctx.clearRect(0, 0, canvasRev.width, canvasRev.height);
    ctx.drawImage(won ? endScreenWin : endScreenLose, 0, 0, 720, 480);
    new EndScoreText(points, ctx, localStorage.getItem('Highscore') !== null ? JSON.parse(localStorage.getItem('Highscore')) : points);
   
}

/**
 * Stops all sounds and plays the game over sound based on win status.
 * @param {boolean} won - True if the player won, false if lost.
 */
function playGameOverSound(won){
    SoundHub.stopAll(); 
    SoundHub.playOne(won ? sounds[0] : sounds[1]);
}

/**
 * Sets the current difficulty level and toggles the visibility of related UI elements.
 * @param {string} difficulty - The difficulty level to set (e.g., "easy", "medium", "hard").
 */
function setDifficultyLevel(difficulty){
    const difficultyCont = doc.getElementById('difficultyLevel')
    const levelCont = doc.getElementById('selectLevel');
    difficultyCont.classList.toggle("d_none");
    levelCont.classList.toggle("d_none"); 
    difficultyLevel = difficulty;
}

/**
 * Starts the specified game level by setting difficulty, initializing the world,
 * managing intervals, loading images, and updating the level UI.
 * @param {number} levelToStart - Index of the level to start.
 */
function startLevel(levelToStart){
    levelIndex = levelToStart;
    checkMobile();
    mobile ? enableMobileButtons() : disableMobileButtons();
    gameIsRunning = true;
    const levelCont = doc.getElementById('selectLevel');
    IntervalHub.clearAllIntervals();
    levels[levelToStart].updateDifficulty(difficultyLevel);
    world = new World(canvasRev, Keyboard, levels[levelToStart]);
    IntervalHub.startInterval(tenMilliSecondsInterval, 10);
    IntervalHub.startInterval(gameTick60FPS, 1000 / 60);
    loadImages();
    levelCont.classList.toggle("d_none"); 
}

/**
 * Resets the game state by clearing intervals, updating the current level's difficulty,
 * reinitializing the world and keyboard, and reloading assets.
 */
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

/**
 * Advances to the next level if not at the last one and triggers a retry.
 */
function nextLevel(){
    if(levelIndex < 2){
        levelIndex ++;
        tryAgain();
    }
}

/**
 * Reopens the difficulty selector by toggling the difficulty and level selection UI.
 */
function reopenDifficultySelector(){
    difficultyToggle();
    selectLevelToggle();
}

/**
 * Opens the play dialog by toggling difficulty settings and the main menu.
 */
function openPlayDialog(){
    difficultyToggle();
    mainMenuToggle();   
}

/**
 * Navigates back in the menu based on the given index.
 * @param {number} i - The menu step to return to (0 for play dialog, 1 for difficulty selector).
 */
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

/**
 * Toggles the main menu and the "How to Play" section visibility.
 */
function openHowToPlay(){
    mainMenuToggle();
    howToPlayToggle();
}

/**
 * Toggles the main menu and the Impressum section visibility.
 */
function openImpressum(){
    mainMenuToggle();
    impressumToggle();
}

/**
 * Displays a win or lose overlay and updates the highscore if the game is won.
 * Toggles the next level button visibility based on the current level.
 * @param {boolean} won - True if the player won, false otherwise.
 */
function openOverlayOnGameOver(won){
    if(won){
        youWinToggle();
        if(localStorage.getItem('Highscore') === null || JSON.parse(localStorage.getItem('Highscore')) < points){
            localStorage.setItem('Highscore', JSON.stringify(points))
        }
        if(levelIndex < 2){
            setNextLevelButtonVisble();
        }
        else {
            setNextLevelButtonInvisble();
        }
    }
    else youLoseToggle();
}


export function toggleMobile(){
    mobile = !mobile;
}