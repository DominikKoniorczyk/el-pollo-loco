import { MovableObject } from "./movable-object.class.js";
import { ImageHub } from "./imagehub.class.js";
import { SoundHub } from "./soundhub.class.js";

export class Chicken extends MovableObject {
    width = 60;
    height = 60;
    y = 363;
    standingGroundY = 363;
    minPositionX = 720;
    offset = { top: 5, bottom: 10, left: 5, right: 10 };s
    wasOffScreen = false;
    
    constructor(world_tiles, level, img){
        super();
        this.level = level;                
        this.damagePerAttack = 10 * (level.difficultyLevel == 1 ? 1 : level.difficultyLevel == 2 ? 4 : 6);
        super.loadImage(img.walk[0]);
        super.loadImages(img.walk);
        super.loadImages(img.death);
        this.worldTiles = world_tiles;
        this.addAudio();
        this.calculateSpeeds();
    }

    /**
     * Calculates a new horizontal position and random speed for the entity.
     */
    calculateSpeeds(){
        this.x = this.getRandomX(this.worldTiles);
        this.speed = 1 + Math.random() * 0.5;      
    }

    /**
     * Updates the entity state at 60 FPS and triggers movement.
     */
    interval60FPS(){
        super.interval60FPS();
        this.move();
    }

    /**
     * Moves the entity left or right based on its position relative to screen bounds.
     */
    move(){
        if(!this.checkIfOffScreen(80) && !this.wasOffScreen){
            super.moveLeft();    
        } else if(this.checkIfOffScreen(80)) { 
            this.wasOffScreen = true;  
            super.moveRight();     
        } else if(this.x < (this.worldTiles - 1) *720 && this.wasOffScreen){
            super.moveRight();
        } else {
            this.wasOffScreen = false;
            super.moveLeft();
        }
    }

    /**
     * Updates the entity animation every 10ms based on a global interval counter.
     * @param {number} globalIntervalCounter - The global counter to time animations.
     */
    interval10ms(globalIntervalCounter){
        if(globalIntervalCounter % 110 === 0){
            this.animate();
        }
    }

    /**
     * Handles the entity's walking or death animation, and removes it after death.
     */
    animate(){
        if(!this.isDead) this.playAnimation(ImageHub.chicken.walk);   
        else if(this.isDead && this.deathTime == 0){
            this.playAnimation(ImageHub.chicken.death)
            this.deathTime = new Date().getTime();
        } else if(new Date().getTime() - this.deathTime < 2000){
            this.playAnimation(ImageHub.chicken.death)
        } else {
            this.removeFromWorld(this.world.level.enemies, this.world.level.enemies);
        }
    }

    /**
     * Applies damage to the entity, stops its movement, plays hurt sound, and updates the character's score.
     * @param {number} dmg - The amount of damage applied.
     * @param {Object} character - The character dealing the damage.
     */
    applyDamage(dmg, character){
        this.isDead = true;
        this.speed = 0;
        SoundHub.playOne(this.hurtSound);
        character.score += this.killScorePoints;
    }
}