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
let isFullscreen = false;
let document = null;

export function initData(document){
    mainMenuRef = document.getElementById("mainMenu");
    difficultyRef = document.getElementById("difficultyLevel");
    selectLevelRef = document.getElementById("selectLevel");
    howToPlayRef = document.getElementById("howToPlay");
    impressumRef = document.getElementById("impressum");
    youLoseRef = document.getElementById("youLose");
    youWinRef = document.getElementById("youWin");
    volumeOnRef = document.getElementById("audioOn");
    volumeOffRef = document.getElementById("audioOff");
    mainScreenRef = document. getElementById("mainScreen");
    document = document;
}

export function mainMenuToggle(){
    mainMenuRef.classList.toggle("d_none");    
}

export function difficultyToggle(){
    difficultyRef.classList.toggle("d_none");
} 

export function selectLevelToggle(){
    selectLevelRef.classList.toggle("d_none");
} 

export function howToPlayToggle(){
    howToPlayRef.classList.toggle("d_none");
} 

export function impressumToggle(){
    impressumRef.classList.toggle("d_none");
} 

export function youLoseToggle(){
    youLoseRef.classList.toggle("d_none");
} 

export function youWinToggle(){
    youWinRef.classList.toggle("d_none");
} 

export function removeEndscreen(){
    youLoseRef.classList.add("d_none");
    youWinRef.classList.add("d_none");
}

export function toggleSoundSymbol(){
    volumeOnRef.classList.toggle("d_none");
    volumeOffRef.classList.toggle("d_none");
}

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

export function isInFullscreen(){
    return isFullscreen;
}
