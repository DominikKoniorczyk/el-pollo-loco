let mainMenuRef = null;
let difficultyRef = null;
let selectLevelRef = null;
let howToPlayRef = null;
let impressumRef = null;
let youLoseRef = null;
let youWinRef = null;

export function initData(doc){
    mainMenuRef = doc.getElementById("mainMenu");
    difficultyRef = doc.getElementById("difficultyLevel");
    selectLevelRef = doc.getElementById("selectLevel");
    howToPlayRef = doc.getElementById("howToPlay");
    impressumRef = doc.getElementById("impressum");
    youLoseRef = doc.getElementById("youLose");
    youWinRef = doc.getElementById("youWin");
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
