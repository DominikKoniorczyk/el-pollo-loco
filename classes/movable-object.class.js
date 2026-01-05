import { gameOver } from "../js/game.js";
import { DrawableObject } from "./drawable-object.class.js";

export class MovableObject extends DrawableObject {
    speed = 0.15;
    world;
    worldTiles;
    speedY = 0;
    acceleration = 1;
    standingGroundY = 0;
    jump_height = 20;
    health = 100;
    damagePerAttack = 20;
    msCounter = 0;
    lastHit = 0;
    hurtAnims = [];
    deathAnims = [];
    onceImageIndex = 0;
    hurtSound;
    hurtSounds = ['./assets/audio/chicken/chickenDead.mp3', './assets/audio/chicken/chickenDead2.mp3'];
    killScorePoints = 250;

    /**
     * Called every frame at 60 FPS; updates position and applies gravity.
     */
    interval60FPS(){
        super.interval60FPS();
        this.checkIfOffScreen();
        this.applyGravity();        
    }

    /**
     * Updates millisecond counter based on global interval.
     * @param {number} globalIntervalCounter - The current global interval count.
     */
    interval10ms(globalIntervalCounter){
        this.msCounter == globalIntervalCounter;
    }

    /**
     * Moves the object to the right and sets direction flag.
     */
    moveRight(){
        this.x += this.speed;
        this.otherDirection = false;
    }

    /**
     * Moves the object to the left and sets direction flag.
     */
    moveLeft(){
        this.x -= this.speed;  
        this.otherDirection = true; 
    }

    /**
     * Checks if the object has moved off-screen.
     * @param {number} offset - Optional offset from screen edge.
     * @returns {boolean} True if off-screen, false otherwise.
     */
    checkIfOffScreen(offset){
       return this.x + this.width - offset < 0;
    }

    /**
     * Plays a death animation once, optionally ending the game.
     * @param {string[]} images - Array of image paths for animation.
     * @param {boolean} shouldEndGame - Whether to trigger game over after animation.
     */
    playDeathAnimationOnce(images, shouldEndGame){
        if(this.onceImageIndex < images.length){
            const path = images[this.onceImageIndex];
            this.img = this.imageCache[path];
            this.onceImageIndex++;
        } else if(shouldEndGame){
            gameOver(true);           
        }
    }

    /**
     * Applies gravity to the object if in the air.
     */
    applyGravity(){
        if(this.isInAir() || this.speedY > 0){
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
        }
    }

    /**
     * Checks if the object is currently in the air.
     * @returns {boolean} True if in the air, false otherwise.
     */
    isInAir(){
        return this.y < this.standingGroundY;
    }

    /**
     * Initiates a jump by setting vertical speed.
     */
    jump(){
        this.speedY = this.jump_height;
    }

    /**
     * Reduces objects health and tracks last hit time.
     * @param {number} damage - Amount of damage to apply.
     * @param {object} character - object taking damage. Not used here only on player. 
     */
    applyDamage(damage, character){
        this.health -= damage;
        if(this.health < 0) {
            this.health = 0;
        } else {
            this.lastHit = new Date().getTime();
        }       
    }

    /**
     * Checks if the object is dead.
     * @returns {boolean} True if health is zero.
     */
    checkIsDead(){
        return this.health == 0;
    }

    /**
     * Determines if the object has been recently hurt.
     * @returns {boolean} True if last hit was within 200ms.
     */
    isHurt(){
        let timePassed = new Date().getTime() - this.lastHit;
        return timePassed < 200; 
    }

    /**
     * Assigns a random hurt audio clip to the character.
     */
    addAudio(){
        let i = Math.random();
        i = Math.round(i);
        this.hurtSound = new Audio(this.hurtSounds[i]);
    }
}