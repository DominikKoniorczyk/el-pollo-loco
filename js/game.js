let canvasRev;
let character = new MovableObject();
let ctx;

function initGame(){
    canvasRev = document.querySelector("canvas");
    ctx = canvasRev.getContext("2d");
    character.src = "../img/2_character_pepe/1_idle/idle/I-1.png";
    ctx.drawImage(character, 20, 20, 50, 150);
}