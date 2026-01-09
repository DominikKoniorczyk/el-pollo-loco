import { ImageHub } from "../classes/imagehub.class.js";

let mainMenuRef = null;
let difficultyRef = null;
let selectLevelRef = null;
let howToPlayRef = null;
let impressumRef = null;
let youLoseRef = null;
let youWinRef = null;
let volumeOnRef = null;
let volumeOffRef = null;
let mainScreenRef = null;
let mobileButtons = null;
let isFullscreen = false;
let turnPhoneScreen = false;
let nextLevelButton = null;

/**
 * Initializes references to key DOM elements and sets up buttons for the game interface.
 * @param {Document} document - The HTML document containing the elements to reference.
 */
export function initData(document){
    mainMenuRef = document.getElementById("mainMenu");
    difficultyRef = document.getElementById("difficultyLevel");
    selectLevelRef = document.getElementById("selectLevel");
    howToPlayRef = document.getElementById("howToPlay");
    impressumRef = document.getElementById("impressum");
    youLoseRef = document.getElementById("youLose");
    youWinRef = document.getElementById("youWin");
    turnPhoneScreen = document.getElementById("turnPhone");
    nextLevelButton = document.getElementById("nextLevelButton");
    getButtons(document);
}

/**
 * Retrieves references to key DOM elements for audio control and UI.
 * @param {Document} document - The DOM document to query elements from.
 */
function getButtons(document){
    volumeOnRef = document.getElementById("audioOn");
    volumeOffRef = document.getElementById("audioOff");
    mainScreenRef = document.getElementById("mainScreen");
    mobileButtons = document.getElementById("mobileControlls");
}

/**
 * Toggles the visibility of the main menu by adding/removing the "d_none" class.
 */
export function mainMenuToggle(){
    mainMenuRef.classList.toggle("d_none");    
}

/**
 * Toggles the visibility of the difficulty selection by adding/removing the "d_none" class.
 */
export function difficultyToggle(){
    difficultyRef.classList.toggle("d_none");
} 

/**
 * Toggles the visibility of the level selection by adding/removing the "d_none" class.
 */
export function selectLevelToggle(){
    selectLevelRef.classList.toggle("d_none");
} 

/**
 * Toggles the visibility of the "How to Play" section by adding/removing the "d_none" class.
 */
export function howToPlayToggle(){
    howToPlayRef.classList.toggle("d_none");
} 

/**
 * Toggles the visibility of the impressum section by adding/removing the "d_none" class.
 */
export function impressumToggle(){
    impressumRef.classList.toggle("d_none");
} 

/**
 * Toggles the visibility of the "You Lose" screen.
 */
export function youLoseToggle(){
    youLoseRef.classList.toggle("d_none");
} 

/**
 * Toggles the visibility of the "You Win" screen.
 */
export function youWinToggle(){
    youWinRef.classList.toggle("d_none");
} 

/**
 * Hides both the "You Win" and "You Lose" screens.
 */
export function removeEndscreen(){
    youLoseRef.classList.add("d_none");
    youWinRef.classList.add("d_none");
}

/**
 * Toggles between the volume on and off symbols.
 */
export function toggleSoundSymbol(){
    volumeOnRef.classList.toggle("d_none");
    volumeOffRef.classList.toggle("d_none");
}

/**
 * Requests fullscreen mode for the main screen element.
 */
export function openFullscreen() {
  if (mainScreenRef.requestFullscreen) {
    mainScreenRef.requestFullscreen();
  } else if (mainScreenRef.webkitRequestFullscreen) { 
    mainScreenRef.webkitRequestFullscreen();
  } else if (mainScreenRef.msRequestFullscreen) {
    mainScreenRef.msRequestFullscreen();
  }
  isFullscreen = true;
}

/**
 * Exits fullscreen mode if currently active.
 */
export function closeFullscreen() {
  if (window.document.exitFullscreen) {
    window.document.exitFullscreen();
  } else if (window.document.webkitExitFullscreen) {
    window.document.webkitExitFullscreen();
  } else if (window.document.msExitFullscreen) { 
    window.document.msExitFullscreen();
  }
  isFullscreen = false;
}

/**
 * Checks if the application is currently in fullscreen mode.
 * @returns {boolean} True if fullscreen is active, otherwise false.
 */
export function isInFullscreen(){
    return isFullscreen;
}

/**
 * Detects if the device is mobile and toggles mobile-specific UI elements.
 * Also disables the context menu on mobile devices.
 */
export function checkMobile(){
    if(window.innerWidth < 1000){
      mobileButtons.classList.remove("d_none");
      window.document.addEventListener('contextmenu', e => e.preventDefault());
    }
}

/**
 * Enables the mobile control buttons by removing the "d_none" class.
 */
export function enableMobileButtons(){
    mobileButtons.classList.remove("d_none");
}

/**
 * Disables the mobile control buttons by adding the "d_none" class.
 */
export function disableMobileButtons(){
    mobileButtons.classList.add("d_none");
}

/**
 * Checks if the device is in portrait mode and shows a prompt to rotate the screen.
 * Hides the prompt if the device is in landscape mode.
 */
export function checkIsInLandscape(){
    if(window.innerWidth < window.innerHeight) turnPhoneScreen.classList.remove("d_none");
    else turnPhoneScreen.classList.add("d_none");  
}

/**
 * Turns of the play next level button when the last level is reached.
 */
export function setNextLevelButtonInvisble(){
  nextLevelButton.classList.add("d_none");
}

/**
 * Turns on the play next level button.
 */
export function setNextLevelButtonVisble(){
  nextLevelButton.classList.remove("d_none");
}